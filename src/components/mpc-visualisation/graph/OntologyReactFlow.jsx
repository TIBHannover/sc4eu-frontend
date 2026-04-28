import { useState, useMemo, useEffect, useCallback, memo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import { Box, Typography, Stack, IconButton, List } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { OntologyNode, buildGraphNodes, buildGraphEdges, resolveNodePalette } from './OntologyNode';
import { layoutGraph } from '../utils/elk_layout';
import { TIER_SCHEMA, OVERVIEW_SCHEMA, SURVEYS } from '../data/surveys';
import { GlassPanel, LegendDot, NavChip, MetaItem } from '../shared';
import { colorStyled, edgeColors } from '../config/theme';
import 'reactflow/dist/style.css';

const nodeTypes = { ontologyNode: OntologyNode };

// Legend entries — static, defined at module scope.
const LEGEND_ENTRIES = [
    { shape: 'circle', label: 'Abstract', fill: colorStyled.surfaceContainerLow, stroke: colorStyled.outline },
    { shape: 'solid', label: 'Tier', fill: colorStyled.primaryContainer, stroke: colorStyled.primary },
    { shape: 'solid', label: 'Class', fill: colorStyled.secondaryContainer, stroke: colorStyled.secondary },
    { shape: 'dashed', label: 'Instance', fill: colorStyled.surfaceContainerHigh, stroke: colorStyled.outline }
];

// ─── OntologyReactFlow ────────────────────────────────────────────────────────

const OntologyReactFlow = memo(function OntologyReactFlow({
    activeTier,
    onTierChange,
    onGroupSelect,
    selectedGroup,
    overrideSchema,
    onNodeMetadata
}) {
    const predefinedSchema = activeTier ? TIER_SCHEMA[activeTier] : OVERVIEW_SCHEMA;
    const schema = overrideSchema ?? predefinedSchema;

    const [flowNodes, setFlowNodes] = useNodesState([]);
    const [flowEdges, setFlowEdges] = useEdgesState([]);
    const [selectedNodeMetadata, setSelectedNodeMetadata] = useState(null);

    // ── Layout ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        const rawNodes = buildGraphNodes(schema);
        const rawEdges = buildGraphEdges(schema);

        layoutGraph(rawNodes, rawEdges).then(positionedNodes => {
            setFlowNodes(positionedNodes);
            setFlowEdges(rawEdges);
        });
    }, [schema]);

    // ── Node click ───────────────────────────────────────────────────────────────
    const handleNodeClick = useCallback(
        (mouseEvent, clickedNode) => {
            setSelectedNodeMetadata(clickedNode.data);
            onNodeMetadata?.(clickedNode.data);
            if (clickedNode.data.role === 'tier') {
                onTierChange(clickedNode.data.tierKey ?? null);
            }
            if (clickedNode.data.role === 'instance') {
                onGroupSelect(clickedNode.data.label);
            }
        },
        [onTierChange, onGroupSelect, onNodeMetadata]
    );

    // ── Edge highlight ──────────────────────────────────────────────────────────
    const visibleEdges = useMemo(() => {
        if (!selectedGroup) return flowEdges;

        return flowEdges.map(edge => {
            const sourceNode = flowNodes.find(node => node.id === edge.source);
            const targetNode = flowNodes.find(node => node.id === edge.target);

            const isAttached = sourceNode?.data.label === selectedGroup || targetNode?.data.label === selectedGroup;

            const highlightedStyle = { ...edge.style, stroke: edgeColors.highlight, strokeWidth: 3, opacity: 1 };
            const dimmedStyle = { ...edge.style, stroke: edgeColors.muted, opacity: 0.3 };

            return {
                ...edge,
                animated: isAttached,
                zIndex: isAttached ? 10 : 1,
                style: isAttached ? highlightedStyle : dimmedStyle
            };
        });
    }, [flowEdges, flowNodes, selectedGroup]);

    const selectedNodePalette = selectedNodeMetadata
        ? resolveNodePalette({ colorKey: selectedNodeMetadata.colorKey, role: selectedNodeMetadata.role })
        : null;

    const legendHintText = activeTier ? 'click instance to filter' : 'click tier to drill in';

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Legend */}
            <GlassPanel
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    zIndex: 10,
                    px: 1.5,
                    py: 0.75,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center'
                }}
            >
                {LEGEND_ENTRIES.map(entry => (
                    <LegendDot key={entry.label} shape={entry.shape} label={entry.label} fill={entry.fill} stroke={entry.stroke} />
                ))}
                <Typography sx={{ fontSize: 8.5, color: colorStyled.onSurfaceVariant, ml: 1 }}>{legendHintText}</Typography>
            </GlassPanel>

            {/* ReactFlow canvas */}
            <ReactFlow
                nodes={flowNodes}
                edges={visibleEdges}
                nodeTypes={nodeTypes}
                onNodeClick={handleNodeClick}
                onPaneClick={() => setSelectedNodeMetadata(null)}
                fitView
            >
                <Background color={colorStyled.outlineVariant} gap={24} size={1} variant="dots" />
                <Controls showInteractive={false} />
                <MiniMap
                    nodeColor={flowNode => resolveNodePalette({ colorKey: flowNode.data?.colorKey, role: flowNode.data?.role }).stroke}
                    maskColor="rgba(255,255,255,0.7)"
                    style={{
                        border: `1px solid ${colorStyled.outlineVariant}`,
                        borderRadius: 8,
                        backgroundColor: colorStyled.surfaceContainerLow
                    }}
                />
            </ReactFlow>

            {/* Metadata panel */}
            {selectedNodeMetadata && (
                <NodeMetadataPanel metadata={selectedNodeMetadata} palette={selectedNodePalette} onClose={() => setSelectedNodeMetadata(null)} />
            )}

            {/* Tier navigation — only shown when using predefined schemas */}
            {!overrideSchema && <TierNavigationBar activeTier={activeTier} surveys={SURVEYS} onTierChange={onTierChange} />}
        </Box>
    );
});

export default OntologyReactFlow;

// ─── NodeMetadataPanel ────────────────────────────────────────────────────────

function NodeMetadataPanel({ metadata, palette, onClose }) {
    return (
        <GlassPanel elevation={3} sx={{ position: 'absolute', bottom: 80, left: 14, zIndex: 20, width: 280, overflow: 'hidden' }}>
            <Box sx={{ height: 4, bgcolor: palette.stroke }} />
            <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.stroke }}>
                        Node Metadata
                    </Typography>
                    <IconButton size="small" onClick={onClose} sx={{ color: colorStyled.onSurfaceVariant }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Box sx={{ height: '1px', bgcolor: colorStyled.outlineVariant, mb: 1.5 }} />
                <List disablePadding>
                    <MetaItem label="Label" value={metadata.label} />
                    <MetaItem label="Ontology Role" value={metadata.role} />
                    <MetaItem label="Namespace" value="survey:http://semantichub.org/survey/" />
                    <MetaItem label="Description" value={metadata.tip ?? 'No description provided in TTL.'} />
                    {metadata.tierKey && <MetaItem label="Tier Identifier" value={metadata.tierKey} />}
                </List>
            </Box>
        </GlassPanel>
    );
}

// ─── TierNavigationBar ────────────────────────────────────────────────────────

function TierNavigationBar({ activeTier, surveys, onTierChange }) {
    return (
        <GlassPanel
            sx={{
                position: 'absolute',
                bottom: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 3
            }}
        >
            <NavChip label="Overview" isActive={!activeTier} accentColor={colorStyled.inverseSurface} onClick={() => onTierChange(null)} />
            {surveys.map(survey => (
                <NavChip
                    key={survey.key}
                    label={survey.label}
                    isActive={activeTier === survey.key}
                    accentColor={resolveNodePalette({ colorKey: survey.key, role: 'tier' }).stroke}
                    onClick={() => onTierChange(survey.key)}
                />
            ))}
        </GlassPanel>
    );
}

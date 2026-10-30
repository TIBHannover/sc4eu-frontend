import { useState, useMemo, useEffect, useCallback, memo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import { Box, Typography, Chip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { OntologyNode, buildGraphNodes, buildGraphEdges, resolveNodePalette } from './OntologyNode';
import { layoutGraph } from '../utils/elk_layout';
import { DOMAIN_ID_TO_SURVEY_KEY } from '../data/surveys';
import { GlassPanel, LegendDot, NavChip } from '../shared';
import { GraphHelpPopover } from '../shared/GraphHelpPopover';
import { useThemePalette, chartColors } from '../config/theme';
import 'reactflow/dist/style.css';
import { extractSurveyDomains, filterSchemaByDomain } from '../data/parseTtl';

const SURVEY_DOMAIN_LABELS = {
    OEM_Survey: 'OEM Survey',
    Semiconductor_Survey: 'Semiconductor',
    Tier1_Survey: 'Tier 1 Suppliers'
};

const nodeTypes = { ontologyNode: OntologyNode };

// Legend entries derived from the same role palette the nodes use.
const LEGEND_ENTRIES = [
    { shape: 'circle', label: 'Abstract', role: 'abstract' },
    { shape: 'solid', label: 'Tier', role: 'tier' },
    { shape: 'solid', label: 'Class', role: 'class' },
    { shape: 'solid', label: 'Sub-class', role: 'sub' },
    { shape: 'pill', label: 'Selectable', role: 'sub_clickable' }
];

function useTtlSchemas(rawSchema, domainSchema) {
    return useMemo(() => {
        if (!rawSchema) return { overview: null, tierSchemas: {} };

        // If parseTtlSchema already computed tierSchemas (keyed by survey class
        // id like "OEM_Survey"), use them directly — they are built from the
        // raw ontology edge attribution and are correctly differentiated per
        // survey.  Fall back to filterSchemaByDomain for any schema that was
        // produced without the tierSchemas field (e.g. file-uploaded TTL via
        // parseTtlFile).
        if (rawSchema.tierSchemas) {
            // Re-key from ontology ids (OEM_Survey) to short survey keys (oem)
            const tierSchemas = {};
            Object.entries(rawSchema.tierSchemas).forEach(([ontologyId, schema]) => {
                const surveyKey = DOMAIN_ID_TO_SURVEY_KEY[ontologyId] ?? ontologyId;
                tierSchemas[surveyKey] = schema;
            });

            // Nodes already carry tierKey from parseTtlSchema
            return { overview: { nodes: rawSchema.nodes, edges: rawSchema.edges }, tierSchemas };
        }

        // Legacy fallback: derive domains from instance graph and filter
        const sourceForDomains = domainSchema ?? rawSchema;
        const domains = extractSurveyDomains(sourceForDomains);
        const tierSchemas = {};

        domains.forEach(domain => {
            const surveyKey = DOMAIN_ID_TO_SURVEY_KEY[domain.id] ?? domain.id;
            tierSchemas[surveyKey] = filterSchemaByDomain(rawSchema, domain.memberNodeIds);
        });

        const overviewNodes = rawSchema.nodes.map(node => {
            if (node.role !== 'tier') return node;
            const domain = domains.find(d => d.memberNodeIds.has(node.id));
            const surveyKey = domain ? DOMAIN_ID_TO_SURVEY_KEY[domain.id] ?? domain.id : null;
            return surveyKey ? { ...node, tierKey: surveyKey } : node;
        });

        return {
            overview: { nodes: overviewNodes, edges: rawSchema.edges },
            tierSchemas
        };
    }, [rawSchema, domainSchema]);
}

const OntologyReactFlow = memo(function OntologyReactFlow({
    activeTier,
    onTierChange,
    onGroupSelect,
    selectedGroup,
    overrideSchema,
    domainSchema,
    onNodeMetadata
}) {
    const { colorStyled, edgeColors } = useThemePalette();

    const { overview: ttlOverview, tierSchemas: ttlTierSchemas } = useTtlSchemas(overrideSchema, domainSchema);

    // const predefinedSchema = activeTier ? TIER_SCHEMA[activeTier] : OVERVIEW_SCHEMA;
    let ttlSchema = null;
    if (overrideSchema) {
        if (activeTier) {
            ttlSchema = ttlTierSchemas[activeTier];
        } else {
            ttlSchema = ttlOverview;
        }
    }
    const schema = ttlSchema;

    const [flowNodes, setFlowNodes] = useNodesState([]);
    const [flowEdges, setFlowEdges] = useEdgesState([]);
    const [selectedNodeMetadata, setSelectedNodeMetadata] = useState(null);

    const navSurveys = (() => {
        if (!overrideSchema) return [];

        const domains = overrideSchema.tierSchemas
            ? Object.keys(overrideSchema.tierSchemas).map(id => ({
                  id,
                  label: SURVEY_DOMAIN_LABELS[id] ?? id
              }))
            : extractSurveyDomains(domainSchema ?? overrideSchema);

        return domains.map(({ id, label }) => ({
            key: DOMAIN_ID_TO_SURVEY_KEY[id] ?? id,
            label
        }));
    })();

    // ── Layout — reruns only when schema or tier changes ─────────────────────────
    useEffect(() => {
        if (!schema) return;
        setSelectedNodeMetadata(null); // clear node selection when schema changes
        const rawNodes = buildGraphNodes(schema, null);
        const rawEdges = buildGraphEdges(schema, edgeColors);
        const isTier = Boolean(activeTier);

        layoutGraph(rawNodes, rawEdges, isTier).then(positionedNodes => {
            setFlowNodes(positionedNodes);
            setFlowEdges(rawEdges);
        });
    }, [schema, activeTier]);

    // ── Patch active state when selectedGroup changes without re-layout ───────────
    useEffect(() => {
        setFlowNodes(prev =>
            prev.map(n => ({
                ...n,
                data: {
                    ...n.data,
                    active:
                        n.data.active && !n.data.groupKey // preserve tier active flags
                            ? true
                            : Boolean(n.data.groupKey && n.data.groupKey === selectedGroup)
                }
            }))
        );
    }, [selectedGroup]);

    // ── Node click ───────────────────────────────────────────────────────────────
    const handleNodeClick = useCallback(
        (mouseEvent, clickedNode) => {
            setSelectedNodeMetadata(clickedNode.data);
            onNodeMetadata?.(clickedNode.data);
            if (clickedNode.data.role === 'tier') {
                onTierChange(clickedNode.data.tierKey ?? null);
            }
            // Nodes with a groupKey trigger dashboard group selection.
            // This covers sub-role nodes (BEHV/BEV/ICE, nm-nodes) and class
            // nodes that map to a specific survey group (MarketSegment → Automotive).
            if (clickedNode.data.groupKey) {
                onGroupSelect(clickedNode.data.groupKey);
            } else if (clickedNode.data.role === 'instance') {
                onGroupSelect(clickedNode.data.label);
            }
        },
        [onTierChange, onGroupSelect, onNodeMetadata]
    );

    // ── Edge highlight ──────────────────────────────────────────────────────────
    // Highlights edges attached to:
    //  - the selected dashboard group (groupKey match) — for sub_clickable nodes
    //  - any clicked node by id — for class/abstract nodes with no groupKey
    const visibleEdges = useMemo(() => {
        const selectedNodeId = selectedNodeMetadata?.id ?? null;
        if (!selectedGroup && !selectedNodeId) return flowEdges;

        return flowEdges.map(edge => {
            const sourceNode = flowNodes.find(node => node.id === edge.source);
            const targetNode = flowNodes.find(node => node.id === edge.target);

            // groupKey match — only fire when selectedGroup is a non-null string
            const groupMatch = n => selectedGroup != null && (n?.data.groupKey === selectedGroup || n?.data.label === selectedGroup);

            // id match — direct connection to the clicked node only
            const idMatch = n => selectedNodeId != null && n?.id === selectedNodeId;

            const isAttached = groupMatch(sourceNode) || groupMatch(targetNode) || idMatch(sourceNode) || idMatch(targetNode);

            const highlightedStyle = { ...edge.style, stroke: edgeColors.highlight, strokeWidth: 3, opacity: 1 };
            const dimmedStyle = { ...edge.style, stroke: edgeColors.muted, opacity: 0.3 };

            return {
                ...edge,
                animated: isAttached,
                zIndex: isAttached ? 10 : 1,
                style: isAttached ? highlightedStyle : dimmedStyle
            };
        });
    }, [flowEdges, flowNodes, selectedGroup, selectedNodeMetadata]);

    const legendHintText = activeTier ? 'click selectable to filter dashboard' : 'click tier to drill in';
    const [helpAnchor, setHelpAnchor] = useState(null);

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
                {LEGEND_ENTRIES.map(entry => {
                    const palette = resolveNodePalette({ role: entry.role }, colorStyled);
                    return <LegendDot key={entry.label} shape={entry.shape} label={entry.label} fill={palette.fill} stroke={palette.stroke} />;
                })}
                <Typography sx={{ fontSize: 8.5, color: colorStyled.onSurfaceVariant, ml: 1 }}>{legendHintText}</Typography>

                {/* Divider */}
                <Box sx={{ width: '1px', height: 14, bgcolor: colorStyled.outlineVariant, mx: 0.25 }} />

                {/* Help button */}
                <Chip
                    icon={<HelpOutlineIcon sx={{ fontSize: '13px !important' }} />}
                    label="How to use"
                    size="small"
                    onClick={e => setHelpAnchor(e.currentTarget)}
                    sx={{
                        fontSize: 9,
                        fontWeight: 600,
                        height: 22,
                        cursor: 'pointer',
                        bgcolor: 'transparent',
                        color: colorStyled.onSurfaceVariant,
                        border: `1px solid ${colorStyled.outlineVariant}`,
                        '&:hover': { bgcolor: colorStyled.surfaceContainerHigh }
                    }}
                />
                <GraphHelpPopover
                    anchor={helpAnchor}
                    onClose={() => setHelpAnchor(null)}
                    title="Hierarchy Graph — How to use"
                    items={[
                        {
                            key: 'click-tier-node',
                            icon: <AccountTreeIcon fontSize="small" />,
                            primary: activeTier ? 'Click a tier node to return to overview' : 'Click a tier node to drill in',
                            secondary: activeTier
                                ? 'Click "Overview" in the navigation bar below to go back to the full schema.'
                                : 'Each survey tier (OEM Survey, Semiconductor, Tier 1) shows a detailed sub-schema when clicked.'
                        },
                        {
                            key: 'click-pill-node',
                            icon: <FilterAltIcon fontSize="small" />,
                            primary: 'Click a pill node to filter the dashboard',
                            secondary:
                                'Pill-shaped nodes (BEHV, BEV, ICE, nm-node buckets) are selectable. Clicking one highlights it in the dashboard charts.'
                        },
                        {
                            key: 'click-any-node',
                            icon: <TouchAppIcon fontSize="small" />,
                            primary: 'Click any node to highlight its connections',
                            secondary: 'Clicking any node highlights all edges directly connected to it. Click the canvas background to clear.'
                        },
                        {
                            key: 'zoom-and-pan',
                            icon: <ZoomInIcon fontSize="small" />,
                            primary: 'Zoom and pan',
                            secondary:
                                'Use the scroll wheel to zoom. Drag the background to pan. The minimap in the bottom-right shows your viewport.'
                        }
                    ]}
                />
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
                    nodeColor={flowNode => resolveNodePalette({ role: flowNode.data?.role }, colorStyled).stroke}
                    maskColor={chartColors.minimapMask}
                    style={{
                        border: `1px solid ${colorStyled.outlineVariant}`,
                        borderRadius: 8,
                        backgroundColor: colorStyled.surfaceContainerLow
                    }}
                />
            </ReactFlow>

            {/* Tier navigation */}
            <TierNavigationBar activeTier={activeTier} surveys={navSurveys} onTierChange={onTierChange} />
        </Box>
    );
});

export default OntologyReactFlow;

// ─── TierNavigationBar ────────────────────────────────────────────────────────

function TierNavigationBar({ activeTier, surveys, onTierChange }) {
    const { colorStyled } = useThemePalette();
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
                    accentColor={resolveNodePalette({ role: 'tier' }, colorStyled).stroke}
                    onClick={() => onTierChange(survey.key)}
                />
            ))}
        </GlassPanel>
    );
}

// (ReactFlowHelpPopover removed — uses shared GraphHelpPopover from ../shared/GraphHelpPopover)

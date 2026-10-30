import React, { useState, useCallback, useEffect, memo } from 'react';
import { Box, Typography, Stack, IconButton, List } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GlassPanel, MetaItem } from '../shared';
import { resolveNodePalette } from './OntologyNode';
import OntologyReactFlow from './OntologyReactFlow';
import OntologyForceTree from './OntologyForcedTree';
import GraphViewToggle, { GRAPH_VIEW } from './GraphViewToggle';
import { useThemePalette } from '../config/theme';
import { DOMAIN_ID_TO_SURVEY_KEY } from '../data/surveys';

function NodeMetadataPanel({ metadata, palette, onClose }) {
    const { colorStyled } = useThemePalette();
    return (
        <GlassPanel elevation={3} sx={{ position: 'absolute', bottom: 80, left: 14, zIndex: 20, width: 280, overflow: 'hidden' }}>
            <Box sx={{ height: 4, bgcolor: palette.stroke }} />
            <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.stroke }}>
                        Node Metadata
                    </Typography>
                    <IconButton size="small" onClick={onClose}>
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

export const OntologyGraph = memo(function OntologyGraph({
    activeTier,
    onTierChange,
    onGroupSelect,
    selectedGroup,
    reactFlowSchema,
    forceSchema,
    activeView,
    onViewChange
}) {
    const [selectedNodeMetadata, setSelectedNodeMetadata] = useState(null);
    const { colorStyled } = useThemePalette();

    const handleDomainChange = useCallback(
        domainId => {
            if (domainId === null) {
                onTierChange(null);
                return;
            }
            const surveyKey = DOMAIN_ID_TO_SURVEY_KEY[domainId];
            if (surveyKey) onTierChange(surveyKey);
        },
        [onTierChange]
    );

    // Clear metadata when switching views
    useEffect(() => {
        setSelectedNodeMetadata(null);
    }, [activeView]);

    const handleForceNodeClick = useCallback(
        clickedNode => {
            if (!clickedNode) {
                setSelectedNodeMetadata(null);
                return;
            }

            // Set metadata panel — map force node shape to the same shape
            // NodeMetadataPanel expects (same fields OntologyReactFlow passes)
            setSelectedNodeMetadata({
                label: clickedNode.label,
                role: clickedNode.role,
                tip: null,
                tierKey: clickedNode.tierKey ?? null,
                colorKey: null
            });

            if (clickedNode.role === 'tier') onTierChange(clickedNode.tierKey ?? null);
            if (clickedNode.role === 'instance') onGroupSelect(clickedNode.label);
        },
        [onTierChange, onGroupSelect]
    );

    const handleReactFlowNodeClick = useCallback(metadata => {
        setSelectedNodeMetadata(metadata);
    }, []);

    const selectedNodePalette = selectedNodeMetadata
        ? resolveNodePalette({ role: selectedNodeMetadata.role }, colorStyled)
        : null;

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative', bgcolor: colorStyled.background }}>
            {/* View toggle */}
            <Box sx={{ position: 'absolute', top: 12, left: 14, zIndex: 20 }}>
                <GraphViewToggle activeView={activeView} onViewChange={onViewChange} />
            </Box>

            {activeView === GRAPH_VIEW.hierarchy && (
                <OntologyReactFlow
                    activeTier={activeTier}
                    onTierChange={onTierChange}
                    onGroupSelect={onGroupSelect}
                    selectedGroup={selectedGroup}
                    overrideSchema={reactFlowSchema}
                    domainSchema={forceSchema}
                    onNodeMetadata={handleReactFlowNodeClick}
                />
            )}

            {activeView === GRAPH_VIEW.force &&
                forceSchema && (
                    <OntologyForceTree
                        schema={forceSchema}
                        selectedGroup={selectedGroup}
                        onNodeClick={handleForceNodeClick}
                        onDomainChange={handleDomainChange}
                    />
                )}

            {/* Shared metadata panel — works for both views */}
            {selectedNodeMetadata && selectedNodePalette && (
                <NodeMetadataPanel metadata={selectedNodeMetadata} palette={selectedNodePalette} onClose={() => setSelectedNodeMetadata(null)} />
            )}
        </Box>
    );
});

export default OntologyGraph;

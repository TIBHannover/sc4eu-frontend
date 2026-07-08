import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import OntologyGraph from './graph/OntologyGraph';
import { SurveyDashboard } from './dashboard/SurveyDashboard';
import { extractDashboardData } from './data/extractDashboardData';
import { useThemePalette } from './config/theme';
import { parseTtlText, parseTtlSchema } from './data/parseTtl';
import { AUTOMATED_KNOWLEDGE_GRAPH_TTL } from './data/automatedKnowledgeGraph';
import { GRAPH_VIEW } from './graph/GraphViewToggle';

const OVERVIEW_TIER = null;

// Minimum pane width as a percentage of the container
const PANE_MIN_PCT = 20;
const PANE_DEFAULT_PCT = 45;

function resolveActiveSurvey(surveys, activeTier) {
    if (!surveys?.length) return null;
    if (activeTier === OVERVIEW_TIER) return surveys[0];
    return surveys.find(survey => survey.key === activeTier) ?? surveys[0];
}

// ─── Draggable split layout ───────────────────────────────────────────────────

function useSplitDrag(initialPct) {
    const [splitPct, setSplitPct] = useState(initialPct);
    const containerRef = useRef(null);
    const dragging = useRef(false);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        dragging.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!dragging.current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const pct  = ((e.clientX - rect.left) / rect.width) * 100;
            setSplitPct(Math.min(100 - PANE_MIN_PCT, Math.max(PANE_MIN_PCT, pct)));
        };

        const onMouseUp = () => {
            if (!dragging.current) return;
            dragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup',   onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup',   onMouseUp);
        };
    }, []);

    return { splitPct, containerRef, onDividerMouseDown: onMouseDown };
}

// ─── MpcSurvey ───────────────────────────────────────────────────────────────

export const MpcSurvey = () => {
    const [activeTier, setActiveTier] = useState(OVERVIEW_TIER);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [reactFlowSchema, setReactFlowSchema] = useState(null);
    const [forceSchema, setForceSchema] = useState(null);
    const [activeView, setActiveView] = useState(GRAPH_VIEW.hierarchy);
    const [layout, setLayout] = useState('split');

    const { colorStyled } = useThemePalette();
    const { splitPct, containerRef, onDividerMouseDown } = useSplitDrag(PANE_DEFAULT_PCT);

    useEffect(() => {
        const ttl = AUTOMATED_KNOWLEDGE_GRAPH_TTL;
        parseTtlSchema(ttl)
            .then(setReactFlowSchema)
            .catch(err => console.error('Failed to parse ontology schema:', err));
        parseTtlText(ttl)
            .then(setForceSchema)
            .catch(err => console.error('Failed to parse ontology instances:', err));
    }, []);

    const uploadedSchema = forceSchema;
    const ttlSurveys = useMemo(
        () => (uploadedSchema ? extractDashboardData(uploadedSchema) : null),
        [uploadedSchema]
    );

    const currentSurveys = ttlSurveys;
    const activeSurvey   = resolveActiveSurvey(currentSurveys, activeTier);

    const handleTierChange = useCallback(newTier => {
        setActiveTier(newTier);
        setSelectedGroup(null);
    }, []);

    const handleGroupSelect = useCallback(clickedGroup => {
        setSelectedGroup(prev => (prev === clickedGroup ? null : clickedGroup));
    }, []);

    const isSplit = layout === 'split';

    const graphNode = (
        <OntologyGraph
            activeTier={activeTier}
            onTierChange={handleTierChange}
            onGroupSelect={handleGroupSelect}
            selectedGroup={selectedGroup}
            reactFlowSchema={reactFlowSchema}
            forceSchema={forceSchema}
            activeView={activeView}
            onViewChange={setActiveView}
        />
    );

    const dashboardNode = (
        <SurveyDashboard
            surveys={currentSurveys}
            activeSurvey={activeSurvey}
            onSurveyChange={handleTierChange}
            selectedGroup={selectedGroup}
            onGroupSelect={handleGroupSelect}
            uploadedSchema={uploadedSchema}
            activeView={activeView}
        />
    );

    return (
        <Box
            sx={{
                width:    '100%',
                fontFamily: "'DM Sans', sans-serif",
                bgcolor:  colorStyled.background,
                ...(isSplit ? {
                    position:  'sticky',
                    top:       0,
                    height:    'calc(100vh - 120px)', 
                    overflow:  'hidden',
                } : {
                    position: 'relative',
                    height:   'auto',
                    overflow: 'auto',
                }),
            }}
        >
            {/* ── Layout toggle ── */}
            <Box
                sx={{
                    position:  isSplit ? 'absolute' : 'relative',
                    top:       isSplit ? 12 : 0,
                    right:     isSplit ? 12 : 0,
                    zIndex:    30,
                    display:   'flex',
                    justifyContent: isSplit ? 'flex-end' : 'flex-end',
                    p:         isSplit ? 0 : 1,
                }}
            >
                <Tooltip title={isSplit ? 'Switch to stacked layout' : 'Switch to side-by-side layout'}>
                    <IconButton
                        size="small"
                        onClick={() => setLayout(isSplit ? 'stack' : 'split')}
                        sx={{
                            bgcolor: colorStyled.surfaceContainerLow,
                            border:  `1px solid ${colorStyled.outlineVariant}`,
                            '&:hover': { bgcolor: colorStyled.surfaceContainerHigh },
                        }}
                    >
                        {isSplit ? <ViewAgendaIcon fontSize="small" /> : <ViewSidebarIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Box>

            {isSplit ? (
                /* ── Side-by-side split layout ── */
                <Box
                    ref={containerRef}
                    sx={{
                        display:  'flex',
                        flexDirection: 'row',
                        width:    '100%',
                        height:   '100%',
                        overflow: 'hidden',
                    }}
                >
                    {/* Left pane — graph */}
                    <Box
                        sx={{
                            width:    `${splitPct}%`,
                            minWidth: `${PANE_MIN_PCT}%`,
                            height:   '100%',
                            flexShrink: 0,
                            position: 'relative',
                            bgcolor:  colorStyled.surface,
                            borderRight: `1px solid ${colorStyled.outlineVariant}`,
                            overflow: 'hidden',
                        }}
                    >
                        {graphNode}
                    </Box>

                    {/* Drag divider */}
                    <Box
                        onMouseDown={onDividerMouseDown}
                        sx={{
                            width:  6,
                            flexShrink: 0,
                            cursor: 'col-resize',
                            bgcolor: colorStyled.outlineVariant,
                            transition: 'background-color 0.15s',
                            '&:hover': { bgcolor: colorStyled.outline },
                            zIndex: 10,
                        }}
                    />

                    {/* Right pane — dashboard, independently scrollable */}
                    <Box
                        sx={{
                            flex:     1,
                            minWidth: `${PANE_MIN_PCT}%`,
                            height:   '100%',
                            overflowY: 'auto',
                            bgcolor:  colorStyled.background,
                        }}
                    >
                        {dashboardNode}
                    </Box>
                </Box>
            ) : (
                /* ── Stacked layout (original behaviour) ── */
                <>
                    <Box
                        sx={{
                            width:    '100%',
                            height:   '50vh',
                            minHeight: 360,
                            position: 'relative',
                            bgcolor:  colorStyled.surface,
                            borderBottom: `1px solid ${colorStyled.outlineVariant}`,
                        }}
                    >
                        {graphNode}
                    </Box>
                    {dashboardNode}
                </>
            )}
        </Box>
    );
};

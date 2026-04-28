import { useState, useCallback, useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import OntologyGraph from './graph/OntologyGraph';
import { SurveyDashboard } from './dashboard/SurveyDashboard';
import { getSurveysAtTimepoint } from './data/surveys';
import { extractDashboardData } from './data/extractDashboardData';
import { colorStyled } from './config/theme';
import SurveyTimeline from './graph/SurveyTimeline';
import { parseTtlText } from './data/parseTtl';
import { AUTOMATED_KNOWLEDGE_GRAPH_TTL } from './data/automatedKnowledgeGraph';
import { GRAPH_VIEW } from './graph/GraphViewToggle';

const DEFAULT_TIMEPOINT = 'q2_2025';
const OVERVIEW_TIER = null;
const GRAPH_CANVAS_HEIGHT = '50vh';
const GRAPH_CANVAS_MIN_HEIGHT = 360;

function resolveActiveSurvey(surveys, activeTier) {
    if (activeTier === OVERVIEW_TIER) return surveys[0];
    return surveys.find(survey => survey.key === activeTier);
}

export const MpcSurvey = () => {
    const [activeTimepoint, setActiveTimepoint] = useState(DEFAULT_TIMEPOINT);
    const [activeTier, setActiveTier] = useState(OVERVIEW_TIER);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [uploadedSchema, setUploadedSchema] = useState(null);
    const [activeView, setActiveView] = useState(GRAPH_VIEW.hierarchy);

    useEffect(() => {
        parseTtlText(AUTOMATED_KNOWLEDGE_GRAPH_TTL)
            .then(setUploadedSchema)
            .catch(err => console.error('Failed to parse ontology:', err));
    }, []);

    const ttlSurveys = useMemo(() => (uploadedSchema ? extractDashboardData(uploadedSchema) : null), [uploadedSchema]);

    const predefinedSurveys = getSurveysAtTimepoint(activeTimepoint) ?? [];
    const currentSurveys = activeView === GRAPH_VIEW.force && ttlSurveys ? ttlSurveys : predefinedSurveys;
    const activeSurvey = resolveActiveSurvey(currentSurveys, activeTier);

    const handleTimepointChange = useCallback(newTimepoint => {
        setActiveTimepoint(newTimepoint);
    }, []);

    const handleTierChange = useCallback(newTier => {
        setActiveTier(newTier);
        setSelectedGroup(null);
    }, []);

    const handleGroupSelect = useCallback(clickedGroup => {
        setSelectedGroup(prev => (prev === clickedGroup ? null : clickedGroup));
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                fontFamily: "'DM Sans', sans-serif",
                bgcolor: colorStyled.background,
                overflow: 'auto'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: `1px solid ${colorStyled.outlineVariant}`,
                    bgcolor: colorStyled.surface
                }}
            >
                {activeView !== GRAPH_VIEW.force && <SurveyTimeline activeTimepoint={activeTimepoint} onTimepointChange={handleTimepointChange} />}
                <Box
                    sx={{
                        width: '100%',
                        height: GRAPH_CANVAS_HEIGHT,
                        minHeight: GRAPH_CANVAS_MIN_HEIGHT,
                        position: 'relative'
                    }}
                >
                    <OntologyGraph
                        activeTier={activeTier}
                        onTierChange={handleTierChange}
                        onGroupSelect={handleGroupSelect}
                        selectedGroup={selectedGroup}
                        overrideSchema={uploadedSchema}
                        activeView={activeView}
                        onViewChange={setActiveView}
                    />
                </Box>
            </Box>
            <SurveyDashboard
                surveys={currentSurveys}
                activeSurvey={activeSurvey}
                onSurveyChange={handleTierChange}
                selectedGroup={selectedGroup}
                onGroupSelect={handleGroupSelect}
                uploadedSchema={uploadedSchema}
                activeView={activeView}
            />
        </Box>
    );
};

import { useState, useMemo, memo } from 'react';
import Chart from 'react-apexcharts';
import {
    Box,
    Card,
    CardContent,
    Stack,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Paper,
    Chip,
    Alert,
    useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { colorStyled, sentimentColors, selectionColors, graphAccents } from '../config/theme';
import { buildBarOptions, buildRadarOptions, fmt } from './chartHelpers';
import { GRAPH_VIEW } from '../graph/GraphViewToggle';
// ─── SurveyDashboard ─────────────────────────────────────────────────────────


export const SurveyDashboard = memo(function SurveyDashboard({
    surveys,
    activeSurvey,
    onSurveyChange,
    selectedGroup,
    onGroupSelect,
    uploadedSchema,
    activeView
}) {
    const theme = useTheme();
    const [baseline, setBaseline] = useState('both');
    const isForceView = activeView === GRAPH_VIEW.force;
    if (!surveys?.length || !activeSurvey) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography sx={{ color: theme.palette.text.secondary }}>No survey data available.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
            <SurveyTabs surveys={surveys} activeKey={activeSurvey.key} onChange={onSurveyChange} />

            <DashboardHeader survey={activeSurvey} baseline={baseline} setBaseline={setBaseline} />

            {/* Shortage alert — high signal, shown prominently */}
            <ShortageAlert survey={activeSurvey} />

            {/* Click-through detail panel */}
            <GroupDetailPanel survey={activeSurvey} selectedGroup={selectedGroup} onClear={() => onGroupSelect(null)} />

            {/* Future demand trajectory — the most forward-looking data */}
            {isForceView && activeSurvey.futureDemand && uploadedSchema && <FutureDemandChart survey={activeSurvey} />}

            {/* Current demand snapshot + regional split */}
            <CurrentDemandRow survey={activeSurvey} baseline={baseline} />

            {/* Survey-specific deep-dive panels */}
            {isForceView && <SurveySpecificPanel survey={activeSurvey} selectedGroup={selectedGroup} onGroupSelect={onGroupSelect} />}
        </Box>
    );
});

// ─── SurveyTabs ───────────────────────────────────────────────────────────────

const SurveyTabs = memo(function SurveyTabs({ surveys, activeKey, onChange }) {
    const value = surveys.findIndex(s => s.key === activeKey);
    const theme = useTheme();
    return (
        <Tabs
            value={value === -1 ? 0 : value}
            onChange={(_, idx) => onChange(surveys[idx].key)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                mb: 3,
                borderBottom: `1px solid ${colorStyled.outlineVariant}`,
                '.MuiTab-root': {
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'none',
                    minHeight: 40,
                    py: 0.5,
                    color: theme.palette.text.secondary
                },
                '.Mui-selected': { color: theme.palette.primary.main },
                '.MuiTabs-indicator': { backgroundColor: theme.palette.primary.main }
            }}
        >
            {surveys.map(survey => (
                <Tab
                    key={survey.key}
                    label={
                        <Stack direction="row" alignItems="center" gap={0.75}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{survey.label}</Typography>
                            <Typography sx={{ fontSize: 9.5, color: colorStyled.outline }}>{survey.subtitle}</Typography>
                        </Stack>
                    }
                />
            ))}
        </Tabs>
    );
});

// ─── DashboardHeader ──────────────────────────────────────────────────────────

const DashboardHeader = memo(function DashboardHeader({ survey, baseline, setBaseline }) {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2} flexWrap="wrap" gap={1}>
            <Box>
                <Typography variant="overline" sx={{ color: theme.palette.text.secondary, letterSpacing: 1.5 }}>
                    {survey.label} · {survey.subtitle}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                    {survey.label}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                    {survey.description}
                </Typography>
            </Box>

            <ToggleButtonGroup
                value={baseline}
                exclusive
                onChange={(_, newValue) => newValue && setBaseline(newValue)}
                size="small"
                sx={{
                    '.MuiToggleButton-root': {
                        fontSize: 11,
                        color: theme.palette.text.secondary,
                        '.Mui-selected': {
                            bgcolor: theme.palette.primary.mainContainer,
                            color: theme.palette.primary.contrastTextContainer
                        }
                    }
                }}
            >
                <ToggleButton value="both">BL1 + BL2</ToggleButton>
                <ToggleButton value="bl1">BL1 only</ToggleButton>
                <ToggleButton value="bl2">BL2 only</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
});

// ─── ShortageAlert ────────────────────────────────────────────────────────────
// Semiconductor shortage is a binary yes/no signal from each survey.
// It is high-value information that was previously buried in GroupDetailPanel.
// Now shown prominently at the top of the dashboard.

function ShortageAlert({ survey }) {
    const shortageData = survey.shortageData;
    if (!shortageData) return null;
    const hasShortage = shortageData.yes > 0;

    return (
        <Alert
            severity={hasShortage ? 'warning' : 'success'}
            icon={hasShortage ? <WarningAmberIcon /> : <CheckCircleIcon />}
            sx={{ mb: 2, fontSize: 12 }}
        >
            <strong>Semiconductor Shortage:</strong>{' '}
            {hasShortage ? `${shortageData.yes} of ${shortageData.total} respondents report active shortage` : 'No shortage reported by respondents'}
        </Alert>
    );
}

// ─── GroupDetailPanel ─────────────────────────────────────────────────────────

const GroupDetailPanel = memo(function GroupDetailPanel({ survey, selectedGroup, onClear }) {
    const theme = useTheme();
    const details = useMemo(() => {
        if (!selectedGroup) return null;
        const idx = survey.groups.indexOf(selectedGroup);
        if (idx === -1) return null;

        const items = [];
        if (survey.bl1[idx] != null) items.push({ label: 'vs BL1', value: fmt(survey.bl1[idx]) });
        if (survey.bl2[idx] != null) items.push({ label: 'vs BL2', value: fmt(survey.bl2[idx]) });
        if (survey.futureDemand?.[selectedGroup])
            items.push({ label: 'Current Qtr forecast', value: fmt(survey.futureDemand[selectedGroup].currentQtr) });
        if (survey.inventoryTrend?.[selectedGroup]) items.push({ label: 'Inventory trend', value: survey.inventoryTrend[selectedGroup] });
        if (survey.inventoryTarget?.[selectedGroup]) items.push({ label: 'Inventory target', value: survey.inventoryTarget[selectedGroup] });
        if (survey.orderCancellation?.[selectedGroup]) items.push({ label: 'Order cancellation', value: survey.orderCancellation[selectedGroup] });

        return items.length > 0 ? items : null;
    }, [selectedGroup, survey]);

    if (!details) return null;

    return (
        <Paper
            variant="outlined"
            sx={{
                mb: 2,
                p: 2,
                borderColor: selectionColors.border,
                bgcolor: selectionColors.background,
                borderWidth: 2,
                borderRadius: 2
            }}
        >
            <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: selectionColors.border }} />
                <Typography variant="subtitle2" fontWeight={700}>
                    {selectedGroup} — Selected
                </Typography>
                <Typography
                    variant="caption"
                    onClick={onClear}
                    sx={{
                        ml: 'auto',
                        cursor: 'pointer',
                        color: colorStyled.outline,
                        '&:hover': { color: colorStyled.onSurface }
                    }}
                >
                    clear ×
                </Typography>
            </Stack>
            <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
                {details.map(item => (
                    <Box key={item.label}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                            {item.label}
                        </Typography>
                        <Typography variant="body1" fontWeight={700}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
});

// ─── FutureDemandChart ────────────────────────────────────────────────────────
// Line chart showing demand forecast across 8 quarters for each group.
// This is the most forward-looking data in the TTL and was previously
// only accessible by clicking individual groups in the old GroupDetailPanel.
// Showing all groups together reveals which powertrain / tech node has the
// strongest forward momentum.

function FutureDemandChart({ survey }) {
    const theme = useTheme();
    const { series, options } = useMemo(() => {
        const seriesData = Object.entries(survey.futureDemand).map(([groupName, groupData]) => ({
            name: groupName,
            data: (groupData.quarters ?? []).map(q => q.value ?? 0)
        }));

        const quarters = Object.values(survey.futureDemand)[0]?.quarters?.map(q => q.label) ?? [];

        return {
            series: seriesData,
            options: {
                chart: { type: 'line', toolbar: { show: false }, background: 'transparent' },
                stroke: { curve: 'smooth', width: 2.5 },
                xaxis: { categories: quarters, labels: { style: { fontSize: '10px' } } },
                yaxis: {
                    labels: {
                        formatter: v => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
                        style: { fontSize: '10px' }
                    }
                },
                legend: { position: 'top', horizontalAlign: 'right', fontSize: '11px' },
                grid: { borderColor: colorStyled.outlineVariant, strokeDashArray: 4 },
                tooltip: { y: { formatter: v => `${v > 0 ? '+' : ''}${v.toFixed(2)}%` } },
                annotations: {
                    yaxis: [{ y: 0, borderColor: colorStyled.outline, borderWidth: 1.5, label: { text: 'Baseline' } }]
                },
                markers: { size: 4 }
            }
        };
    }, [survey]);

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700}>
                    Future Demand Trajectory
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Forecast % change across upcoming quarters — Option 1 baseline
                </Typography>
                <Chart type="line" series={series} options={options} height={260} />
            </CardContent>
        </Card>
    );
}

// ─── CurrentDemandRow ─────────────────────────────────────────────────────────
// Bar chart (BL1/BL2 comparison) + radar (regional split).
// Renamed from ChartsRow — "current" makes it clear this is the snapshot,
// contrasting with FutureDemandChart above.

const CurrentDemandRow = memo(function CurrentDemandRow({ survey, baseline }) {
    const theme = useTheme();
    const { series: barSeries, options: barOptions } = useMemo(() => buildBarOptions(survey, baseline), [survey, baseline]);
    const { series: radarSeries, options: radarOptions } = useMemo(() => buildRadarOptions(survey), [survey]);

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
            <Card variant="outlined" sx={{ flex: 2 }}>
                <CardContent>
                    <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Current Demand vs Baselines
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        % change vs BL1 (last month) and BL2 (last 12 months)
                    </Typography>
                    <Chart type="bar" series={barSeries} options={barOptions} height={260} />
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1, minWidth: 220 }}>
                <CardContent>
                    <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Regional Demand Split
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        Current demand share by region
                    </Typography>
                    <Chart type="radar" series={radarSeries} options={radarOptions} height={260} />
                </CardContent>
            </Card>
        </Stack>
    );
});

// ─── SurveySpecificPanel ──────────────────────────────────────────────────────
// Shows deep-dive data that is unique to each survey domain.
// OEM:  Autonomous driving SAE level adoption by vehicle type + year.
// Semi: Inventory development trend + target indicator table.
// Tier1: Component share activity grid.

function SurveySpecificPanel({ survey, selectedGroup, onGroupSelect }) {
    const theme = useTheme();
    if (survey.key === 'semi') {
        return <SemiInventoryPanel survey={survey} selectedGroup={selectedGroup} onGroupSelect={onGroupSelect} />;
    }
    if (survey.key === 'tier1') {
        return <ComponentSharePanel survey={survey} />;
    }
    return null;
}

// ─── SemiInventoryPanel (Semiconductor only) ──────────────────────────────────
// Combined inventory trend + target status table per technology node.
// Previously buried in GroupDetailPanel — now shown as a first-class table.

function SemiInventoryPanel({ survey, selectedGroup, onGroupSelect }) {
    const theme = useTheme();
    const { inventoryTrend, inventoryTarget, orderCancellation, groups } = survey;
    if (!inventoryTrend && !inventoryTarget) return null;

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    Inventory Status by Technology Node
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Trend direction, target position and order cancellation activity
                </Typography>

                <Table size="small" sx={{ mt: 1.5 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                'th': {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
                                    bgcolor: colorStyled.surfaceContainerLow
                                }
                            }}
                        >
                            <TableCell>Node</TableCell>
                            <TableCell align="center">Inventory Trend</TableCell>
                            <TableCell align="center">vs Target</TableCell>
                            <TableCell align="center">Cancellations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map(groupName => {
                            const trend = inventoryTrend?.[groupName];
                            const target = inventoryTarget?.[groupName];
                            const cancellation = orderCancellation?.[groupName];
                            const isSelected = selectedGroup === groupName;

                            return (
                                <TableRow
                                    key={groupName}
                                    hover
                                    selected={isSelected}
                                    onClick={() => onGroupSelect(isSelected ? null : groupName)}
                                    sx={{
                                        cursor: 'pointer',
                                        '.Mui-selected': { bgcolor: selectionColors.background }
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: isSelected ? 700 : 600, fontSize: 12 }}>{groupName}</TableCell>
                                    <TableCell align="center">
                                        <TrendChip value={trend} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TargetChip value={target} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TrendChip value={cancellation} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// ─── ComponentSharePanel (Tier 1 only) ───────────────────────────────────────
// Shows which component categories Tier 1 suppliers are active in.
// From ComponentShare_Tier1 isActiveInCategory data.

function ComponentSharePanel({ survey }) {
    const theme = useTheme();
    const componentActivity = survey.componentActivity;
    if (!componentActivity) return null;

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    Component Category Activity
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Active component categories reported by Tier 1 suppliers
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1} mt={1.5}>
                    {Object.entries(componentActivity).map(([componentName, isActive]) => (
                        <Chip
                            key={componentName}
                            label={componentName}
                            size="small"
                            icon={isActive ? <CheckCircleIcon /> : undefined}
                            sx={{
                                fontSize: 10,
                                fontWeight: 600,
                                bgcolor: isActive ? graphAccents.demand.fill : theme.palette.background.paper,
                                color: isActive ? sentimentColors.positive : theme.palette.text.secondary,
                                borderColor: isActive ? sentimentColors.positive : colorStyled.outlineVariant,
                                border: '1px solid',
                                '.MuiChip-icon': { color: sentimentColors.positive }
                            }}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

// ─── TrendChip ────────────────────────────────────────────────────────────────

function TrendChip({ value }) {
    const theme = useTheme();
    if (!value) {
        return (
            <Typography variant="caption" sx={{ color: colorStyled.outline }}>
                —
            </Typography>
        );
    }

    const normalised = value.toLowerCase();

    if (normalised.includes('increase')) {
        return (
            <Chip
                icon={<TrendingUpIcon />}
                label="Increase"
                size="small"
                sx={{
                    fontSize: 9,
                    bgcolor: graphAccents.demand.fill,
                    color: sentimentColors.positive,
                    '.MuiChip-icon': { color: sentimentColors.positive }
                }}
            />
        );
    }

    if (normalised.includes('decrease')) {
        return (
            <Chip
                icon={<TrendingDownIcon />}
                label="Decrease"
                size="small"
                sx={{
                    fontSize: 9,
                    bgcolor: theme.palette.error.mainContainer,
                    color: sentimentColors.negative,
                    '.MuiChip-icon': { color: sentimentColors.negative }
                }}
            />
        );
    }

    return (
        <Chip
            icon={<RemoveIcon />}
            label={value}
            size="small"
            sx={{
                fontSize: 9,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                '.MuiChip-icon': { color: theme.palette.text.secondary }
            }}
        />
    );
}

// ─── TargetChip ───────────────────────────────────────────────────────────────

function TargetChip({ value }) {
    const theme = useTheme();
    if (!value) {
        return (
            <Typography variant="caption" sx={{ color: colorStyled.outline }}>
                —
            </Typography>
        );
    }

    const normalised = value.toLowerCase();
    const isAbove = normalised.includes('above');
    const isBelow = normalised.includes('below');

    return (
        <Chip
            label={value}
            size="small"
            sx={{
                fontSize: 9,
                fontWeight: 600,
                bgcolor: isAbove ? theme.palette.error.mainContainer : isBelow ? theme.palette.primary.mainContainer : graphAccents.demand.fill,
                color: isAbove ? sentimentColors.negative : isBelow ? theme.palette.primary.main : sentimentColors.positive
            }}
        />
    );
}

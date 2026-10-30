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
import { useThemePalette, sentimentColors, selectionColors, graphAccents, chartColors } from '../config/theme';
import { buildBarOptions, buildRadarOptions, fmt } from './chartHelpers';

// ─── SurveyDashboard ─────────────────────────────────────────────────────────

export const SurveyDashboard = memo(function SurveyDashboard({
    surveys,
    activeSurvey,
    onSurveyChange,
    selectedGroup,
    onGroupSelect,
    uploadedSchema
}) {
    const theme = useTheme();
    const [baseline, setBaseline] = useState('both');

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
            <ShortageAlert survey={activeSurvey} />
            <GroupDetailPanel survey={activeSurvey} selectedGroup={selectedGroup} onClear={() => onGroupSelect(null)} />

            {/* Row 1: current demand bar + regional radar — shown for all surveys */}
            <CurrentDemandRow survey={activeSurvey} baseline={baseline} selectedGroup={selectedGroup} />

            {/* Row 2: future demand line chart — shown when data is available */}
            {activeSurvey.futureDemand && uploadedSchema && <FutureDemandChart survey={activeSurvey} selectedGroup={selectedGroup} />}

            {/* Row 3: survey-specific deep-dive */}
            <SurveySpecificPanel survey={activeSurvey} selectedGroup={selectedGroup} onGroupSelect={onGroupSelect} />
        </Box>
    );
});

// ─── SurveyTabs ───────────────────────────────────────────────────────────────

const SurveyTabs = memo(function SurveyTabs({ surveys, activeKey, onChange }) {
    const { colorStyled } = useThemePalette();
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
                '.MuiTab-root': { fontSize: 12, fontWeight: 600, textTransform: 'none', minHeight: 40, py: 0.5, color: theme.palette.text.secondary },
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
                onChange={(_, v) => v && setBaseline(v)}
                size="small"
                sx={{ '.MuiToggleButton-root': { fontSize: 11, color: theme.palette.text.secondary } }}
            >
                <ToggleButton value="both">BL1 + BL2</ToggleButton>
                <ToggleButton value="bl1">BL1 only</ToggleButton>
                <ToggleButton value="bl2">BL2 only</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
});

// ─── ShortageAlert ────────────────────────────────────────────────────────────

function ShortageAlert({ survey }) {
    const shortageData = survey.shortageData;
    if (!shortageData) return null;
    const hasShortage = shortageData.yes > 0;

    let shortageText = 'No respondents reported shortage data';
    if (shortageText.total > 0) {
        if (hasShortage) {
            shortageText = `${shortageData.yes} of ${shortageData.total} respondents report active shortage`;
        } else {
            shortageText = `${shortageData.no} of ${shortageData.total} respondents report no shortage`;
        }
    }

    return (
        <Alert
            severity={hasShortage ? 'warning' : 'success'}
            icon={hasShortage ? <WarningAmberIcon /> : <CheckCircleIcon />}
            sx={{ mb: 2, fontSize: 12 }}
        >
            <strong>Semiconductor Shortage:</strong> {shortageText}
        </Alert>
    );
}

// ─── GroupDetailPanel ─────────────────────────────────────────────────────────

const GroupDetailPanel = memo(function GroupDetailPanel({ survey, selectedGroup, onClear }) {
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    const details = useMemo(() => {
        if (!selectedGroup) return null;
        const idx = survey.groups.indexOf(selectedGroup);
        if (idx === -1) return null;
        const items = [];
        if (survey.bl1[idx] != null) items.push({ label: 'vs BL1', value: fmt(survey.bl1[idx]) });
        if (survey.bl2[idx] != null) items.push({ label: 'vs BL2', value: fmt(survey.bl2[idx]) });
        if (survey.inventoryTrend?.[selectedGroup]) items.push({ label: 'Inventory trend', value: survey.inventoryTrend[selectedGroup] });
        if (survey.inventoryTarget?.[selectedGroup]) items.push({ label: 'vs Target', value: survey.inventoryTarget[selectedGroup] });
        if (survey.orderCancellation?.[selectedGroup]) items.push({ label: 'Order cancellation', value: survey.orderCancellation[selectedGroup] });
        return items.length > 0 ? items : null;
    }, [selectedGroup, survey]);

    if (!details) return null;

    return (
        <Paper
            variant="outlined"
            sx={{ mb: 2, p: 2, borderColor: selectionColors.border, bgcolor: selectionColors.background, borderWidth: 2, borderRadius: 2 }}
        >
            <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: selectionColors.border }} />
                <Typography variant="subtitle2" fontWeight={700}>
                    {selectedGroup} — Selected
                </Typography>
                <Typography
                    variant="caption"
                    onClick={onClear}
                    sx={{ ml: 'auto', cursor: 'pointer', color: colorStyled.outline, '&:hover': { color: colorStyled.onSurface } }}
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

// ─── CurrentDemandRow ─────────────────────────────────────────────────────────

const CurrentDemandRow = memo(function CurrentDemandRow({ survey, baseline, selectedGroup }) {
    const theme = useTheme();
    const { series: barSeries, options: barOptions } = useMemo(() => buildBarOptions(survey, baseline, selectedGroup), [
        survey,
        baseline,
        selectedGroup
    ]);
    const { series: radarSeries, options: radarOptions } = useMemo(() => buildRadarOptions(survey), [survey]);

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
            <Card variant="outlined" sx={{ flex: 2 }}>
                <CardContent>
                    <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Current Demand vs Baselines
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        % change vs BL1 (last month) and BL2 (last 12 months) - Automotive segment aggregation
                    </Typography>
                    <Chart type="bar" series={barSeries} options={barOptions} height={240} />
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
                    <Chart type="radar" series={radarSeries} options={radarOptions} height={240} />
                </CardContent>
            </Card>
        </Stack>
    );
});

// ─── FutureDemandChart ────────────────────────────────────────────────────────
// futureDemand shape: { groupName: [{ label, value }, ...], ... }
// selectedGroup: highlight the matching series, dim all others.

function FutureDemandChart({ survey, selectedGroup }) {
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    const { series, options } = useMemo(() => {
        const entries = Object.entries(survey.futureDemand);
        const quarters = entries[0]?.[1]?.map(q => q.label) ?? [];
        const hasSelection = Boolean(selectedGroup) && entries.some(([g]) => g === selectedGroup);

        const seriesData = entries.map(([groupName, quarters_]) => ({
            name: groupName,
            data: quarters_.map(q => q.value ?? 0)
        }));

        const strokeWidths = seriesData.map(s => (!hasSelection || s.name === selectedGroup ? 3 : 1.5));
        const seriesOpacity = seriesData.map(s => (!hasSelection || s.name === selectedGroup ? 1 : 0.15));

        // Detect whether the first x-axis point is "Current Quarter" so we can
        // annotate it with a clarifying label.
        const firstLabel = quarters[0] ?? '';
        const hasCurrentQtr = firstLabel.toLowerCase().includes('current');

        return {
            series: seriesData,
            options: {
                chart: {
                    type: 'line',
                    toolbar: { show: false },
                    background: 'transparent',
                    animations: { enabled: false }
                },
                stroke: { curve: 'smooth', width: strokeWidths },
                fill: { opacity: seriesOpacity },
                xaxis: {
                    categories: quarters,
                    labels: { style: { fontSize: '10px' } },
                    tooltip: { enabled: false }
                },
                yaxis: {
                    labels: {
                        formatter: v => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
                        style: { fontSize: '10px' }
                    }
                },
                legend: { position: 'top', horizontalAlign: 'right', fontSize: '11px' },
                grid: { borderColor: colorStyled.outlineVariant, strokeDashArray: 4 },
                tooltip: {
                    x: {
                        // When hovering over "Current Quarter", append a clarifying note.
                        formatter: val =>
                            hasCurrentQtr &&
                            String(val)
                                .toLowerCase()
                                .includes('current')
                                ? `${val} (forecast made during this quarter)`
                                : String(val)
                    },
                    y: { formatter: v => `${v > 0 ? '+' : ''}${v.toFixed(2)}%` }
                },
                annotations: {
                    yaxis: [{ y: 0, borderColor: colorStyled.outline, borderWidth: 1.5, label: { text: 'Baseline' } }],
                    // Vertical dashed line on "Current Quarter" with an explanatory label.
                    ...(hasCurrentQtr
                        ? {
                              xaxis: [
                                  {
                                      x: firstLabel,
                                      borderColor: colorStyled.primary,
                                      borderWidth: 1.5,
                                      strokeDashArray: 4
                                  }
                              ]
                          }
                        : {})
                },
                markers: {
                    size: seriesData.map(s => (!hasSelection || s.name === selectedGroup ? 5 : 2)),
                    strokeWidth: 0
                }
            }
        };
    }, [survey, selectedGroup, colorStyled]);

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700}>
                    Future Demand Trajectory {'   '}
                    <Typography
                        variant="caption"
                        title="'Current Quarter' is the quarter during which this survey was collected. All other quarters are forward-looking forecasts made at that time."
                        sx={{
                            color: theme.palette.primary.main,
                            cursor: 'help',
                            borderBottom: `1px dotted ${theme.palette.primary.main}`
                        }}
                    >
                        what is "Current Quarter"?
                    </Typography>
                </Typography>

                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Forecast % change vs baseline across upcoming quarters
                    {selectedGroup ? ` · ${selectedGroup} highlighted` : ''}
                </Typography>
                <Chart type="line" series={series} options={options} height={260} />
            </CardContent>
        </Card>
    );
}

// ─── SurveySpecificPanel ──────────────────────────────────────────────────────

function SurveySpecificPanel({ survey, selectedGroup, onGroupSelect }) {
    if (survey.key === 'oem') {
        return <AdDevelopmentPanel survey={survey} />;
    }
    if (survey.key === 'semi') {
        return <SemiInventoryPanel survey={survey} selectedGroup={selectedGroup} onGroupSelect={onGroupSelect} />;
    }
    if (survey.key === 'tier1') {
        return <Tier1SpecificPanel survey={survey} />;
    }
    return null;
}

// ─── AdDevelopmentPanel (OEM only) ───────────────────────────────────────────
// Heatmap: rows = SAE Level 1–5, columns = Year 2026/2027/2028, series = vehicle type.

function AdDevelopmentPanel({ survey }) {
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    const adData = survey.autonomousDriving;
    if (!adData) return null;

    const vehicleTypes = Object.keys(adData);
    const saeLevels = ['SAE 1', 'SAE 2', 'SAE 3', 'SAE 4', 'SAE 5'];
    const years = [2026, 2027, 2028];

    // Build one series per vehicle type; each series has one data point per SAE level per year.
    // We flatten into a stacked bar: x = "VehicleType / Year", y = %.
    const categories = vehicleTypes.flatMap(vt => years.map(yr => `${vt} ${yr}`));

    const series = saeLevels.map(level => ({
        name: level,
        data: vehicleTypes.flatMap(vt => years.map(yr => Math.round(adData[vt]?.[level]?.[yr] ?? 0)))
    }));

    const options = {
        chart: { type: 'bar', stacked: true, toolbar: { show: false }, background: 'transparent' },
        plotOptions: { bar: { horizontal: false, columnWidth: '70%' } },
        xaxis: { categories, labels: { style: { fontSize: '9px' }, rotate: -30 } },
        yaxis: { max: 100, labels: { formatter: v => `${v}%`, style: { fontSize: '10px' } } },
        legend: { position: 'top', fontSize: '11px' },
        tooltip: { y: { formatter: v => `${v}%` } },
        grid: { borderColor: colorStyled.outlineVariant, strokeDashArray: 4 },
        dataLabels: { enabled: false }
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700}>
                    Autonomous Driving Development
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    SAE level adoption % by vehicle type and year (stacked to 100%)
                </Typography>
                <Chart type="bar" series={series} options={options} height={280} />
            </CardContent>
        </Card>
    );
}

// ─── SemiInventoryPanel (Semiconductor only) ──────────────────────────────────

function SemiInventoryPanel({ survey, selectedGroup, onGroupSelect }) {
    const { colorStyled } = useThemePalette();
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
                    Trend direction, target position and order cancellation activity per process node
                </Typography>
                <Table size="small" sx={{ mt: 1.5 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                th: { fontSize: 10, fontWeight: 700, color: theme.palette.text.secondary, bgcolor: colorStyled.surfaceContainerLow }
                            }}
                        >
                            <TableCell>Node</TableCell>
                            <TableCell align="center">Inventory Trend</TableCell>
                            <TableCell align="center">vs Target</TableCell>
                            <TableCell align="center">Order Cancellations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map(groupName => {
                            const isSelected = selectedGroup === groupName;
                            return (
                                <TableRow
                                    key={groupName}
                                    hover
                                    selected={isSelected}
                                    onClick={() => onGroupSelect(isSelected ? null : groupName)}
                                    sx={{ cursor: 'pointer', '.Mui-selected': { bgcolor: selectionColors.background } }}
                                >
                                    <TableCell sx={{ fontWeight: isSelected ? 700 : 600, fontSize: 12 }}>{groupName}</TableCell>
                                    <TableCell align="center">
                                        <TrendChip value={inventoryTrend?.[groupName]} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TargetChip value={inventoryTarget?.[groupName]} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TrendChip value={orderCancellation?.[groupName]} />
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

// ─── Tier1SpecificPanel ───────────────────────────────────────────────────────

function Tier1SpecificPanel({ survey }) {
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
            <ComponentSplitDonut survey={survey} />
            <InventoryTrendByComponent survey={survey} />
        </Stack>
    );
}

// ─── ComponentSplitDonut (Tier 1 only) ───────────────────────────────────────

function ComponentSplitDonut({ survey }) {
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    const split = survey.componentSplit;
    if (!split) return null;

    const labels = Object.keys(split);
    const values = Object.values(split);

    const options = {
        chart: { type: 'donut', toolbar: { show: false }, background: 'transparent' },
        labels,
        colors: [graphAccents.demand?.stroke ?? chartColors.series1, colorStyled.outline],
        legend: { position: 'bottom', fontSize: '11px' },
        dataLabels: { formatter: v => `${v.toFixed(0)}%` },
        plotOptions: { pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'Split', fontSize: '12px' } } } } },
        tooltip: { y: { formatter: v => `${v}%` } }
    };

    return (
        <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    EV vs non-EV Component Split
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Share of EV and non-EV components in Tier 1 supply
                </Typography>
                <Chart type="donut" series={values} options={options} height={240} />
            </CardContent>
        </Card>
    );
}

// ─── InventoryTrendByComponent (Tier 1 only) ──────────────────────────────────

function InventoryTrendByComponent({ survey }) {
    const theme = useTheme();
    const trends = survey.inventoryTrends;
    if (!trends || Object.keys(trends).length === 0) return null;

    return (
        <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    Inventory Trend by Component Type
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Direction of inventory change for EV, non-EV and combined components
                </Typography>
                <Stack spacing={1.5} mt={2}>
                    {Object.entries(trends).map(([componentType, trend]) => (
                        <Stack key={componentType} direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" fontWeight={600}>
                                {componentType}
                            </Typography>
                            <TrendChip value={trend} />
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

// ─── TrendChip ────────────────────────────────────────────────────────────────

function TrendChip({ value }) {
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    if (!value)
        return (
            <Typography variant="caption" sx={{ color: colorStyled.outline }}>
                —
            </Typography>
        );

    const normalised = value.toLowerCase();

    if (normalised.includes('increase')) {
        return (
            <Chip
                icon={<TrendingUpIcon />}
                label="Increase"
                size="small"
                sx={{
                    fontSize: 9,
                    bgcolor: graphAccents.demand?.fill ?? chartColors.series1 + '30',
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
    const { colorStyled } = useThemePalette();
    const theme = useTheme();
    if (!value)
        return (
            <Typography variant="caption" sx={{ color: colorStyled.outline }}>
                —
            </Typography>
        );

    const normalised = value.toLowerCase();
    const isAbove = normalised.includes('above');
    const isBelow = normalised.includes('below');
    let chipBgColor = graphAccents.demand?.fill ?? chartColors.series1 + '30';
    if (isAbove) {
        chipBgColor = theme.palette.error.mainContainer;
    } else if (isBelow) {
        chipBgColor = theme.palette.primary.mainContainer;
    }

    let chipColor = sentimentColors.positive;
    if (isAbove) {
        chipColor = sentimentColors.negative;
    } else if (isBelow) {
        chipColor = theme.palette.primary.main;
    }

    return (
        <Chip
            label={value}
            size="small"
            sx={{
                fontSize: 9,
                fontWeight: 600,
                bgcolor: chipBgColor,
                color: chipColor
            }}
        />
    );
}

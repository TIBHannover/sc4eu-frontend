import { chartColors } from '../config/theme';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

// Adds an explicit "+" sign to positive numbers, used everywhere we show
// a signed percentage change.
const withSign = (value) => (value > 0 ? `+${value}` : `${value}`);

// Formats a raw value (or null) as a signed percentage string for display,
// e.g. 3.456 -> "+3.46%", -1.2 -> "-1.20%", null -> "—".
export const fmt = (value) => {
  if (value === null) return '—';
  return `${withSign(value.toFixed(2))}%`;
};

// ---------------------------------------------------------------------------
// Radar chart (regional demand)
// ---------------------------------------------------------------------------

export const buildRadarOptions = (survey) => {
  const regions = Object.keys(survey.regionalDemand);
  const values = Object.values(survey.regionalDemand);

  return {
    series: [{ name: 'Demand share %', data: values }],
    options: {
      chart: {
        type: 'radar',
        toolbar: { show: false },
        background: 'transparent',
      },
      xaxis: { categories: regions },
      fill: { opacity: 0.25, colors: [chartColors.series1] },
      stroke: { show: true, width: 2, colors: [chartColors.series1] },
      markers: { size: 4, colors: [chartColors.series1] },
      dataLabels: { enabled: true, style: { fontSize: '10px' } },
      yaxis: { show: false },
    },
  };
};

// ---------------------------------------------------------------------------
// Bar chart (baseline comparison)
//
// When selectedGroup is provided, the matching column is highlighted and the
// rest are dimmed. This relies on ApexCharts' per-data-point colour function,
// which is the only reliable way to colour individual bars across series.
// ---------------------------------------------------------------------------

export const buildBarOptions = (survey, baseline, selectedGroup) => {
  const showBL1 = baseline !== 'bl2';
  const showBL2 = baseline !== 'bl1';
  const showBothBaselines = baseline === 'both';

  const groups = survey.groups;
  const hasSelection = Boolean(selectedGroup) && groups.includes(selectedGroup);

  const baseColors = [chartColors.series1, chartColors.series2];

  // Decide the bar colour for a given series/data point.
  const getBarColor = ({ seriesIndex, dataPointIndex }) => {
    const baseColor = baseColors[seriesIndex] ?? chartColors.series1;

    if (!hasSelection) {
      return baseColor;
    }

    const isSelectedGroup = groups[dataPointIndex] === selectedGroup;
    if (isSelectedGroup) {
      return baseColor;
    }

    // Dim non-selected columns by appending the muted alpha suffix.
    return `${baseColor}${chartColors.mutedAlpha}`;
  };

  // Build the series list, only including baselines that are visible.
  const series = [];
  if (showBL1) {
    series.push({ name: 'vs BL1', data: survey.bl1.map((v) => v ?? 0) });
  }
  if (showBL2) {
    series.push({ name: 'vs BL2', data: survey.bl2.map((v) => v ?? 0) });
  }

  // When only one baseline is shown, that single series is always at
  // seriesIndex 0 in the chart, so we need to know which source array
  // (bl1 or bl2) it actually maps to when looking up raw values.
  const getRawValue = (seriesIndex, dataPointIndex) => {
    const isFirstSeriesBL1 = seriesIndex === 0 && showBL1;
    const sourceArray = isFirstSeriesBL1 ? survey.bl1 : survey.bl2;
    return sourceArray[dataPointIndex];
  };

  const formatDataLabel = (_, { seriesIndex, dataPointIndex }) => {
    const raw = getRawValue(seriesIndex, dataPointIndex);
    return raw === null ? '' : fmt(raw);
  };

  const getAxisLabelColor = (group) => {
    const isActive = !hasSelection || group === selectedGroup;
    return isActive ? chartColors.axisLabelActive : chartColors.axisLabelMuted;
  };

  return {
    series,
    options: {
      chart: {
        type: 'bar',
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: false },
      },
      theme: { mode: 'light' },
      colors: [getBarColor],
      fill: { opacity: 1 },
      plotOptions: {
        bar: {
          columnWidth: showBothBaselines ? '55%' : '30%',
          borderRadius: 4,
          dataLabels: { position: 'top' },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: formatDataLabel,
        offsetY: -18,
        style: {
          fontSize: '10px',
          colors: [chartColors.dataLabel],
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: groups,
        labels: {
          style: {
            fontSize: '11px',
            fontWeight: 600,
            colors: groups.map(getAxisLabelColor),
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (v) => `${withSign(v)}%`,
          style: { fontSize: '10px' },
        },
      },
      legend: {
        show: showBothBaselines,
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '11px',
      },
      grid: { borderColor: chartColors.gridBorder, strokeDashArray: 4 },
      tooltip: {
        y: { formatter: (v) => `${withSign(v.toFixed(2))}%` },
      },
      annotations: {
        yaxis: [{ y: 0, borderColor: chartColors.zeroline, borderWidth: 1.5 }],
      },
    },
  };
};
import { chartColors } from '../config/theme';

export const buildRadarOptions = (survey) => {
  const regions = Object.keys(survey.regionalDemand);
  const vals = Object.values(survey.regionalDemand);
  return {
    series: [{ name: "Demand share %", data: vals }],
    options: {
      chart: {
        type: "radar",
        toolbar: { show: false },
        background: "transparent",
      },
      xaxis: { categories: regions },
      fill: { opacity: 0.25, colors: [chartColors.series1] },
      stroke: { show: true, width: 2, colors: [chartColors.series1] },
      markers: { size: 4, colors: [chartColors.series1] },
      dataLabels: { enabled: true, style: { fontSize: "10px" } },
      yaxis: { show: false },
    },
  };
};

// buildBarOptions: when selectedGroup is provided, highlight the matching column
// and dim the rest. Uses a colours function — the only reliable ApexCharts
// mechanism for per-data-point colouring across multiple series.
export const buildBarOptions = (survey, baseline, selectedGroup) => {
  const showBL1 = baseline !== "bl2";
  const showBL2 = baseline !== "bl1";

  const groups = survey.groups;
  const hasSelection = Boolean(selectedGroup) && groups.includes(selectedGroup);

  const baseColors = [chartColors.series1, chartColors.series2];

  const colorsFn = ({ seriesIndex, dataPointIndex }) => {
    const base = baseColors[seriesIndex] ?? chartColors.series1;
    if (!hasSelection) return base;
    return groups[dataPointIndex] === selectedGroup
      ? base
      : `${base}${chartColors.mutedAlpha}`;
  };

  const series = [
    ...(showBL1
      ? [{ name: "vs BL1", data: survey.bl1.map((v) => v ?? 0) }]
      : []),
    ...(showBL2
      ? [{ name: "vs BL2", data: survey.bl2.map((v) => v ?? 0) }]
      : []),
  ];

  return {
    series,
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
        background: "transparent",
        animations: { enabled: false },
      },
      theme: { mode: "light" },
      colors: [colorsFn],
      fill: { opacity: 1 },
      plotOptions: {
        bar: {
          columnWidth: baseline === "both" ? "55%" : "30%",
          borderRadius: 4,
          dataLabels: { position: "top" },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (_, { seriesIndex, dataPointIndex }) => {
          const raw =
            seriesIndex === 0
              ? showBL1
                ? survey.bl1[dataPointIndex]
                : survey.bl2[dataPointIndex]
              : survey.bl2[dataPointIndex];
          return raw === null ? "" : fmt(raw);
        },
        offsetY: -18,
        style: { fontSize: "10px", colors: [chartColors.dataLabel], fontWeight: 600 },
      },
      xaxis: {
        categories: groups,
        labels: {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            colors: groups.map(g =>
              !hasSelection || g === selectedGroup
                ? chartColors.axisLabelActive
                : chartColors.axisLabelMuted
            ),
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (v) => `${v > 0 ? "+" : ""}${v}%`,
          style: { fontSize: "10px" },
        },
      },
      legend: {
        show: baseline === "both",
        position: "top",
        horizontalAlign: "right",
        fontSize: "11px",
      },
      grid: { borderColor: chartColors.gridBorder, strokeDashArray: 4 },
      tooltip: {
        y: { formatter: (v) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%` },
      },
      annotations: {
        yaxis: [{ y: 0, borderColor: chartColors.zeroline, borderWidth: 1.5 }],
      },
    },
  };
};

export const fmt = (v) => v === null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

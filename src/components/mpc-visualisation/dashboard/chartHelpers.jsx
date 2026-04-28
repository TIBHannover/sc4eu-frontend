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
      fill: { opacity: 0.25, colors: ["#3b82f6"] },
      stroke: { show: true, width: 2, colors: ["#3b82f6"] },
      markers: { size: 4, colors: ["#3b82f6"] },
      dataLabels: { enabled: true, style: { fontSize: "10px" } },
      yaxis: { show: false },
    },
  };
}

export const buildBarOptions = (survey, baseline) => {
  const showBL1 = baseline !== "bl2";
  const showBL2 = baseline !== "bl1";
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
      },
      theme: { mode: "light" },
      colors: ["#3b82f6", "#f97316"],
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
        style: { fontSize: "10px", colors: ["#374151"], fontWeight: 600 },
      },
      xaxis: {
        categories: survey.groups,
        labels: { style: { fontSize: "11px", fontWeight: 600 } },
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
      grid: { borderColor: "#e5e7eb", strokeDashArray: 4 },
      tooltip: {
        y: { formatter: (v) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%` },
      },
      annotations: {
        yaxis: [{ y: 0, borderColor: "#9ca3af", borderWidth: 1.5 }],
      },
    },
  };
}

export const fmt = (v) => v === null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;
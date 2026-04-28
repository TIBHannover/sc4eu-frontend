import materialTheme from '../../../styledComponents/material-theme.json';

export const colorStyled = materialTheme.schemes.light;

export const graphAccents = {
    demand: { fill: '#DCFCE7', stroke: '#16A34A', text: '#14532D' },
    vehicle: { fill: '#FFEDD5', stroke: '#EA580C', text: '#7C2D12' },
    inventory: { fill: '#CFFAFE', stroke: '#0891B2', text: '#164E63' },
    ad: { fill: '#FEF3C7', stroke: '#D97706', text: '#78350F' },
    shortage: { fill: '#FCE7F3', stroke: '#DB2777', text: '#831843' },
    time: { fill: '#CCFBF1', stroke: '#0D9488', text: '#134E4A' }
};

// Edge stroke colors expressed as named intents
// so call sites read as edgeColors.highlight rather than a raw hex.
export const edgeColors = {
    subclass: colorStyled.outlineVariant,
    property: colorStyled.outline,
    highlight: colorStyled.primary,
    muted: colorStyled.surfaceDim
};

// Semantic colors for positive/negative values in charts and KPI cards.
export const sentimentColors = {
    positive: graphAccents.demand.stroke, // reuses the same green, no duplicate hex
    negative: colorStyled.error
};

// Selection highlight used by KpiCard and any other selectable surface.
export const selectionColors = {
    border: '#FACC15',
    background: '#FEFCE8'
};

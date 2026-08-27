import { useTheme } from '@mui/material/styles';

// ─── Static constants ─────────────────────────────────────────────────────────
// These do NOT depend on the theme mode and can remain module-level.

// Graph accent palettes used by force tree and edge colouring.
export const graphAccents = {
    demand:    { fill: '#DCFCE7', stroke: '#16A34A', text: '#14532D' },
    vehicle:   { fill: '#FFEDD5', stroke: '#EA580C', text: '#7C2D12' },
    inventory: { fill: '#CFFAFE', stroke: '#0891B2', text: '#164E63' },
    ad:        { fill: '#FEF3C7', stroke: '#D97706', text: '#78350F' },
    shortage:  { fill: '#FCE7F3', stroke: '#DB2777', text: '#831843' },
    time:      { fill: '#CCFBF1', stroke: '#0D9488', text: '#134E4A' },
};

// ApexCharts series colours and label colours (chart content, not chrome).
export const chartColors = {
    series1:         '#3b82f6',
    series2:         '#f97316',
    mutedAlpha:      '2e',
    dataLabel:       '#374151',
    axisLabelActive: '#111827',
    axisLabelMuted:  '#9ca3af',
    gridBorder:      '#e5e7eb',
    zeroline:        '#9ca3af',
    minimapMask:     'rgba(255,255,255,0.7)',
};

// Force-tree domain colour palette — 10 rotating slots.
export const domainColors = [
    { fill: '#DBEAFE', stroke: '#2563EB', text: '#1E3A8A' },
    { fill: '#DCFCE7', stroke: '#16A34A', text: '#14532D' },
    { fill: '#FEF3C7', stroke: '#D97706', text: '#78350F' },
    { fill: '#F3E8FF', stroke: '#9333EA', text: '#581C87' },
    { fill: '#FFE4E6', stroke: '#E11D48', text: '#881337' },
    { fill: '#CFFAFE', stroke: '#0891B2', text: '#164E63' },
    { fill: '#FEE2E2', stroke: '#DC2626', text: '#7F1D1D' },
    { fill: '#FFEDD5', stroke: '#EA580C', text: '#7C2D12' },
    { fill: '#F0FDF4', stroke: '#15803D', text: '#14532D' },
    { fill: '#EDE9FE', stroke: '#7C3AED', text: '#4C1D95' },
];

// Selection highlight — intentionally a fixed yellow accent on both modes.
export const selectionColors = {
    border:     '#FACC15',
    background: '#FEFCE8',
};

// Sentiment colours — positive is a static green; negative follows the theme
// error token so it's also exported statically here using a close approximation,
// and the hook provides the exact theme-aware value.
export const sentimentColors = {
    positive: graphAccents.demand.stroke, // '#16A34A'
    negative: '#B00020',                  // close to Material error in light mode
};

// Box-shadow strings — completely static (rgba only, no theme tokens).
export const shadows = {
    nodeDefault:    '0 1px 4px rgba(0,0,0,0.06)',
    nodeSelectable: (stroke) => `0 0 0 1.5px ${stroke}44, 0 2px 6px rgba(0,0,0,0.07)`,
    nodeSelected:   (stroke) => `0 0 0 3px ${stroke}55, 0 4px 14px rgba(0,0,0,0.12)`,
    cardHover:      '0 2px 8px rgba(0,0,0,0.06)',
};

// ─── Theme-reactive hook ──────────────────────────────────────────────────────
// Call this inside any functional component to get the full set of design
// tokens resolved to the current light/dark mode.  Returns the same shape
// previously exported as module-level constants (colorStyled, edgeColors,
// sentimentColors, shadows) so callers can destructure what they need.

export function useThemePalette() {
    const theme = useTheme();
    const p = theme.palette;

    // Convenience aliases that match the former colorStyled.* names.
    const colorStyled = {
        primary:                p.primary.main,
        onPrimary:              p.primary.contrastText,
        primaryContainer:       p.primary.light,
        onPrimaryContainer:     p.primary.onContainer,
        secondary:              p.secondary.main,
        onSecondary:            p.secondary.contrastText,
        secondaryContainer:     p.secondary.light,
        onSecondaryContainer:   p.secondary.onContainer,
        tertiary:               p.tertiary.main,
        onTertiary:             p.tertiary.contrastText,
        tertiaryContainer:      p.tertiary.light,
        onTertiaryContainer:    p.tertiary.onContainer,
        error:                  p.error.main,
        background:             p.background.default,
        surface:                p.surface.main,
        surfaceDim:             p.surface.dim,
        surfaceContainerLow:    p.surface.containerLow,
        surfaceContainer:       p.surface.container,
        surfaceContainerHigh:   p.surface.containerHigh,
        surfaceContainerLowest: p.background.paper,
        onSurface:              p.text.primary,
        onSurfaceVariant:       p.text.secondary,
        outline:                p.outline.main,
        outlineVariant:         p.outline.variant,
        inverseSurface:         p.inverseSurface,
    };

    const edgeColors = {
        subclass:  colorStyled.outlineVariant,
        property:  colorStyled.outline,
        highlight: colorStyled.primary,
        muted:     colorStyled.surfaceDim,
        labelBg:   colorStyled.surfaceContainerLowest,
        labelText: colorStyled.onSurfaceVariant,
    };

    // Override negative with the exact theme error token (the static export uses
    // a fixed approximation; inside the hook we have the real value).
    const themedSentimentColors = {
        positive: sentimentColors.positive,
        negative: colorStyled.error,
    };

    return { colorStyled, edgeColors, sentimentColors: themedSentimentColors, shadows, theme };
}

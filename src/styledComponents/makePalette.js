function makePalette(scheme, mode) {
    return {
        mode,
        primary: {
            main: scheme.primary,
            light: scheme.primaryContainer,
            contrastText: scheme.onPrimary,
            // Extra tokens used in mpc-visualisation
            onContainer: scheme.onPrimaryContainer,
            fixed: scheme.primaryFixed
        },
        secondary: {
            main: scheme.secondary,
            light: scheme.secondaryContainer,
            contrastText: scheme.onSecondary,
            onContainer: scheme.onSecondaryContainer,
        },
        tertiary: {
            main: scheme.tertiary,
            light: scheme.tertiaryContainer,
            contrastText: scheme.onTertiary,
            onContainer: scheme.onTertiaryContainer,
        },
        error: {
            main: scheme.error,
            contrastText: scheme.onError,
        },
        background: {
            default: scheme.background,
            paper: scheme.surfaceContainerLowest,
        },
        text: {
            primary: scheme.onSurface,
            secondary: scheme.onSurfaceVariant,
        },
        // Surface-tier tokens — cover all surface container levels used in mpc-visualisation
        surface: {
            main:          scheme.surface,
            dim:           scheme.surfaceDim,
            containerLow:  scheme.surfaceContainerLow,
            container:     scheme.surfaceContainer,
            containerHigh: scheme.surfaceContainerHigh,
        },
        // Outline tokens
        outline: {
            main:    scheme.outline,
            variant: scheme.outlineVariant,
        },
        // Inverse surface (used for accent chips in the overview nav)
        inverseSurface: scheme.inverseSurface,
    };
}

export default makePalette;

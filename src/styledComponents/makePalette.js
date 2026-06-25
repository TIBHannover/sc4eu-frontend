function makePalette(scheme, mode) {
    return {
        mode,
        primary: {
            main: scheme.primary,
            light: scheme.primaryContainer,
            contrastText: scheme.onPrimary
        },
        secondary: {
            main: scheme.secondary,
            light: scheme.secondaryContainer,
            contrastText: scheme.onSecondary
        },
        error: {
            main: scheme.error,
            contrastText: scheme.onError
        },
        background: {
            default: scheme.background,
            paper: scheme.surfaceContainerLowest

        },
        text: {
            primary: scheme.onSurface,
            secondary: scheme.onSurfaceVariant
        }
    };
}

export default makePalette;

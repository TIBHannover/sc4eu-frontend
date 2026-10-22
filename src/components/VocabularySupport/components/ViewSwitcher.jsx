import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, useTheme } from '@mui/material';

export const VOCABULARY_VIEWS = { MAIN: 'main', AGREED: 'agreed' };

/**
 * Horizontal tabs placed above the table to switch between all terms and the agreed ones.
 * Text-only labels with a term count; on small screens the tabs share the full width.
 */
const ViewSwitcher = ({ value, onChange, mainCount, agreedCount, isMobileScreen }) => {
    const theme = useTheme();

    const tabSx = {
        textTransform: 'none',
        fontWeight: 600,
        minHeight: 40,
        fontSize: isMobileScreen ? '0.8rem' : '0.9rem',
        px: isMobileScreen ? 1 : 2
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
            <Tabs
                value={value}
                onChange={(_, newValue) => onChange(newValue)}
                aria-label="Vocabulary views"
                variant={isMobileScreen ? 'fullWidth' : 'standard'}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ minHeight: 40 }}
                TabIndicatorProps={{ sx: { height: 3, backgroundColor: theme.palette.secondary.main } }}
            >
                <Tab value={VOCABULARY_VIEWS.MAIN} label={`${isMobileScreen ? 'Terms' : 'All terms'} (${mainCount})`} sx={tabSx} />
                <Tab value={VOCABULARY_VIEWS.AGREED} label={`Agreed terms (${agreedCount})`} sx={tabSx} />
            </Tabs>
        </Box>
    );
};

ViewSwitcher.propTypes = {
    value: PropTypes.oneOf(Object.values(VOCABULARY_VIEWS)).isRequired,
    onChange: PropTypes.func.isRequired,
    mainCount: PropTypes.number.isRequired,
    agreedCount: PropTypes.number.isRequired,
    isMobileScreen: PropTypes.bool
};

export default ViewSwitcher;

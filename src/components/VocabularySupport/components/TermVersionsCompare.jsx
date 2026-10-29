import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { StyledChip } from '../../../styledComponents/styledComponents';
import { diffTermVersions, formatVersionDate, STATUS_CHIP_VARIANTS } from '../utils/TermVersions';
import { termVersionPropType } from './TermVersionsToolbar';

const FieldValue = ({ fieldKey, value, variant }) => {
    if (!value) {
        return (
            <Typography variant="body2" fontStyle="italic" color="text.disabled">
                (empty)
            </Typography>
        );
    }
    if (fieldKey === 'status') {
        return <StyledChip label={value} size="small" customVariant={STATUS_CHIP_VARIANTS[value.toLowerCase()] || 'draft'} />;
    }
    return (
        <Typography variant="body1" sx={{ textDecoration: variant === 'removed' ? 'line-through' : 'none', wordBreak: 'break-word' }}>
            {value}
        </Typography>
    );
};

FieldValue.propTypes = {
    fieldKey: PropTypes.string.isRequired,
    value: PropTypes.string,
    variant: PropTypes.oneOf(['removed', 'added', 'unchanged'])
};

const ValueBox = ({ caption, color, children }) => (
    <Box
        sx={{
            px: 1.5,
            py: 1,
            borderRadius: 1,
            borderLeft: theme => `3px solid ${color ? theme.palette[color].main : theme.palette.divider}`,
            backgroundColor: theme => (color ? alpha(theme.palette[color].main, 0.08) : theme.palette.action.hover)
        }}
    >
        {caption && (
            <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
                {caption}
            </Typography>
        )}
        {children}
    </Box>
);

ValueBox.propTypes = {
    caption: PropTypes.string,
    color: PropTypes.oneOf(['error', 'success']),
    children: PropTypes.node.isRequired
};

const TermVersionsCompare = ({ fromVersion, toVersion }) => {
    // MOCK: plain from/to values. Long texts (description) should later get a word-level diff (e.g. jsdiff diffWords).
    const rows = diffTermVersions(fromVersion.term, toVersion.term);
    const changedRows = rows.filter(row => row.changed);
    const unchangedRows = rows.filter(row => !row.changed);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                    Version {fromVersion.number} → Version {toVersion.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formatVersionDate(fromVersion.date)} ({fromVersion.author}) → {formatVersionDate(toVersion.date)} ({toVersion.author})
                </Typography>
            </Box>

            {changedRows.length === 0 && <Alert severity="info">No differences between the selected versions.</Alert>}

            {changedRows.map(row => (
                <Box key={row.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        {row.name}
                    </Typography>
                    <ValueBox caption={`Version ${fromVersion.number}`} color="error">
                        <FieldValue fieldKey={row.key} value={row.from} variant="removed" />
                    </ValueBox>
                    <ValueBox caption={`Version ${toVersion.number}`} color="success">
                        <FieldValue fieldKey={row.key} value={row.to} variant="added" />
                    </ValueBox>
                </Box>
            ))}

            {unchangedRows.length > 0 && (
                <Accordion
                    disableGutters
                    elevation={0}
                    sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' }, '&.Mui-expanded': { margin: 0 } }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" />}
                        sx={{ minHeight: 36, px: 0, '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {unchangedRows.length} unchanged {unchangedRows.length === 1 ? 'field' : 'fields'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, px: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {unchangedRows.map(row => (
                            <Box key={row.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                                <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                                    {row.name}
                                </Typography>
                                <ValueBox>
                                    <FieldValue fieldKey={row.key} value={row.to} variant="unchanged" />
                                </ValueBox>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            )}
        </Box>
    );
};

TermVersionsCompare.propTypes = {
    fromVersion: termVersionPropType.isRequired,
    toVersion: termVersionPropType.isRequired
};

export default TermVersionsCompare;

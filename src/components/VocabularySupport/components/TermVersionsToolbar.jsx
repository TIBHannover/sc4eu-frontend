import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, ListItemText, MenuItem, TextField, Tooltip } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseIcon from '@mui/icons-material/Close';

import { formatVersionDate, VERSIONED_FIELDS } from '../utils/TermVersions';

export const termVersionPropType = PropTypes.shape({
    sha: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    changedFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    term: PropTypes.object.isRequired
});

const FIELD_NAMES = Object.fromEntries(VERSIONED_FIELDS.map(({ key, name }) => [key, name]));

const describeChanges = version =>
    version.changedFields.length ? `Changed: ${version.changedFields.map(key => FIELD_NAMES[key]).join(', ')}` : 'Initial version';

const VersionSelect = ({ versions, value, onChange, label, disabledSha }) => {
    const latestNumber = versions[0]?.number;
    const versionName = version => `Version ${version.number}${version.number === latestNumber ? ' (latest)' : ''}`;

    return (
        <TextField
            select
            size="small"
            label={label}
            value={value}
            onChange={event => onChange(event.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 250 } }}
            SelectProps={{
                renderValue: sha => {
                    const version = versions.find(item => item.sha === sha);
                    return version ? `${versionName(version)} · ${new Date(version.date).toLocaleDateString()}` : '';
                },
                MenuProps: { PaperProps: { sx: { maxHeight: 400 } } }
            }}
        >
            {versions.map(version => (
                <MenuItem key={version.sha} value={version.sha} disabled={version.sha === disabledSha}>
                    <ListItemText
                        primary={versionName(version)}
                        secondary={
                            <>
                                {formatVersionDate(version.date)} · {version.author}
                                <br />
                                {describeChanges(version)}
                            </>
                        }
                    />
                </MenuItem>
            ))}
        </TextField>
    );
};

VersionSelect.propTypes = {
    versions: PropTypes.arrayOf(termVersionPropType).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabledSha: PropTypes.string
};

const toolbarSx = { display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } };

const TermVersionsToolbar = ({ versions, selectedSha, onSelect, compareShas, onCompareChange, onToggleCompare }) => {
    if (compareShas) {
        return (
            <Box sx={toolbarSx}>
                <VersionSelect
                    versions={versions}
                    label="From"
                    value={compareShas.from}
                    disabledSha={compareShas.to}
                    onChange={sha => onCompareChange({ ...compareShas, from: sha })}
                />
                <Tooltip title="Swap versions">
                    <IconButton
                        size="small"
                        aria-label="swap versions"
                        onClick={() => onCompareChange({ from: compareShas.to, to: compareShas.from })}
                    >
                        <SwapHorizIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <VersionSelect
                    versions={versions}
                    label="To"
                    value={compareShas.to}
                    disabledSha={compareShas.from}
                    onChange={sha => onCompareChange({ ...compareShas, to: sha })}
                />
                <Button size="small" startIcon={<CloseIcon fontSize="small" />} onClick={onToggleCompare}>
                    Exit compare
                </Button>
            </Box>
        );
    }

    const canCompare = versions.length > 1;
    return (
        <Box sx={toolbarSx}>
            <VersionSelect versions={versions} label="Version" value={selectedSha} onChange={onSelect} />
            <Tooltip title={canCompare ? 'Compare two versions of this term' : 'This term has only one version'}>
                <span>
                    <Button size="small" startIcon={<CompareArrowsIcon fontSize="small" />} onClick={onToggleCompare} disabled={!canCompare}>
                        Compare
                    </Button>
                </span>
            </Tooltip>
        </Box>
    );
};

TermVersionsToolbar.propTypes = {
    versions: PropTypes.arrayOf(termVersionPropType).isRequired,
    selectedSha: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    compareShas: PropTypes.shape({ from: PropTypes.string.isRequired, to: PropTypes.string.isRequired }),
    onCompareChange: PropTypes.func.isRequired,
    onToggleCompare: PropTypes.func.isRequired
};

export default TermVersionsToolbar;

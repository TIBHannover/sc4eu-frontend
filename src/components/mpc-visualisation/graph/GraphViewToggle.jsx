import { memo } from 'react';
import { ToggleButtonGroup, ToggleButton, Tooltip, useTheme } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { colorStyled } from '../config/theme';

export const GRAPH_VIEW = {
    hierarchy: 'hierarchy',
    force: 'force'
};

const GraphViewToggle = memo(function GraphViewToggle({ activeView, onViewChange }) {
    const theme = useTheme();
    return (
        <ToggleButtonGroup
            value={activeView}
            exclusive
            onChange={(changeEvent, newView) => {
                if (newView !== null) onViewChange(newView);
            }}
            size="small"
            sx={{
                bgcolor: colorStyled.surfaceContainerLowest,
                border: `1px solid ${colorStyled.outlineVariant}`,
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                '.MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: 2,
                    px: 1.25,
                    py: 0.5,
                    color: theme.palette.text.secondary,
                    fontSize: 9,
                    fontWeight: 600,
                    gap: 0.5,
                    textTransform: 'none',
                    '.Mui-selected': {
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': { bgcolor: theme.palette.primary.main }
                    },
                    '&:hover': {
                        bgcolor: theme.palette.background.paper
                    }
                }
            }}
        >
            <Tooltip title="Hierarchy layout — ELK layered algorithm, predefined survey tiers" placement="bottom" arrow>
                <span>
                    <ToggleButton value={GRAPH_VIEW.hierarchy} aria-label="Hierarchy view">
                        <AccountTreeIcon sx={{ fontSize: 14 }} />
                        Hierarchy
                    </ToggleButton>
                </span>
            </Tooltip>
            <Tooltip title="Force layout — D3 force-directed graph, uploaded TTL ontology" placement="bottom" arrow>
                <span>
                    <ToggleButton value={GRAPH_VIEW.force} aria-label="Force view">
                        <BubbleChartIcon sx={{ fontSize: 14 }} />
                        Force
                    </ToggleButton>
                </span>
            </Tooltip>
        </ToggleButtonGroup>
    );
});

export default GraphViewToggle;

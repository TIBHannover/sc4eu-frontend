import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Tooltip, Typography } from '@mui/material';
import React from 'react';

export const ThemeToggle = () => {
    const { mode, systemMode, setMode } = useColorScheme();

    const resolvedMode = (mode === 'system' ? systemMode : mode) ?? 'light';

    return (
      <Tooltip title={<Typography variant='body2'>{resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</Typography>}>
        <IconButton
            onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
            aria-label={resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {resolvedMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    );
}

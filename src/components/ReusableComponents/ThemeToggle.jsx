import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Tooltip } from '@mui/material';
import React from 'react';

export const ThemeToggle = () => {
    const { mode, systemMode, setMode } = useColorScheme();

    const resolvedMode = (mode === 'system' ? systemMode : mode) ?? 'light';

    return (
      <Tooltip title={`${mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}`}>
        <IconButton onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
            {resolvedMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    );
}

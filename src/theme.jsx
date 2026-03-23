// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            lightMain: '#92bdff',
            lighter: '#F7FBFC',
            light: '#D6E6F2',
            dark: '#769FCD'
        },
        secondary: {
            main: '#dc004e',
            dark: '#536b78',
            darker: '#2f3d45',
            link: '#0000EE'
        },
        background: {
            default: '#f5f5f5'
        }
    },
    typography: {
        body2: {
            fontSize: '1rem'
        }
    },
    spacing: 8
});

export default theme;

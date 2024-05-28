// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2' // Customize primary color
        },
        secondary: {
            main: '#dc004e' // Customize secondary color
        },
        background: {
            default: '#f5f5f5' // Customize background color
        }
    },
    typography: {
        body2: {
            fontSize: '1rem'
        }
    },
    spacing: 8 // Default spacing
});

export default theme;

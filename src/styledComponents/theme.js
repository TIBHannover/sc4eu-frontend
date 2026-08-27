import materialTheme from './material-theme.json';
import makePalette from './makePalette';
import { experimental_extendTheme } from '@mui/material/styles';

const theme = experimental_extendTheme({
  colorSchemes: {
    light: { palette: makePalette(materialTheme.schemes.light, 'light') },
    dark: { palette: makePalette(materialTheme.schemes.dark, 'dark') }
  }
});

export default theme;




import { buildThemeHelpers } from '@flexypw/react-tools';

export const theme = {
  palette: {
    primary: '#2F8DFE',
    text: '#051C3F',
    textSecondary: '#858EA3',
    backgroundPrimary: '#F3F4F8',
    background: '#FFFFFF',
    elements: '#DAE0ED',
    error: '#E70F36',
    white: '#FFFFFF',
  },
  breakpoints: {
    xs: '360px',
    sm: '640px',
    md: '990px',
    lg: '1200px',
    xl: '1346px',
    xxl: '1800px',
  },
};

export type TTheme = typeof theme;

const { palette, breakpoints } = buildThemeHelpers(theme);

export { palette, breakpoints };

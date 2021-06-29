import { createMuiTheme } from '@material-ui/core/styles';
import {BreakpointOverrides} from "@material-ui/core/styles/createBreakpoints"

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: BreakpointOverrides
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: BreakpointOverrides
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    blue: Palette['primary'],
    white: Palette['primary'],
    grey: Palette['primary']
  }
  interface PaletteOptions {
    blue: PaletteOptions['primary'],
    white: PaletteOptions['primary'],
    grey: PaletteOptions['primary']
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0063c9',
    },
    secondary: {
      main: '#d81b60',
    },
    blue: {
      light: '#5a9ee0',
      main: '#235789',
      dark: '#083b6e'
    },
    white: {
      main: '#6b6b6b',
    },
    grey: {
      main: '#6b6b6b',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
    ].join(','),
    h4: {
      fontWeight: 300
    }
  },
});

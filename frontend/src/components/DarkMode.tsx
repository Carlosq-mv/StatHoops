import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const DarkMode = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            background: {
              default: '#110904', // Dark background color
              paper: '#110904', // Darker shade for paper components
            },
            text: {
              primary: '#ffffff', // Light text for dark mode
              secondary: '#b3b3b3', // Secondary light text
            },
            action: {
              active: '#ffffff', // Active elements color
            },
          }),
          ...(mode === 'light' && {
            background: {
              default: '#f2f2f2', // Light background color
              paper: '#f2f2f2', // Lighter shade for paper components
            },
            text: {
              primary: '#000000', // Dark text for light mode
              secondary: '#333333', // Secondary dark text
            },
            action: {
              active: '#000000', // Active elements color
            },
          }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'dark' ? '#110904' : '#f2f2f2',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkMode;

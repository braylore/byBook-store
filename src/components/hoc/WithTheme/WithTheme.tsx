import { createTheme, ThemeProvider } from '@mui/material';
import { useColorMode } from 'hooks/useColorMode';
import { FC, ReactElement, useMemo } from 'react';

interface IWithThemeProps {
  children: ReactElement;
}

const WithTheme: FC<IWithThemeProps> = ({ children }) => {
  const { mode } = useColorMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true
            }
          },
          MuiButton: {
            styleOverrides: {
              outlined: {
                borderRadius: '20px',
                textTransform: 'unset',
                border: '1px solid',
                '&:hover': {
                  boxShadow: 'inset 0 0 0 1px'
                },
                '&:focus': {
                  boxShadow: 'inset 0 0 0 1px'
                }
              }
            }
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '14px'
              }
            }
          }
        }
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WithTheme;

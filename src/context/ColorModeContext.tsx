import { useState, useMemo, createContext, ReactNode, FC } from 'react';

interface IColorModeContext {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const ColorModeContext = createContext<IColorModeContext>({
  // eslint-disable-next-line
  toggleColorMode: () => {},
  mode: 'light'
});

interface IColorModeContextProvider {
  children: ReactNode;
}

const ColorModeContextProvider: FC<IColorModeContextProvider> = ({ children }) => {
  let localStorageMode: 'light' | 'dark' | '' = '';
  if (localStorage.getItem('mode')) {
    localStorageMode = localStorage.getItem('mode') as 'light' | 'dark';
  }
  const [mode, setMode] = useState<'light' | 'dark'>(localStorageMode || 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
      },
      mode
    }),
    [mode]
  );

  return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
};

export default ColorModeContextProvider;

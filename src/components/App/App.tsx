import AppRouter from 'components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { store, persistor } from 'store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'constants/firebase';
import WithTheme from 'components/hoc/WithTheme/WithTheme';
import ColorModeContextProvider from 'context/ColorModeContext';
import { PersistGate } from 'redux-persist/integration/react';

initializeApp(firebaseConfig);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <ColorModeContextProvider>
            <WithTheme>
              <CssBaseline>
                <AppRouter />
              </CssBaseline>
            </WithTheme>
          </ColorModeContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

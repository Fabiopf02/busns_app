import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import './hooks/Notification';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import light from './styles/themes/light';
import { onRefresh } from './utils/getToken';

const App: React.FC = () => {
  useEffect(() => {
    return onRefresh();
  }, []);

  return (
    <ThemeProvider theme={light}>
      <StatusBar backgroundColor="#33aa88" barStyle="light-content" />
      <Routes />
    </ThemeProvider>
  );
};

export default App;

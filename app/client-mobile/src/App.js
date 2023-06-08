import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../src/routers/index';
import StatusIndicator from './utility/statusIndicator';
import DeviceDetector from './utility/deviceDetector';
import AuthContextProvider from './context/authContext';

const App = () => {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <StatusIndicator />
        <DeviceDetector />
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

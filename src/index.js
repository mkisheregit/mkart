import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProviderContextData from './Contexts/ContextData';
import LoggedInContextProvider from './Contexts/LogInContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoggedInContextProvider>
    <ProviderContextData>
      <App />
    </ProviderContextData>
  </LoggedInContextProvider>
);

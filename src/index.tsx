import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ModelConfigsPage from './components/ModelConfigsPage';
import GlobalStyles from './global-styles';
import GatewaysPage from './components/GatewaysPage';
import HostsPage from './components/HostsPage';
import RegionsPage from './components/RegionsPage';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage /> 
  },
  {
    path: '/configs',
    element: <ModelConfigsPage />
  },
  {
    path: '/gateways',
    element: <GatewaysPage />
  },
  {
    path: '/hosts',
    element: <HostsPage />
  },
  {
    path: '/regions',
    element: <RegionsPage />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <GlobalStyles />
  </React.StrictMode>
);

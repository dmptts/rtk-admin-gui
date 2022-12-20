import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import GatewaysPage from './components/GatewaysPage';
import HostsPage from './components/HostsPage';
import MainPage from './components/MainPage';
import ModelConfigsPage from './components/ModelConfigsPage';
import RegionsPage from './components/RegionsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
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


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

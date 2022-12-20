import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';
import DataTablePage from './components/DataTablePage';
import { addModelConfig, deleteModelConfig, fetchModelConfigs, patchModelConfig } from './api/modelConfigs';
import { selectors as modelConfigSelectors } from './store/modelConfigsSlice';
import { Gateway, Host, ModelConfig, Region } from './const';
import { addGateway, deleteGateway, fetchGateways, patchGateway } from './api/gateways';
import { selectors as gatewaySelectors } from './store/gatewaysSlice';
import { addHost, deleteHost, fetchHosts, patchHost } from './api/hosts';
import { selectors as hostSelectors } from './store/hostsSlice';
import { addRegion, deleteRegion, fetchRegions, patchRegion } from './api/regions';
import { selectors as regionSelectors } from './store/regionsSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage /> 
  },
  {
    path: '/configs',
    element: <DataTablePage
      <ModelConfig>
      fetchAction={fetchModelConfigs}
      addAction={addModelConfig}
      patchAction={patchModelConfig}
      deleteAction={deleteModelConfig}
      selectors={modelConfigSelectors}
      slice='models'
    />,
  },
  {
    path: '/gateways',
    element: <DataTablePage
      <Gateway>
      fetchAction={fetchGateways}
      addAction={addGateway}
      patchAction={patchGateway}
      deleteAction={deleteGateway}
      selectors={gatewaySelectors}
      slice='gateways'
    />,
  },
  {
    path: '/hosts',
    element: <DataTablePage
      <Host>
      fetchAction={fetchHosts}
      addAction={addHost}
      patchAction={patchHost}
      deleteAction={deleteHost}
      selectors={hostSelectors}
      slice='hosts'
    />,
  },
  {
    path: '/regions',
    element: <DataTablePage
      <Region>
      fetchAction={fetchRegions}
      addAction={addRegion}
      patchAction={patchRegion}
      deleteAction={deleteRegion}
      selectors={regionSelectors}
      slice='regions'
    />,
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

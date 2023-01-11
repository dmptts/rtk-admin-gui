import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';
import DataTablePage from './components/DataTablePage';
import {
  addModelConfig,
  deleteModelConfig,
  fetchModelConfigs,
  patchModelConfig,
} from './api/modelConfigs';
import { selectors as modelConfigSelectors } from './store/modelConfigsSlice';
import { IGateway, IHost, IModelConfig, IRegion } from './const';
import {
  addGateway,
  deleteGateway,
  fetchGateways,
  patchGateway,
} from './api/gateways';
import { selectors as gatewaySelectors } from './store/gatewaysSlice';
import { addHost, deleteHost, fetchHosts, patchHost } from './api/hosts';
import { selectors as hostSelectors } from './store/hostsSlice';
import {
  addRegion,
  deleteRegion,
  fetchRegions,
  patchRegion,
} from './api/regions';
import { selectors as regionSelectors } from './store/regionsSlice';
import {
  gatewayValidationSchema,
  hostValidationSchema,
  modelConfigValidationSchema,
  regionValidationSchema,
} from './utils';

const router = createHashRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/configs',
    element: (
      <DataTablePage<IModelConfig>
        fetchAction={fetchModelConfigs}
        addAction={addModelConfig}
        patchAction={patchModelConfig}
        deleteAction={deleteModelConfig}
        selectors={modelConfigSelectors}
        slice="models"
        validationSchema={modelConfigValidationSchema}
      />
    ),
  },
  {
    path: '/gateways',
    element: (
      <DataTablePage<IGateway>
        fetchAction={fetchGateways}
        addAction={addGateway}
        patchAction={patchGateway}
        deleteAction={deleteGateway}
        selectors={gatewaySelectors}
        slice="gateways"
        validationSchema={gatewayValidationSchema}
      />
    ),
  },
  {
    path: '/hosts',
    element: (
      <DataTablePage<IHost>
        fetchAction={fetchHosts}
        addAction={addHost}
        patchAction={patchHost}
        deleteAction={deleteHost}
        selectors={hostSelectors}
        slice="hosts"
        validationSchema={hostValidationSchema}
      />
    ),
  },
  {
    path: '/regions',
    element: (
      <DataTablePage<IRegion>
        fetchAction={fetchRegions}
        addAction={addRegion}
        patchAction={patchRegion}
        deleteAction={deleteRegion}
        selectors={regionSelectors}
        slice="regions"
        validationSchema={regionValidationSchema}
      />
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

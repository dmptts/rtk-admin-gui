import { useEffect } from 'react';
import { addGateway, deleteGateway, fetchGateways, patchGateway } from '../api/gateways';
import { Gateway, GatewayPostData, } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/gatewaysSlice';
import AddDataForm from './AddDataForm';
import Container from './Container';
import DataTable from './DataTable';
import PageHeader from './PageHeader';

export default function ModelConfigsPage () {
  const dispatch = useAppDispatch();
  const gateways = useAppSelector(selectors.selectAll);
  const error = useAppSelector((state) => state.regions.error);

  const getGatewaysKeys = () => {
    return Object.keys(gateways[0]).filter((key) => key !== 'id');
  };

  useEffect(() => {
    dispatch(fetchGateways());
  }, [dispatch])

  return (
    <>
      <PageHeader />
      <Container>
        {
          gateways && gateways.length > 0 && <AddDataForm<GatewayPostData>
            fields={getGatewaysKeys() as Array<keyof GatewayPostData>}
            addEntity={addGateway}
          />
        }
        {
          gateways && <DataTable<Gateway>
            data={gateways}
            patchEntity={patchGateway}
            deleteEntity={deleteGateway}
            error={error}
          />
        }
      </Container>
    </>
  );
};
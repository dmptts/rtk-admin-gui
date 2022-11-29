import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchGateways } from '../api/gateways';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../store/gatewaysSlice';
import Gateway from './Gateway';

function GatewaysTable () {
  const dispatch = useAppDispatch();
  const gateways = useAppSelector(selectors.selectAll);
  const { error } = useAppSelector((state) => state.gateways);

  useEffect(() => {
    dispatch(fetchGateways())
  }, [dispatch]);

  return (
    <>
      {error && <h1>{error}</h1>}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>IP</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th>Тип</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map((gateway) => <Gateway key={gateway.id} gateway={gateway} />)}
        </tbody>
      </Table>
    </>
  )
};

export default GatewaysTable;
import { useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchGateways, selectors } from '../store/gatewaysSlice';
import Gateway from './Gateway';

function GatewaysTable () {
  const dispatch = useAppDispatch();
  const gateways = useAppSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(fetchGateways())
  }, [dispatch]);

  return (
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
  )
};

export default GatewaysTable;
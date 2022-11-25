import { gatewaysData } from '../mocks/gateways';
import EditableCell from './EditableCell';

interface GatewayProps {
  gateway: typeof gatewaysData[number],
}

function Gateway ({ gateway }: GatewayProps) {
  const { id, ip, login, password, type } = gateway;

  return (
    <tr>
      <td>{id}</td>
      <td>
        <EditableCell data={ip} />
      </td>
      <td>
        <EditableCell data={login} />
      </td>
      <td>
        <EditableCell data={password} />
      </td>
      <td>{type}</td>
    </tr>
  )
}

export default Gateway;
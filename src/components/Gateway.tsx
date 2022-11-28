import { Gateway as GatewayInterface } from '../const';
import EditableCell from './EditableCell';

interface GatewayProps {
  gateway: GatewayInterface,
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
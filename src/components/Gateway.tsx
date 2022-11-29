import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Gateway as GatewayInterface } from '../const';
import { useAppDispatch } from '../hooks';
import { deleteGateway, patchGateway } from '../api/gateways';

interface GatewayProps {
  gateway: GatewayInterface,
}

function Gateway ({ gateway }: GatewayProps) {
  const dispatch = useAppDispatch();
  const [gatewayData, setGatewayData] = useState(gateway);

  const editablePropChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGatewayData({
      ...gatewayData,
      [e.target.name]: e.target.value,
    });
  };

  const editablePropBlurHandler = () => {
    dispatch(patchGateway(gatewayData));
  };

  const deleteBtnClickHandler = () => {
    dispatch(deleteGateway(gatewayData.id))
  }

  return (
    <tr>
      <td>{gatewayData.id}</td>
      <td>
        <input type="text" name="ip" value={gatewayData.ip} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="login" value={gatewayData.login} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>
        <input type="text" name="password" value={gatewayData.password} onChange={editablePropChangeHandler} onBlur={editablePropBlurHandler} />
      </td>
      <td>{gatewayData.type}</td>
      <td>
        <Button onClick={deleteBtnClickHandler}>Удалить</Button>
      </td>
    </tr>
  )
}

export default Gateway;
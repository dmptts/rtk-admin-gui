import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls } from '../const';
import { Gateway as GatewayInterface } from '../const';

export const fetchGateways = createAsyncThunk<GatewayInterface[], undefined, { rejectValue: string }>(
  'gateways/fetchGateways',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.gateways()}`)

    if (!response.ok) {
      return rejectWithValue('Can\'t fetch gateways!')
    }

    return (await response.json());
  }
);

export const patchGateway = createAsyncThunk(
  'gateways/patchGateway',
  async (gateway: GatewayInterface, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.gateway(gateway.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ip: gateway.ip,
        login: gateway.login,
        password: gateway.password,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit gateway!');
    }

    return (await response.json());
  }
)

export const deleteGateway = createAsyncThunk(
  'gateways/deleteGateway',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.gateway(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t delete gateway');
    }
    
    return id;
  }
);
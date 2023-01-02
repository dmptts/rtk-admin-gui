import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, Gateway, GatewayPostData } from '../const';
import { IPatchData } from '../utils';

export const fetchGateways = createAsyncThunk(
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
  async (
    data: IPatchData<Gateway>,
    { rejectWithValue }
  ) => {
    const response = await fetch(`${ApiUrls.gateway(data.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data.payload),
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

export const addGateway = createAsyncThunk(
  'gateways/addgateways',
  async (data: GatewayPostData, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.gateways()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add gateway!');
    };
    
    return (await response.json());
  }
);
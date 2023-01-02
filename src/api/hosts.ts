import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, Host, HostPostData } from '../const';
import { IPatchData } from '../utils';

export const fetchHosts = createAsyncThunk(
  'hosts/fetchHosts',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.hosts()}`);
    
    if (!response.ok) {
      return rejectWithValue('Can\'t fetch hosts!');
    }

    return (await response.json());
  }
);

export const patchHost = createAsyncThunk(
  'hosts/patchHost',
  async (
    data: IPatchData<Host>,
    { rejectWithValue }
  ) => {
    const response = await fetch(`${ApiUrls.host(data.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data.payload),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit host!');
    };

    return (await response.json());
  }
);

export const deleteHost = createAsyncThunk(
  'hosts/deleteHost',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.host(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t delete host!');
    };

    return id;
  }
);

export const addHost = createAsyncThunk(
  'hosts/addHost',
  async (data: HostPostData, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.hosts()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add host!');
    };
    
    return (await response.json());
  }
);
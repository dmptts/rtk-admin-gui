import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, ModelConfig, ModelConfigPostData } from '../const';
import { IPatchData } from '../utils';

export const fetchModelConfigs = createAsyncThunk<ModelConfig[]>(
  'models/fetchModelConfigs',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.modelConfigs()}`);
    
    if (!response.ok) {
      return rejectWithValue('Can\'t fetch models!');
    }

    return (await response.json());
  }
);

export const patchModelConfig = createAsyncThunk(
  'models/patchModelConfig',
  async (
    data: IPatchData<ModelConfig>,
    { rejectWithValue }
  ) => {
    const response = await fetch(`${ApiUrls.modelConfig(data.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data.payload),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit model!');
    };

    return (await response.json());
  }
);

export const deleteModelConfig = createAsyncThunk(
  'models/deleteModelConfig',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.modelConfig(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t delete model!');
    };

    return id;
  }
);

export const addModelConfig = createAsyncThunk(
  'models/addModelConfig',
  async (data: ModelConfigPostData, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.modelConfigs()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t add model!');
    };
    
    return (await response.json());
  }
);
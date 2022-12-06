import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, ModelConfig } from '../const';

export const fetchModelConfigs = createAsyncThunk<ModelConfig[]>(
  'models/fetchModels',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.models()}`);
    
    if (!response.ok) {
      return rejectWithValue('Can\'t fetch models!');
    }

    return (await response.json());
  }
);

export const patchModelConfig = createAsyncThunk(
  'models/patchModel',
  async (model: ModelConfig, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.model(model.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        model: model.model,
        region: model.region,
        configuration: model.configuration,
        login: model.login,
        password: model.password,
        super_password: model.super_password,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit model!');
    };

    return (await response.json());
  }
);

export const deleteModelConfig = createAsyncThunk(
  'models/deleteModel',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.model(id)}`, {
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
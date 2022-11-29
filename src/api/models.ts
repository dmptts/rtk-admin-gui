import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, Model } from '../const';

export const fetchModels = createAsyncThunk<Model[]>(
  'models/fetchModels',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.models()}`);
    
    if (!response.ok) {
      return rejectWithValue('Can\'t fetch models!');
    }

    return (await response.json());
  }
);

export const patchModel = createAsyncThunk(
  'models/patchModel',
  async (model: Model, { rejectWithValue }) => {
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

export const deleteModel = createAsyncThunk(
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
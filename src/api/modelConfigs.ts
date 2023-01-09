import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, IModelConfig, ModelConfigPostData } from '../const';
import { IPatchData } from '../utils';

export const fetchModelConfigs = createAsyncThunk(
  'modelConfigs/fetchModelConfigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrls.modelConfigs()}`);
      
      if (!response.ok) {
        return rejectWithValue('Не удалось загрузить список конфигураций!');
      }
  
      return (await response.json());
    } catch {
      return rejectWithValue('Не удалось загрузить список конфигураций!');
    }
  }
);

export const patchModelConfig = createAsyncThunk(
  'modelConfigs/patchModelConfig',
  async (
    data: IPatchData<IModelConfig>,
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
      return rejectWithValue('Не удалось обновить конфигурацию!');
    };

    return (await response.json());
  }
);

export const deleteModelConfig = createAsyncThunk(
  'modelConfigs/deleteModelConfig',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.modelConfig(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось удалить конфигурацию!');
    };

    return id;
  }
);

export const addModelConfig = createAsyncThunk(
  'modelConfigs/addModelConfig',
  async (data: ModelConfigPostData, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.modelConfigs()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось добавить конфигурацию!');
    };
    
    return (await response.json());
  }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, IRegion, RegionPostData } from '../const';
import { IPatchData } from '../utils';

export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrls.regions()}`);
      
      if (!response.ok) {
        return rejectWithValue('Не удалось загрузить список регионов!');
      }
  
      return (await response.json());
    } catch {
      return rejectWithValue('Не удалось загрузить список регионов!');
    }
  }
);

export const patchRegion = createAsyncThunk(
  'regions/patchRegion',
  async (
    data: IPatchData<IRegion>,
    { rejectWithValue }
  ) => {
    const response = await fetch(`${ApiUrls.region(data.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data.payload),
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось обновить регион!');
    };

    return (await response.json());
  }
);

export const deleteRegion = createAsyncThunk(
  'regions/deleteRegion',
  async (id: number, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.region(id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось удалить регион!');
    };

    return id;
  }
);

export const addRegion = createAsyncThunk(
  'regions/addRegion',
  async (data: RegionPostData, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.regions()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось добавить регион!');
    };

    return (await response.json());
  }
);
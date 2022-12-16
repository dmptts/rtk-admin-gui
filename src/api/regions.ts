import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiUrls, Region, RegionPostData } from '../const';

export const fetchRegions = createAsyncThunk<Region[]>(
  'regions/fetchRegions',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.regions()}`);
    
    if (!response.ok) {
      return rejectWithValue('Can\'t fetch regions!');
    }

    return (await response.json());
  }
);

export const patchRegion = createAsyncThunk(
  'regions/patchRegion',
  async (region: Region, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.region(region.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        name: region.name,
        description: region.description,
        gateway_id: region.gateway_id
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit region!');
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
      return rejectWithValue('Can\'t delete region!');
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
      return rejectWithValue('Can\'t add region!');
    };
    
    const parsed = await response.json();
    // return (await response.json());
    console.log(parsed);
    return parsed;
  }
);
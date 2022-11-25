import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ApiUrls } from '../const';
import { gatewaysData } from '../mocks/gateways';
import { RootState } from './store';

const gatewaysAdapter = createEntityAdapter<typeof gatewaysData[number]>();

export const fetchGateways = createAsyncThunk<typeof gatewaysData>(
  'gateways/fetchGateways',
  async () => {
    const response = await fetch(`${ApiUrls.gateways}`)
      .then((response) => response.json());
    return response;
  }
)

const gatewaysSlice = createSlice({
  name: 'gateways',
  initialState: gatewaysAdapter.getInitialState({
    loading: 'idle'
  }),
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchGateways.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGateways.fulfilled, (state, action) => {
        gatewaysAdapter.addMany(state, action.payload)
      })
  },
});

export default gatewaysSlice.reducer;
export const selectors = gatewaysAdapter.getSelectors((state: RootState) => state.gateways);
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiUrls, Gateway as GatewayInterface } from '../const';
import { RootState } from './store';

const gatewaysAdapter = createEntityAdapter<GatewayInterface>();

export const fetchGateways = createAsyncThunk<GatewayInterface[], undefined, { rejectValue: string }>(
  'gateways/fetchGateways',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.fetchGateways()}`)

    if (!response.ok) {
      return rejectWithValue('Can\'t fetch gateways!')
    }

    return (await response.json());
  }
);

interface ExtendedEntityAdapterState {
  loading: 'idle' | 'pending' | 'success' | 'error',
  error: null | string,
}

const initialState: ExtendedEntityAdapterState = {
  loading: 'idle',
  error: null,
}

const gatewaysSlice = createSlice({
  name: 'gateways',
  initialState: gatewaysAdapter.getInitialState(initialState),
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchGateways.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchGateways.fulfilled, (state, action) => {
        gatewaysAdapter.addMany(state, action.payload);
        state.loading = 'success';
      })
      .addCase(fetchGateways.rejected, (state, action) => {
        state.loading = 'error';
        state.error = action.payload as string;
      })
  },
});

export default gatewaysSlice.reducer;
export const selectors = gatewaysAdapter.getSelectors((state: RootState) => state.gateways);
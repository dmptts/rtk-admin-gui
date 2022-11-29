import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
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

export const patchGateway = createAsyncThunk(
  'gateways/patchGateway',
  async (gateway: GatewayInterface, { rejectWithValue }) => {
    const response = await fetch(`${ApiUrls.patchGateway(gateway.id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ip: gateway.ip,
        login: gateway.login,
        password: gateway.password,
      }),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t edit gateway!');
    }

    return (await response.json());
  }
)

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
      .addCase(patchGateway.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(patchGateway.fulfilled, (state, action) => {
        gatewaysAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            ip: action.payload.ip,
            login: action.payload.login,
            password: action.payload.password,
          }
        });
        state.loading = 'success';
      })
      .addCase(patchGateway.rejected, (state, action) => {
        state.loading = 'error';
        state.error = action.payload as string;
      })
  },
});

export default gatewaysSlice.reducer;
export const selectors = gatewaysAdapter.getSelectors((state: RootState) => state.gateways);
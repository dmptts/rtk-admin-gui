import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { deleteGateway, fetchGateways, patchGateway } from '../api/gateways';
import { Gateway as GatewayInterface } from '../const';
import { RootState } from './store';

const gatewaysAdapter = createEntityAdapter<GatewayInterface>();

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
  reducers: {},
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
      .addCase(deleteGateway.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteGateway.fulfilled, (state, action) => {
        gatewaysAdapter.removeOne(state, action.payload);
        state.loading = 'success';
      })
      .addCase(deleteGateway.rejected, (state, action) => {
        state.loading = 'error';
        state.error = action.payload as string;
      })
  },
});

export default gatewaysSlice.reducer;
export const selectors = gatewaysAdapter.getSelectors((state: RootState) => state.gateways);
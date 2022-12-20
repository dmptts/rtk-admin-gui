import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteGateway, fetchGateways, patchGateway } from '../api/gateways';
import { Gateway as GatewayInterface } from '../const';
import { RootState } from './store';

const gatewaysAdapter = createEntityAdapter<GatewayInterface>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
}

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
}

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const gatewaysSlice = createSlice({
  name: 'gateways',
  initialState: gatewaysAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGateways.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGateways.fulfilled, (state, action) => {
        gatewaysAdapter.addMany(state, action.payload);
        state.loading = false;
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
        state.loading = false;
      })
      .addCase(deleteGateway.fulfilled, (state, action) => {
        gatewaysAdapter.removeOne(state, action.payload);
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.error = null
      })
  },
});

export default gatewaysSlice.reducer;
export const selectors = gatewaysAdapter.getSelectors((state: RootState) => state.gateways);
import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { addHost, deleteHost, fetchHosts, patchHost } from '../api/hosts';
import { Host } from '../const';

const hostsAdapter = createEntityAdapter<Host>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
};

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
};

const isError = (action: AnyAction) => {
  return action.type.includes('hosts') && action.type.endsWith('rejected');
};

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const hostsSlice = createSlice({
  name: 'hosts',
  initialState: hostsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHosts.fulfilled, (state, action) => {
        hostsAdapter.addMany(state, action.payload);
        state.loading = false;
      })
      .addCase(patchHost.fulfilled, (state, action) => {
        hostsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            ip: action.payload.ip,
            title: action.payload.title,
            host: action.payload.host,
            region: action.payload.region,
            model: action.payload.model,
            type: action.payload.type,
            name: action.payload.name,
            configuration: action.payload.configuration,
            login: action.payload.login,
            password: action.payload.password,
            super_password: action.payload.super_password,
            status: action.payload.status,
          }
        });
      })
      .addCase(deleteHost.fulfilled, (state, action) => {
        hostsAdapter.removeOne(state, action.payload);
      })
      .addCase(addHost.fulfilled, (state, action) => {
        hostsAdapter.addOne(state, action.payload);
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

export default hostsSlice.reducer;
export const selectors = hostsAdapter.getSelectors((state: RootState) => state.hosts);
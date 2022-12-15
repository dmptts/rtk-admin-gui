import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addModelConfig, deleteModelConfig, fetchModelConfigs, patchModelConfig } from '../api/modelConfigs';
import { ModelConfig } from '../const';
import { RootState } from './store';

const modelConfigsAdapter = createEntityAdapter<ModelConfig>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
};

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
};

const configsSlice = createSlice({
  name: 'models',
  initialState: modelConfigsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModelConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelConfigs.fulfilled, (state, action) => {
        modelConfigsAdapter.addMany(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchModelConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchModelConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchModelConfig.fulfilled, (state, action) => {
        modelConfigsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            model: action.payload.model,
            region: action.payload.region,
            configuration: action.payload.configuration,
            login: action.payload.login,
            password: action.payload.password,
            super_password: action.payload.super_password,
          }
        });
        state.loading = false;
      })
      .addCase(patchModelConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteModelConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteModelConfig.fulfilled, (state, action) => {
        modelConfigsAdapter.removeOne(state, action.payload);
        state.loading = false;
      })
      .addCase(deleteModelConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addModelConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addModelConfig.fulfilled, (state, action) => {
        modelConfigsAdapter.addOne(state, action.payload);
        state.loading = false;
      })
      .addCase(addModelConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default configsSlice.reducer;
export const selectors = modelConfigsAdapter.getSelectors((state: RootState) => state.models);
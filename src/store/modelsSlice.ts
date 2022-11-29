import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { deleteModel, fetchModels, patchModel } from '../api/models';
import { Model } from '../const';
import { RootState } from './store';

const modelsAdapter = createEntityAdapter<Model>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
};

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
};

const modelsSlice = createSlice({
  name: 'models',
  initialState: modelsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        modelsAdapter.addMany(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchModel.fulfilled, (state, action) => {
        modelsAdapter.updateOne(state, {
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
      .addCase(patchModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteModel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteModel.fulfilled, (state, action) => {
        modelsAdapter.removeOne(state, action.payload);
        state.loading = false;
      })
      .addCase(deleteModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default modelsSlice.reducer;
export const selectors = modelsAdapter.getSelectors((state: RootState) => state.models);
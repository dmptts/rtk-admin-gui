import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addModelConfig, deleteModelConfig, fetchModelConfigs, patchModelConfig } from '../api/modelConfigs';
import { IModelConfig } from '../const';
import { RootState } from './store';

const modelConfigsAdapter = createEntityAdapter<IModelConfig>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
};

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
};

const isError = (action: AnyAction) => {
  return action.type.includes('modelConfigs') && action.type.endsWith('rejected');
};

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const configsSlice = createSlice({
  name: 'models',
  initialState: modelConfigsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModelConfigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModelConfigs.fulfilled, (state, action) => {
        modelConfigsAdapter.addMany(state, action.payload);
        state.loading = false;
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
      })
      .addCase(deleteModelConfig.fulfilled, (state, action) => {
        modelConfigsAdapter.removeOne(state, action.payload);
      })
      .addCase(addModelConfig.fulfilled, (state, action) => {
        modelConfigsAdapter.addOne(state, action.payload);
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

export default configsSlice.reducer;
export const selectors = modelConfigsAdapter.getSelectors((state: RootState) => state.models);
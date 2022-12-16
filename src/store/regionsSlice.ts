import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addRegion, deleteRegion, fetchRegions, patchRegion } from '../api/regions';
import { Region } from '../const';
import { RootState } from './store';

const regionsAdapter = createEntityAdapter<Region>();

interface ExtendedEntityAdapterState {
  loading: boolean,
  error: null | string,
};

const initialState: ExtendedEntityAdapterState = {
  loading: false,
  error: null,
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState: regionsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegions.fulfilled, (state, action) => {
        regionsAdapter.addMany(state, action.payload);
        state.loading = false;
      })
      .addCase(patchRegion.fulfilled, (state, action) => {
        regionsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            name: action.payload.name,
            description: action.payload.description,
            gateway_id: action.payload.gateway_id,
          }
        });
        state.loading = false;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        regionsAdapter.removeOne(state, action.payload);
        state.loading = false;
      })
      .addCase(addRegion.fulfilled, (state, action) => {
        regionsAdapter.addOne(state, action.payload);
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.error = null
      })
  },
});

export default regionsSlice.reducer;
export const selectors = regionsAdapter.getSelectors((state: RootState) => state.regions);
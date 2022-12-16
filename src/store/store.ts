import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';
import modelConfigsReducer from './modelConfigsSlice';
import regionsReducer from './regionsSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
    models: modelConfigsReducer,
    regions: regionsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
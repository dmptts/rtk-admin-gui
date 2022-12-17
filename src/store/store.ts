import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';
import modelConfigsReducer from './modelConfigsSlice';
import regionsReducer from './regionsSlice';
import hostsReducer from './hostsSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
    models: modelConfigsReducer,
    regions: regionsReducer,
    hosts: hostsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
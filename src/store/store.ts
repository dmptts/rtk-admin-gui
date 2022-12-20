import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';
import modelConfigsReducer from './modelConfigsSlice';
import regionsReducer from './regionsSlice';
import hostsReducer from './hostsSlice';
import alertsReducer from './alertsSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
    models: modelConfigsReducer,
    regions: regionsReducer,
    hosts: hostsReducer,
    alerts: alertsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';
import modelConfigsReducer from './modelConfigsSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
    models: modelConfigsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
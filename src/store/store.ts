import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
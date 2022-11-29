import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from './gatewaysSlice';
import modelsReducer from './modelsSlice';

const store = configureStore({
  reducer: {
    gateways: gatewayReducer,
    models: modelsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
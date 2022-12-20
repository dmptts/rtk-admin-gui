import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IAlert } from '../const';

interface IAlertState {
  alerts: IAlert[],
};

const initialState: IAlertState = {
  alerts: [],
};

const isPatchFullfiled = (action: AnyAction) => {
  return action.type.includes('patch') && action.type.endsWith('fulfilled');
};

const isPatchRejected = (action: AnyAction) => {
  return action.type.includes('patch') && action.type.endsWith('rejected');
};

const isAddFulfilled = (action: AnyAction) => {
  return action.type.includes('add') && action.type.endsWith('fulfilled');
};

const isAddRejected = (action: AnyAction) => {
  return action.type.includes('add') && action.type.endsWith('rejected');
};

const isDeleteFulfilled = (action: AnyAction) => {
  return action.type.includes('delete') && action.type.endsWith('fulfilled');
};

const isDeleteRejected = (action: AnyAction) => {
  return action.type.includes('delete') && action.type.endsWith('rejected');
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState: initialState,
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type
      });
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPatchFullfiled, (state) => {
        state.alerts.push({
          message: 'Запись успешно обновлена',
          type: 'success'
        });
      })
      .addMatcher(isPatchRejected, (state, action) => {
        state.alerts.push({
          message: `При обновлении записи произошла ошибка: ${action.payload.error}`,
          type: 'error'
        });
      })
      .addMatcher(isAddFulfilled, (state) => {
        state.alerts.push({
          message: 'Запись успешно добавлена',
          type: 'success'
        });
      })
      .addMatcher(isAddRejected, (state, action) => {
        state.alerts.push({
          message: `При добавлении записи произошла ошибка: ${action.payload.error}`,
          type: 'error'
        })
      })
      .addMatcher(isDeleteFulfilled, (state) => {
        state.alerts.push({
          message: 'Запись успешно удалена',
          type: 'success'
        });
      })
      .addMatcher(isDeleteRejected, (state, action) => {
        state.alerts.push({
          message: `При удалении записи произошла ошибка: ${action.payload.error}`,
          type: 'error'
        });
      })
  },
});

export default alertSlice.reducer;
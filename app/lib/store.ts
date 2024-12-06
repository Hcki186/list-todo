import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './slices/todoSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      todo: todoReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
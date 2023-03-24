import { configureStore } from '@reduxjs/toolkit';

import shopSlice from './shopSlice';
export const store = configureStore({
  reducer: {
    shop: shopSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

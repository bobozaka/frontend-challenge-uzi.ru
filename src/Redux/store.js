import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './Silce/catsSlice';

export const store = configureStore({
  reducer: catsReducer,
});

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/authSlice';
import countriesReducer from '../redux/slice/countrySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
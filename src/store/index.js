import {configureStore} from '@reduxjs/toolkit';
import UserSlice from './user';

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

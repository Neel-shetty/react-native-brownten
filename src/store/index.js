import {configureStore} from '@reduxjs/toolkit';
import UserSlice from './user';
import UiTrigger from './uiTrigger';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    uiTrigger: UiTrigger,
  },
});

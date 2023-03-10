import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface initalStateType {
  loggedIn: boolean;
}
const initialState: initalStateType = {
  loggedIn: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoggedIn} = UserSlice.actions;

export default UserSlice.reducer;

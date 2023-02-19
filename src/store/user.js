import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: true,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoggedIn} = UserSlice.actions;

export default UserSlice.reducer;

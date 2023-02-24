import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bottomSheetShown: {shown: false, variants: []},
};

export const UiTrigger = createSlice({
  name: 'uiTrigger',
  initialState,
  reducers: {
    setBottomSheetShown: (state, action) => {
      state.bottomSheetShown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setBottomSheetShown} = UiTrigger.actions;

export default UiTrigger.reducer;

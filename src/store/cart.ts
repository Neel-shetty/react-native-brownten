import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {variantType} from '../screens/tabs/Home';

export interface cartItemType {
  image: string;
  name: string;
  variant: variantType;
  quantity: number;
  id: number;
}

interface initalStateType {
  cartItems: cartItemType[];
}
const initialState: initalStateType = {
  cartItems: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      const itemInCart = state.cartItems.find(
        item => item.id === action.payload.id,
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({...action.payload, quantity: 1});
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (!item) {
        return;
      }
      if (item.quantity === 1) {
        const removeItem = state.cartItems.filter(
          item => item.id !== action.payload,
        );
        state.cartItems = removeItem;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        item => item.id !== action.payload,
      );
      state.cartItems = removeItem;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, decrementQuantity, incrementQuantity, removeItem} =
  CartSlice.actions;

export default CartSlice.reducer;

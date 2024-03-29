import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {variantType} from '../screens/tabs/Home';

export interface cartItemType {
  image: string;
  name: string;
  variant: {item: variantType; quantity: number};
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
        item =>
          item.variant.item.variant_id ===
          action.payload.variant.item.variant_id,
      );
      if (itemInCart) {
        itemInCart.variant.quantity++;
      } else {
        state.cartItems.push({...action.payload});
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        item => item.variant.item.variant_id === action.payload.vId,
      );
      if (item?.variant.quantity) {
        item.variant.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      // const item = state.cartItems.find(item => item.id === action.payload);
      // if (!item) {
      //   return;
      // }
      // if (item.variant.quantity === 1) {
      //   state.cartItems = [];
      // } else {
      //   item.variant.quantity--;
      // }
      const item = state.cartItems.find(
        item => item.variant.item.variant_id === action.payload.vId,
      );
      if (item?.variant.quantity) {
        if (item?.variant.quantity === 1) {
          const removeItem = state.cartItems.filter(
            item => item.variant.item.variant_id !== action.payload.vId,
          );
          state.cartItems = removeItem;
        }
        item.variant.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        item => item.variant.item.variant_id !== action.payload.vId,
      );
      console.log('🚀 ~ file: cart.ts:69 ~ removeItem:', removeItem);
      state.cartItems = removeItem;
    },
    emptyCart: state => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  emptyCart,
} = CartSlice.actions;

export default CartSlice.reducer;

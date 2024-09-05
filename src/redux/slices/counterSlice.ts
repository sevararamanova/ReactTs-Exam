// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  cart: number;
  hearts: number;
}

const initialState: CounterState = {
  cart: 0,
  hearts: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCart: (state) => {
      state.cart += 1;
    },
    decrementCart: (state) => {
      state.cart = Math.max(0, state.cart - 1); // Prevent negative values
    },
    incrementHeart: (state) => {
      state.hearts += 1;
    },
    decrementHeart: (state) => {
      state.hearts = Math.max(0, state.hearts - 1); // Prevent negative values
    },
  },
});

export const { incrementCart, decrementCart, incrementHeart, decrementHeart } = counterSlice.actions;
export default counterSlice.reducer;

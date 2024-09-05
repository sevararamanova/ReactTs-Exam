import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../redux/slices/counterSlice';
import cartReducer from '../../redux/slices/cartSlices';
import productsReducer from '../../redux/slices/productSlice';
import likedReducer from '../../redux/slices/likedSlice';
import currencyReducer from '../../redux/slices/currencySlice';
import searchReducer from '../../redux/slices/searchSlices';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer, 
    products: productsReducer,
    liked: likedReducer, 
    currency: currencyReducer,
    search: searchReducer,
 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

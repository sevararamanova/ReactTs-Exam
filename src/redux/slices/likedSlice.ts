// likedSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedState {
  likedItems: Set<number>;
}

const initialState: LikedState = {
  likedItems: new Set(),
};

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      if (state.likedItems.has(action.payload)) {
        state.likedItems.delete(action.payload);
      } else {
        state.likedItems.add(action.payload);
      }
    },
  },
});

export const { toggleLike } = likedSlice.actions;
export default likedSlice.reducer;
``
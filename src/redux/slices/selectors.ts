// selectors.ts
import { createSelector } from 'reselect';
import { RootState } from '../store/index';

const selectLikedItems = (state: RootState) => state.liked.likedItems;

export const makeSelectIsProductLiked = (productId: number) =>
    createSelector(
        [selectLikedItems],
        (likedItems) => likedItems.has(productId)
    );
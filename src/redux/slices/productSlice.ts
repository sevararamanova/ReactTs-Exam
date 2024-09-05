

// src/redux/slices/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { Product } from '../../types/product-data'; 
interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL; 
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data as Product[];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error; 
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.error = null; // Clear error on success
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

// Basic selector
const selectProducts = (state: { products: ProductsState }) => state.products.products;

// Memoized selector using createSelector
export const selectProductById = createSelector(
    [selectProducts, (_: any, productId: number) => productId],
    (products, productId) => {
        return products ? products.find(product => product.id === productId) : undefined;
    }
);

export default productsSlice.reducer;

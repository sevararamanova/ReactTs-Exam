// src/redux/slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    query: string;
  brand?: string;
  productType?: string;
  results: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchState = {
    query: '',
    results: [],
    status: 'idle',
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setResults(state, action: PayloadAction<any[]>) {
            state.results = action.payload;
        },
        setStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setQuery, setResults, setStatus, setError } = searchSlice.actions;
export default searchSlice.reducer;

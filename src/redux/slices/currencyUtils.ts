import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
    currentCurrency: string;
}

const initialState: CurrencyState = {
    currentCurrency: 'USD', 
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currentCurrency = action.payload;
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;

interface Rates {
    [key: string]: number;
}

export const convertCurrency = (amount: number, currency: string): number => {
 
    const rates: Rates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
       
    };

    const rate = rates[currency] || rates['USD'];
    return amount * rate;
};

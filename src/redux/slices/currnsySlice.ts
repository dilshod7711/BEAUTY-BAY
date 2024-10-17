import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
    selected: string;
}

const storedCurrency = localStorage.getItem('selectedCurrency');
const initialState: CurrencyState = {
    selected: storedCurrency ? JSON.parse(storedCurrency) : 'USD',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency(state, action: PayloadAction<string>) {
            state.selected = action.payload;
            localStorage.setItem('selectedCurrency', JSON.stringify(action.payload));
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    likedProducts: number[];
}

const getLikedProductsFromLocalStorage = (): number[] => {
    try {
        const storedData = localStorage.getItem('likedProducts');
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Xato: LocalStorage-dan likedProducts-ni olishda xatolik.', error);
        return [];
    }
};

const initialState: IInitialState = {
    likedProducts: getLikedProductsFromLocalStorage(),
};

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        likeProduct: (state, action: PayloadAction<number>) => {
            if (!state.likedProducts.includes(action.payload)) {
                state.likedProducts.push(action.payload);
                localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
            }
        },
        unlikeProduct: (state, action: PayloadAction<number>) => {
            state.likedProducts = state.likedProducts.filter((id) => id !== action.payload);
            localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
        },
    },
});

export const { likeProduct, unlikeProduct } = likeSlice.actions;
export default likeSlice.reducer;

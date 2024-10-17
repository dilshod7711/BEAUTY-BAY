import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api"; 
import cartReducer from "../slices/cartSlices";
import likeReducer from "../slices/LikeSlices";
import currencyReducer from "../slices/currnsySlice"; 

const store = configureStore({
    reducer: {
        cart: cartReducer,
        like: likeReducer,
        currency: currencyReducer, 
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export { store };

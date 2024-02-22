import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slice/wordReducer";

export const store = configureStore({
    reducer: {
        word: wordReducer
    }
})
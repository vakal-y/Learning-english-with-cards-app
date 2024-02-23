import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slice/wordReducer";
import wordsLearnedSlice from "./slice/wordsLearnedSlice";

export const store = configureStore({
    reducer: {
        word: wordReducer,
        wordsLearned: wordsLearnedSlice
    }
})
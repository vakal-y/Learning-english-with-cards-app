import { createSlice } from "@reduxjs/toolkit";

//выавы
const wordsLearnedSlice = createSlice({
    name: 'wordsLearned',
    initialState: {
        count: 0,
    },
    reducers: {
        setWordsLearned: (state) => {
            state.count += 1;
        },
    },
});

export const { setWordsLearned } = wordsLearnedSlice.actions;
export default wordsLearnedSlice.reducer;
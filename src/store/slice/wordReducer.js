import { createSlice } from "@reduxjs/toolkit";

const wordSlice = createSlice({
    name: word,
    initialState: {
        english: null,
        transcription: null,
        russian: null,
        id: null
    },
    reducers: {
        setWords(state, action) {
            state.english = action.payload.english
            state.transcription = action.payload.transcription
            state.russian = action.payload.russian
            state.id = action.payload.id
        },
        removeWord(state) {
            state.english = null
            state.transcription = null
            state.russian = null
            state.id = null
        }
    }
});
export const { setWords, removeWord } = wordSlice.actions;
export default wordSlice.reducer;
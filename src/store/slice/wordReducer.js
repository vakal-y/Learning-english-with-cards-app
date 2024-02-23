import { createSlice } from "@reduxjs/toolkit";

// создаю срез (slice) с именем 'word'
const wordSlice = createSlice({
    name: 'word',
    initialState: {
        words: [], // начальное состояние - пустой массив
        activeCardIndex: 0,
    },
    reducers: {
        // установка слова в состоянии хранилища
        setWords(state, action) {
            state.words = action.payload;
        },
        // добавление слова
        addWord(state, action) {
            state.push(action.payload); // добавляю новое слово в массив состояния
        },
        // редактирование слова
        editWord(state, action) {
            const { id, updatedWord } = action.payload; // получаю id и обновленные данные из action
            const index = state.words.findIndex(word => word.id === id);
            if (index !== -1) {
                state.words[index] = updatedWord;
            }
        },
        // удаление слова
        removeWord(state, action) {
            state.words = state.words.filter(word => word.id !== action.payload); // оставляю в массиве слова, не равные id удаляемого слова
        },

        setActiveCardIndex(state, action) {
            state.activeCardIndex = action.payload;
        },
    }
});
// экспортирую action creators
export const { setWords, addWord, editWord, removeWord, setActiveCardIndex } = wordSlice.actions;
// экспортирую редюсер
export default wordSlice.reducer;
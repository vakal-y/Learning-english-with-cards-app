import Form from "../Form/Form";
import PostWord from "../PostWord/PostWord";
import { useState } from "react";
import data from '/src/data.json';
import './ListOfWords.scss'
import { useSelector, useDispatch } from 'react-redux';
import { setWords, addWord, removeWord, editWord } from '../../path-to-wordSlice';

export default function ListOfWords() {
    const dispatch = useDispatch();
    const words = useSelector(state => state.word.words); // получение данных из Redux store 

    useEffect(() => {
        // Здесь вы можете использовать ваш запрос на сервер для получения данных
        // и передать их в store с помощью action creator setWords
        // dispatch(setWords(yourDataFromServer));
    }, [dispatch]);

    // функция для удаления слова по его идентификатору
    const handleDeleteWord = (id) => {
        // 
        dispatch(removeWord(id));
    };

    const handleEditWord = (id) => {
        dispatch(editWord({ id, updatedWord }));
    };

    return (
        <div className="list__container">
            <div className='form'>
                <Form addWord={newWord => dispatch(addWord(newWord))} />
            </div>
            <div className='post__word'>
                {word.length
                    ? < PostWord words={words} onDelete={handleDeleteWord} onEdit={handleEditWord} />
                    : <p className='warning'>Список пуст</p>
                }
            </div>
        </div>
    )
}
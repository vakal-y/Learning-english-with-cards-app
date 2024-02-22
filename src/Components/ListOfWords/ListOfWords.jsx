import React, { useContext, useEffect } from 'react';
import Form from "../Form/Form";
import PostWord from "../PostWord/PostWord";
import { MyContext } from '../Context/MyContext';
import './ListOfWords.scss';

export default function ListOfWords() {
    const { dataServer, setDataServer, updateWord } = useContext(MyContext);

    // функция для удаления слова по его идентификатору
    const handleDeleteWord = (id) => {
        setDataServer((prevData) => prevData.filter((word) => word.id !== id)); // обновление состояния, исключая удаленное слово
    };

    const handleEditWord = async (id, updatedData) => {
        try {
            await updateWord(id, updatedData);
            getWordsServer();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="list__container">
            <div className='form'>
                <Form />
            </div>
            <div className='post__word'>
                {dataServer.length
                    ? < PostWord onDelete={handleDeleteWord} onEdit={handleEditWord} />
                    : <p className='warning'>Список пуст</p>
                }
            </div>
        </div>
    )
}
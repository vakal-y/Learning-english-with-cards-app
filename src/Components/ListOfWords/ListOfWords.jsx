import React, { useContext } from 'react';
import Form from "../Form/Form";
import PostWord from "../PostWord/PostWord";
import { MyContext } from '../Context/MyContext';
import './ListOfWords.scss';

export default function ListOfWords() {
    const { dataServer, setDataServer } = useContext(MyContext);

    // функция для удаления слова по его идентификатору
    const handleDeleteWord = (id) => {
        // обновление состояния, исключая удаленное слово
        setDataServer((prevData) => prevData.filter((word) => word.id !== id));
    };

    const handleEditWord = (id, updatedData) => {
        // пустая функция, без которой почему-то не работает ничегооо
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
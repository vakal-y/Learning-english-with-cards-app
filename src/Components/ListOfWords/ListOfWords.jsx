import Form from "../Form/Form";
import PostWord from "../PostWord/PostWord";
import { useState } from "react";
import data from '/src/data.json';
import './ListOfWords.scss'
import GET from "../../GET";

export default function ListOfWords() {
    // состояние, хранящее массив слов
    const [word, setWord] = useState(data);

    // функция для удаления слова по его идентификатору
    const handleDeleteWord = (id) => {
        // обновление состояния, исключая удаленное слово
        setWord((prevWords) => prevWords.filter((word) => word.id !== id));
    };

    const handleEditWord = (id) => {
        // пустая функция, без которой почему-то не работает ничегооо
    };

    return (
        <div className="list__container">
            <div className='form'>
                <Form words={word} setWord={setWord} />
            </div>
            <div className='post__word'>
                {word.length
                    ? < PostWord words={word} onDelete={handleDeleteWord} onEdit={handleEditWord} />
                    : <p className='warning'>Список пуст</p>
                }
            </div>
        </div>
    )
}
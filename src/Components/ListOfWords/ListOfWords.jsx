import Form from "../Form/Form";
import PostWord from "../PostWord/PostWord";
import { useState } from "react";
import data from '/src/data.json';
import './ListOfWords.scss'

export default function ListOfWords() {
    const [word, setWord] = useState(data);

    const handleDeleteWord = (id) => {
        setWord((prevWords) => prevWords.filter((word) => word.id !== id));
    };

    const handleEditWord = (id) => {
        console.log("Edit word with ID:", id);
        // здесь наверное будет всплывать модальное окно которого нет
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
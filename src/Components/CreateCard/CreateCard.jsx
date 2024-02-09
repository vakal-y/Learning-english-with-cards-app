import React, { useEffect, useRef } from "react";
import './CreateCard.scss';
import CheckButton from "../CheckButton/CheckButton";

// компонент для отображения карточки слова
// принимает слово (item) и функцию для обновления количества выученных слов (setWordsLearned)
export default function CreateCard({ item, setWordsLearned }) {
    // извлечение английского слова и транскрипции из объекта слова
    const { english, transcription } = item;

    // Создание ссылки на компонент кнопки (CheckButton) для дальнейшего доступа к ней
    const buttonRef = useRef(null);

    // Обработчик для отображения перевода и обновления количества выученных слов
    const handleViewTranslation = () => {
        setWordsLearned((prevCount) => prevCount + 1);
    };

    return (
        <div className="create__card">
            <p className="english">{english}</p>
            <p className="transcription">{transcription}</p>

            <CheckButton ref={buttonRef} item={item} onViewTranslation={handleViewTranslation} />
        </div>
    )
}
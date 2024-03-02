import React, { useState } from "react";
import './CreateCard.scss';
import CheckButton from "../CheckButton/CheckButton";


// компонент для отображения карточки слова
// принимает слово (item) и функцию для обновления количества выученных слов (setWordsLearned)
export default function CreateCard({ item, onViewTranslation, setWordsLearned, wordsLearned }) {
    const handleViewTranslation = () => {
        onViewTranslation(); // вызываю функцию из родительского компонента
    };

    const { english, transcription } = item;

    return (
        <div className="create__card">
            <p className="english">{english}</p>
            <p className="transcription">{transcription}</p>

            <CheckButton item={item} onViewTranslation={handleViewTranslation} />
        </div>
    )
}
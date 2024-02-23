import React, { useEffect, useRef } from "react";
import './CreateCard.scss';
import CheckButton from "../CheckButton/CheckButton";
import { useDispatch } from "react-redux";
import { setWordsLearned } from "../../store/slice/wordsLearnedSlice";

// компонент для отображения карточки слова
// принимает слово (item) и функцию для обновления количества выученных слов (setWordsLearned)
export default function CreateCard({ item }) {
    const dispatch = useDispatch();

    const handleViewTranslation = () => {
        dispatch(setWordsLearned());
    };

    // извлечение английского слова и транскрипции из объекта слова
    const { english, transcription } = item;

    return (
        <div className="create__card">
            <p className="english">{english}</p>
            <p className="transcription">{transcription}</p>

            <CheckButton item={item} onViewTranslation={handleViewTranslation} />
        </div>
    )
}
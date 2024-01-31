import React, { useEffect, useRef } from "react";
import './CreateCard.scss';
import CheckButton from "../CheckButton/CheckButton";

export default function CreateCard({ item, setWordsLearned }) {
    const { english, transcription } = item;
    const buttonRef = useRef(null);
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
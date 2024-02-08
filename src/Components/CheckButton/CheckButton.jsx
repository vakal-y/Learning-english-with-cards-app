import React, { useState, useEffect, forwardRef } from "react";
import './CheckButton.scss';

const CheckButton = forwardRef(({ item, onViewTranslation }, ref) => {
    const [pressed, setPressed] = useState(false); // состояние отслеживания, было ли слово переведено
    const [counted, setCounted] = useState(false); // состояние отслеживания, было ли слово засчитано

    useEffect(() => {
        // сброс состояний при изменении item
        setPressed(false); // сброс состояния отображения перевода при смене слова
        setCounted(false); // сброс состояния засчитывания при смене слова
    }, [item]);

    // состояние фокусировки на кнопке
    useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }, [item, ref]);


    const handleChange = () => {
        setPressed(!pressed);
        // вызов onViewTranslation только если слово ещё не было засчитано
        if (!counted) {
            onViewTranslation(); // показываем перевод, если перевода нет
            setCounted(true); // помечаем слово как засчитанное
        }
    }

    return (
        <button
            ref={ref}
            className={`check__button ${pressed ? 'checked__button' : ''}`}
            onClick={handleChange}
        >
            <span className="button__text">{pressed ? item.russian : 'Перевод'}</span>
        </button>
    );
});

export default CheckButton;

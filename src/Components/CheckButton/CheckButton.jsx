import React, { useState, useEffect, forwardRef } from "react";
import './CheckButton.scss';

const CheckButton = forwardRef(({ item, onViewTranslation }, ref) => {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        setPressed(false);
    }, [item]);

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }, [item, ref]);

    const handleChange = () => {
        setPressed(!pressed);
        onViewTranslation();
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

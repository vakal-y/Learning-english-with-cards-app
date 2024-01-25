import React, { useState, useEffect } from "react";
import './CheckButton.scss';

export default function CheckButton(props) {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        setPressed(false);
    }, [props.item]
    );

    const handleChange = () => {
        setPressed(!pressed);
    }
    return (
        <button
            className={`check__button ${pressed ? 'checked__button' : ''}`}
            onClick={handleChange}
        >
            {pressed ? props.item.russian : 'Перевод'}
        </button>
    )
}
import React from "react";
import './CreateCard.scss';
import CheckButton from "../CheckButton/CheckButton";

export default function CreateCard(props) {
    const { english, transcription } = props.item;
    return (
        <div className="create__card">
            <p className="english">{english}</p>
            <p className="transcription">{transcription}</p>
            <CheckButton item={props.item} />
        </div>
    )
}
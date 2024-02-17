import React, { useState, useEffect } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './PostItem.scss';
import { MyContext } from '../Context/MyContext';
import { useContext } from 'react';

export default function PostItem(props) {
    const { setDataServer, DataServer } = useContext(MyContext);

    // состояние для отслеживания режима редактирования
    const [isEditing, setIsEditing] = useState(false);
    // состояние для временного хранения редактируемых данных
    const [editedWord, setEditedWord] = useState(
        {
            english: props.word.english,
            transcription: props.word.transcription,
            russian: props.word.russian
        }
    );

    // состояние для отслеживания заполненности полей
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);

    useEffect(() => {
        // Проверяем, есть ли хотя бы одно пустое поле
        const isEmpty = Object.values(editedWord).some((value) => !value);
        setIsFieldsFilled(!isEmpty);
    }, [editedWord]);

    // обработчик для удаления элемента
    const handleDelete = () => {
        props.onDelete(props.word.id);
    };

    // включение режима редактирования
    const handleEdit = () => {
        setIsEditing(true)
    };

    // сохранение изменений и выход из режима редактирования
    const handleSave = () => {
        if (isFieldsFilled) { // если поля заполнены
            props.onEdit(props.word.id, editedWord);
            setIsEditing(false);
            console.log(editedWord);
        } else {
            // если поля не заполнены
            console.log('Необходимо заполнить все поля');
        }
    };

    // отмена изменений и выход из режима редактирования
    const handleCancel = () => {
        // восстановление исходных данных
        setEditedWord({
            english: props.word.english,
            transcription: props.word.transcription,
            russian: props.word.russian
        });
        setIsEditing(false);
    }

    // обновление временного состояния при изменении данных в инпутах
    const handleChange = (field, value) => {
        setEditedWord(prev => ({ ...prev, [field]: value }));
    }

    return (
        <div className='post__item' ref={props.nodeRef}>
            {isEditing ? (
                // если включен режим редактирования, отображаем инпуты для редактирования
                <>
                    <input
                        className={`item ${!editedWord.english ? 'error' : ''}`}
                        value={editedWord.english}
                        onChange={(e) => handleChange('english', e.target.value)}
                    />
                    <input
                        className={`item ${!editedWord.transcription ? 'error' : ''}`}
                        value={editedWord.transcription}
                        onChange={(e) => handleChange('transcription', e.target.value)}
                    />
                    <input
                        className={`item ${!editedWord.russian ? 'error' : ''}`}
                        value={editedWord.russian}
                        onChange={(e) => handleChange('russian', e.target.value)}
                    />
                    <div className='item__btns'>
                        <ContentButton
                            className={`post__btn ${!isFieldsFilled ? 'error' : ''}`}
                            name='Сохранить'
                            onClick={handleSave}
                            disabled={!isFieldsFilled} />
                        <ContentButton
                            className='post__btn'
                            name='Отмена'
                            onClick={handleCancel} />
                    </div>
                </>
            ) : (
                // если режим редактирования выключен, отображаем данные и кнопку "Редактировать"
                <>
                    <div className='item'>{props.word.english}</div>
                    <div className='item'>{props.word.transcription}</div>
                    <div className='item'>{props.word.russian}</div>
                    <div className='item__btns'>
                        <ContentButton className='post__btn' name='Редактировать' onClick={handleEdit} />
                        <ContentButton className='post__btn' name='Удалить' onClick={handleDelete} />
                    </div>
                </>
            )}
        </div>
    );
}
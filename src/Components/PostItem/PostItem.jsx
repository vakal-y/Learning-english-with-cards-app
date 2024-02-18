import React, { useState, useEffect, useContext } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './PostItem.scss';
import { MyContext } from '../Context/MyContext';

export default function PostItem(props) {
    const { updateWord } = useContext(MyContext);
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
    // состояние для отслеживания ошибок
    const [error, setError] = useState(null);

    // состояние для отслеживания заполненности полей
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);

    useEffect(() => {
        // проверяю, есть ли хотя бы одно пустое поле
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

    // сохранение изменений и отправка на сервер, выход из режима редактирования
    const handleSave = async () => {
        try {
            // (вызов на сервер) вызов метода updateWord с передачей идентификатора и обновленных данных
            await updateWord(props.word.id, editedWord);

            // если успешно, завершаю редактирование
            setIsEditing(false);
            // сбрасываю ошибку в случае успеха
            setError(null);
        } catch (error) {
            console.error('Ошибка при обновлении слова:', error);
            getWordsServer(); // откатываю изменения
            // сохраняю ошибку в состоянии
            setError(`Ошибка при обновлении слова: ${error.message}`);
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
        <>
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
            <div>{error && <p className='error'>{error}</p>}</div>
        </>
    );

}
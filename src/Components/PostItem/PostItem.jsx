import React, { useState, useEffect, useContext } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './PostItem.scss';
import { MyContext } from '../Context/MyContext';

export default function PostItem(props) {
    const { updateWord, deleteWord } = useContext(MyContext);
    // состояние для отслеживания режима редактирования
    const [isEditing, setIsEditing] = useState(false);
    // состояние для временного хранения редактируемых данных
    const [editedWord, setEditedWord] = useState(
        {
            english: props.word.english,
            transcription: props.word.transcription,
            russian: props.word.russian,
            tags: props.word.tags
        }
    );
    // состояние для отслеживания ошибок
    const [error, setError] = useState(null);

    // состояние для отслеживания заполненности полей
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);

    useEffect(() => {
        const isEmpty = Object.values(editedWord).some((value) => !value); // проверяю, есть ли хотя бы одно пустое поле
        setIsFieldsFilled(!isEmpty);
    }, [editedWord]);

    // включение режима редактирования
    const handleEdit = () => {
        setIsEditing(true)
    };

    // сохранение изменений и отправка на сервер, выход из режима редактирования
    const handleSave = async () => {
        try {
            // (вызов на сервер) вызов метода updateWord с передачей идентификатора и обновленных данных
            await updateWord(props.word.id, editedWord);
            props.onEdit(props.word.id, editedWord); // вызываю функцию из ListOfWords
            setIsEditing(false); // если успешно, завершаю редактирование
            setError(null); // сбрасываю ошибку в случае успеха
        } catch (error) {
            console.error('Ошибка при обновлении слова:', error);
            setError(`Ошибка при обновлении слова: ${error.message}`); // сохраняю ошибку в состоянии
        }
    };

    // обработчик для удаления элемента
    const handleDelete = async () => {
        try {
            await deleteWord(props.word.id);
            props.onDelete(props.word.id);
        } catch (error) {
            console.error('Ошибка при удалении слова:', error);
            setError(`Ошибка при удалении слова: ${error.message}`); // сохраняю ошибку в состоянии
        }
    };

    // отмена изменений и выход из режима редактирования
    const handleCancel = () => {
        // восстановление исходных данных
        setEditedWord({
            english: props.word.english,
            transcription: props.word.transcription,
            russian: props.word.russian,
            tags: props.word.tags
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
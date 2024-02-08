import { useState } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './PostItem.scss';

export default function PostItem(props) {
    // состояние для отслеживания режима редактирования
    const [isEditing, setIsEditing] = useState(false);
    // состояние для временного хранения редактируемых данных
    const [editedWord, setEditedWord] = useState(
        {
            english: props.word.english,
            transcription: props.word.transcription,
            russian: props.word.russian
        }
    )
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
        props.onEdit(props.word.id, editedWord);
        setIsEditing(false);
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
                <>
                    <input
                        className='item'
                        value={editedWord.english}
                        onChange={(e) => handleChange('english', e.target.value)}
                    />
                    <input
                        className='item'
                        value={editedWord.transcription}
                        onChange={(e) => handleChange('transcription', e.target.value)}
                    />
                    <input
                        className='item'
                        value={editedWord.russian}
                        onChange={(e) => handleChange('russian', e.target.value)}
                    />
                    <div className='item__btns'>
                        <ContentButton className='post__btn' name='Сохранить' onClick={handleSave} />
                        <ContentButton className='post__btn' name='Отмена' onClick={handleCancel} />
                    </div>
                </>
            ) : (
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
import ContentButton from '../ContentButton/ContentButton';
import './PostItem.scss';

export default function PostItem(props) {
    const handleDelete = () => {
        props.onDelete(props.word.id);
    };

    const handleEdit = () => {
        props.onEdit(props.word.id);
    };

    return (
        <div className='post__item' ref={props.nodeRef}>
            <div className='item'>{props.word.english}</div>
            <div className='item'>{props.word.transcription}</div>
            <div className='item'>{props.word.russian}</div>
            <div className='item__btns'>
                <ContentButton className='post__btn' name='Редактировать' onClick={handleEdit} />
                <ContentButton className='post__btn' name='Удалить' onClick={handleDelete} />
            </div>
        </div>
    );
}
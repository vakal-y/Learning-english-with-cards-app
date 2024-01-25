import './PostWord.scss';
import PostItem from '../PostItem/PostItem';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

export default function PostWord({ words, onDelete, onEdit }) {
    return (
        <div className='post__word'>
            <TransitionGroup>
                {words.map((word) => (
                    <CSSTransition key={word.id} timeout={500} classNames="word">
                        <PostItem word={word} onDelete={onDelete} onEdit={onEdit} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
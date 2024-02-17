import './PostWord.scss';
import PostItem from '../PostItem/PostItem';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { MyContext } from '../Context/MyContext';
import { useContext } from 'react';

export default function PostWord({ onDelete, onEdit }) {
    const { setDataServer, DataServer } = useContext(MyContext);
    return (
        <div className='post__word'>
            <TransitionGroup>
                {DataServer.map((word) => (
                    <CSSTransition key={word.id} timeout={500} classNames="word">
                        <PostItem word={word} onDelete={onDelete} onEdit={onEdit} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
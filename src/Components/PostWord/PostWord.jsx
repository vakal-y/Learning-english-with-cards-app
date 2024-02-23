import './PostWord.scss';
import PostItem from '../PostItem/PostItem';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

export default function PostWord() {
    const words = useSelector((state) => state.word.words);

    return (
        <div className='post__word'>
            <TransitionGroup>
                {words.map((word) => (
                    <CSSTransition key={word.id} timeout={500} classNames="word">
                        <PostItem word={word} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
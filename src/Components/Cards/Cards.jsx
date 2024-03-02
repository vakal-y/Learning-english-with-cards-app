import React, { useState, useEffect } from 'react';
import CreateCard from '../CreateCard/CreateCard';
import './Cards.scss';
import arrowLeft from '../../assets/arrow1-01.svg';
import arrowRight from '../../assets/arrow2-01.svg';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from "react-redux";
import { setActiveCardIndex, setWords } from '../../store/slice/wordReducer';

export default function Cards() {
    const dispatch = useDispatch();
    const activeCardIndex = useSelector(state => state.word.activeCardIndex);
    const words = useSelector((state) => state.word.words);
    const [wordsLearned, setWordsLearned] = useState(0);

    // беру массив слов с сервера через Redux
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api/words');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server');
                }

                const data = await response.json();
                dispatch(setWords(data)); // отправка действия setWords в Redux store
            } catch (e) {
                console.error(e);
            }
        };

        getData();
    }, [dispatch]);

    // обработчик для переключения на предыдущую карточку
    const handlePrevClick = () => {
        gsap.to('.card__animated-container', { x: '-100%', opacity: 0, duration: 0.5, onComplete: handleAnimationComplete });
    };

    // обработчик для переключения на следующую карточку
    const handleNextClick = () => {
        const newIndex = activeCardIndex + 1 >= words.length ? 0 : activeCardIndex + 1;
        dispatch(setActiveCardIndex(newIndex));
        gsap.to('.card__animated-container', { x: '100%', opacity: 0, duration: 0.5, onComplete: handleAnimationComplete });
    };

    // обработчик, вызываемый после завершения анимации переключения карточек
    const handleAnimationComplete = () => {
        const newIndex = activeCardIndex + 1 >= words.length ? 0 : activeCardIndex + 1;
        dispatch(setActiveCardIndex(newIndex));
        gsap.to('.card__animated-container', { x: '0%', opacity: 1, duration: 0.5 });
    };

    // обработчик для увеличения счетчика выученных слов
    const handleViewTranslation = () => {
        setWordsLearned(prevCount => prevCount + 1);
        console.log('Количество выученных слов:', wordsLearned + 1);
    };

    return (
        <div className='cards__container'>
            <div className='card__container'>
                <div className='arrow'>
                    <button onClick={handlePrevClick} >
                        <img src={arrowLeft} alt='arrowLeft' />
                    </button>
                </div>
                <div className='card__animated-container'>
                    {words[activeCardIndex] && <CreateCard item={words[activeCardIndex]} onViewTranslation={handleViewTranslation} setWordsLearned={setWordsLearned} />}
                </div>
                <div className='arrow'>
                    <button onClick={handleNextClick} >
                        <img src={arrowRight} alt='arrowRight' />
                    </button>
                </div>
            </div>
            <div className='card__number'>
                {activeCardIndex + 1}/{words.length}
            </div>
            <div className='words-learned'>
                Выучено слов: <strong>{wordsLearned}</strong>
            </div>
        </div>
    )
}
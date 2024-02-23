import React, { useState } from 'react';
import CreateCard from '../CreateCard/CreateCard';
import './Cards.scss';
import data from '/src/data.json';
import arrowLeft from '/src/assets/arrow1-01.svg';
import arrowRight from '/src/assets/arrow2-01.svg';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from "react-redux";
import { setWordsLearned } from '../../store/slice/wordsLearnedSlice';
import { setActiveCardIndex } from '../../store/slice/wordReducer';

export default function Cards() {
    const dispatch = useDispatch();
    const activeCardIndex = useSelector(state => state.word.activeCardIndex);
    const wordsLearned = useSelector(state => state.word.wordsLearned);

    // обработчик для переключения на предыдущую карточку
    const handlePrevClick = () => {
        gsap.to('.card__animated-container', { x: '-100%', opacity: 0, duration: 0.5, onComplete: handleAnimationComplete });
    };

    // обработчик для переключения на следующую карточку
    const handleNextClick = () => {
        gsap.to('.card__animated-container', { x: '100%', opacity: 0, duration: 0.5, onComplete: handleAnimationComplete });
    };

    // обработчик, вызываемый после завершения анимации переключения карточек
    const handleAnimationComplete = () => {
        dispatch(setActiveCardIndex((prevIndex) => (prevIndex + 1 >= data.length ? 0 : prevIndex + 1)));
        gsap.to('.card__animated-container', { x: '0%', opacity: 1, duration: 0.5 });
    };

    // обработчик для увеличения счетчика выученных слов
    const handleViewTranslation = () => {
        dispatch(setWordsLearned((prevCount) => prevCount + 1));
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
                    <CreateCard item={data[activeCardIndex]} onViewTranslation={handleViewTranslation} setWordsLearned={setWordsLearned} />
                </div>
                <div className='arrow'>
                    <button onClick={handleNextClick} >
                        <img src={arrowRight} alt='arrowRight' />
                    </button>
                </div>
            </div>
            <div className='card__number'>
                {activeCardIndex + 1}/{data.length}
            </div>
            <div className='words-learned'>
                Выучено слов: <strong>{wordsLearned}</strong>
            </div>
        </div>
    )
}
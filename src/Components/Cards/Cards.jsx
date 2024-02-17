import React, { useState, useContext } from 'react';
import CreateCard from '../CreateCard/CreateCard';
import './Cards.scss';
import arrowLeft from '/src/assets/arrow1-01.svg';
import arrowRight from '/src/assets/arrow2-01.svg';
import { gsap } from 'gsap';
import { MyContext } from '../Context/MyContext';

export default function Cards() {
    const { dataServer } = useContext(MyContext);  // получение данных из контекста
    // состояние для отслеживания индекса активной карточки
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    // состояние для отслеживания количества выученных слов
    const [wordsLearned, setWordsLearned] = useState(0);

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
        setActiveCardIndex((prevIndex) => (prevIndex + 1 >= dataServer.length ? 0 : prevIndex + 1));
        gsap.to('.card__animated-container', { x: '0%', opacity: 1, duration: 0.5 });
    };

    // обработчик для увеличения счетчика выученных слов
    const handleViewTranslation = () => {
        setWordsLearned((prevCount) => prevCount + 1);
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
                    <CreateCard item={dataServer[activeCardIndex]} onViewTranslation={handleViewTranslation} setWordsLearned={setWordsLearned} />
                </div>
                <div className='arrow'>
                    <button onClick={handleNextClick} >
                        <img src={arrowRight} alt='arrowRight' />
                    </button>
                </div>
            </div>
            <div className='card__number'>
                {activeCardIndex + 1}/{dataServer.length}
            </div>
            <div className='words-learned'>
                Выучено слов: <strong>{wordsLearned}</strong>
            </div>
        </div>
    )
}
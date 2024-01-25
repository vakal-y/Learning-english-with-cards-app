import React, { useState } from 'react';
import CreateCard from '../CreateCard/CreateCard';
import './Cards.scss';
import data from '/src/data.json';
import arrowLeft from '/src/assets/arrow1-01.svg';
import arrowRight from '/src/assets/arrow2-01.svg';

export default function Cards() {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const handlePrevClick = () => {
        setActiveCardIndex((prevIndex) =>
            prevIndex - 1 < 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveCardIndex((prevIndex) =>
            prevIndex + 1 >= data.length ? 0 : prevIndex + 1
        );
    };

    return (
        <div className='cards__container'>
            <div className='card__container'>
                <div className='arrow'>
                    <button onClick={handlePrevClick} >
                        <img src={arrowLeft} alt='arrowLeft' />
                    </button></div>
                <CreateCard item={data[activeCardIndex]} />
                <div className='arrow'><button
                    onClick={handleNextClick}
                >
                    <img src={arrowRight} alt='arrowRight' />
                </button></div>
            </div>
            <div className='card__number'>
                {activeCardIndex + 1}/{data.length}
            </div>
        </div >
    )
}
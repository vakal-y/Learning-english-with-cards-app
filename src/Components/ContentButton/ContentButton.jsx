import './ContentButton.scss';

export default function ContentButton(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button className='content__button' onClick={handleClick}><span className='button__text'>{props.name}</span></button>
    )
}
import './Footer.scss';
import ContentButton from '../ContentButton/ContentButton';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <div className='footer_container'>
            <Link to='/learned'><ContentButton name='Выученные слова' /></Link>
            <Link to='/cards'><ContentButton name='Карточки слов' /></Link>
            <Link to='/list'><ContentButton name='Список слов' /></Link>
        </div>
    )
}
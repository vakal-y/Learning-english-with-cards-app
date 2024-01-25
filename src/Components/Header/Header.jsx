import './Header.scss';
import ContentButton from '../ContentButton/ContentButton';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.svg';

export default function Header() {
    return (
        <div className='header__container'>
            <Link to='/' ><img src={logo} /></Link>
            <ContentButton name='Войти' />
        </div>
    )
}
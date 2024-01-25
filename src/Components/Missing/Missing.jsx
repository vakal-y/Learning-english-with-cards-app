import ContentButton from '../ContentButton/ContentButton';
import './Missing.scss';
import { Link } from 'react-router-dom';

export default function Missing() {
    return (
        <div className="missing__container">
            <h1>404</h1>
            <h2>not found</h2>
            <Link path='/'><ContentButton name='Go h[əʊ]me?' /></Link>
        </div>
    )
}

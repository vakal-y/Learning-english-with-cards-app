import './MyInput.scss';

export default function MyInput(props) {
    const { value, onChange, ...otherProps } = props;

    return (
        <input
            className='my__input'
            value={value}
            onChange={onChange}
            {...otherProps}
        />
    );
}
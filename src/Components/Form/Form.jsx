import ContentButton from '../ContentButton/ContentButton';
import './Form.scss';
import '/src/Components/CheckButton/CheckButton.scss';
import MyInput from '../MyInput/MyInput';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWord } from '../../store/slice/wordReducer';
import { setActiveCardIndex } from '../../store/slice/wordReducer';


export default function Form() {
    const dispatch = useDispatch();

    const [english, setEnglish] = useState('');
    const [transcription, setTranscription] = useState('');
    const [russian, setRussian] = useState('');


    // обработчик для добавления нового слова
    const addNewWord = async (e) => {
        e.preventDefault();


        // проверка наличия введенных данных перед добавлением
        if (!english || !transcription || !russian) {
            alert("Заполните пустые поля!");
            return;
        }

        // диспетчеризация добавления нового слова в Redux store
        dispatch(
            addWord({
                id: Date.now(),
                english,
                transcription,
                russian,
            })
        );

        // Опционально: добавление логики для отправки данных на сервер
        const wordData = {
            english,
            transcription,
            russian,
        };

        try {
            await fetch('ваш_эндпоинт_для_создания_слова', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(wordData),
            });

            // Опционально: добавление логики для обновления списка слов из сервера
            dispatch(fetchWords());
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }


        setEnglish('');
        setTranscription('');
        setRussian('');
    }

    return (
        <div className='form__container'>
            <form className='form' onSubmit={addNewWord}>
                <p>Добавить новое слово</p>
                <div className='form__field'>
                    <div className='form__field-input'>
                        <MyInput
                            value={english}
                            onChange={e => setEnglish(e.target.value)}
                            type="text"
                            placeholder='english'
                        />
                        <MyInput
                            value={transcription}
                            onChange={e => setTranscription(e.target.value)}
                            type="text"
                            placeholder='transcription'
                        />
                        <MyInput
                            value={russian}
                            onChange={e => setRussian(e.target.value)}
                            type="text"
                            placeholder='russian'
                        />
                    </div>
                    <ContentButton name='Добавить' />
                </div>
            </form>
        </div>
    )
}
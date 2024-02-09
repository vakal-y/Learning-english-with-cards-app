import { useState } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './Form.scss';
import '/src/Components/CheckButton/CheckButton.scss';
import MyInput from '../myInput/MyInput';


export default function Form({ words, setWord }) {
    // состояния для управления вводом данных
    const [english, setEnglish] = useState('');
    const [transcription, setTranscription] = useState('');
    const [russian, setRussian] = useState('');

    // обработчик для добавления нового слова
    const addNewWord = (e) => {
        e.preventDefault();

        // проверка наличия введенных данных перед добавлением
        if (!english || !transcription || !russian) {
            alert("Заполните пустые поля!");
            return;
        }
        // добавление нового слова в массив слов
        setWord([...words, { id: Date.now(), english, transcription, russian }]);
        // сброс состояний для очистки инпутов после добавления
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
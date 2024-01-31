import { useState } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './Form.scss';
import '/src/Components/CheckButton/CheckButton.scss';
import MyInput from '../myInput/MyInput';


export default function Form({ words, setWord }) {
    const [english, setEnglish] = useState('');
    const [transcription, setTranscription] = useState('');
    const [russian, setRussian] = useState('');

    const addNewWord = (e) => {
        e.preventDefault();

        if (!english || !transcription || !russian) {
            alert("Заполните пустые поля!");
            return;
        }

        setWord([...words, { id: Date.now(), english, transcription, russian }]);
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
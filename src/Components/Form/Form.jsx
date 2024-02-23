import { useState } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './Form.scss';
import '/src/Components/CheckButton/CheckButton.scss';
import MyInput from '../myInput/MyInput';
import { useSelector, useDispatch } from 'react-redux';


export default function Form() {
    const dispatch = useDispatch();
    const words = useSelector((state) => state.word.words);

    // обработчик для добавления нового слова
    const addNewWord = (e) => {
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
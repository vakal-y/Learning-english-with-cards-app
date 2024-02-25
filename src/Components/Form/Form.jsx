import { useState, useContext } from 'react';
import ContentButton from '../ContentButton/ContentButton';
import './Form.scss';
import '/src/Components/CheckButton/CheckButton.scss';
import MyInput from '../MyInput/MyInput';
import { MyContext } from '../Context/MyContext';


export default function Form() {
    const { addWord } = useContext(MyContext);

    // состояния для управления вводом данных
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
        try {
            // добавление нового слова на сервер
            await addWord({ english, transcription, russian });
            // сброс состояний для очистки инпутов после добавления
            setEnglish('');
            setTranscription('');
            setRussian('');
        } catch (error) {
            console.error(error);
        }
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
                    <ContentButton name='Добавить' onClick={(e) => addNewWord(e)} />
                </div>
            </form>
        </div>
    )
}
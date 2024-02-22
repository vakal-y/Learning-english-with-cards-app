import { createContext, useState, useEffect } from 'react';
import GET from '../../GET';
import './MyContext.scss';

export const MyContext = createContext(); // хранилище, куда складываются данные с сервера

// создание универсального компонента
export function MyContextComponent({ children }) {
    const [dataServer, setDataServer] = useState(false);
    const getWordsServer = async () => {
        try {
            const wordsServer = await GET.getWords();
            setDataServer(wordsServer);
        } catch (error) {
            console.error(error);
            setDataServer([]);
        }
    };

    const updateWord = async (id, updatedData) => {
        try {
            const resp = await GET.updateWord(id, updatedData);
            console.log(resp);
            getWordsServer();
        } catch (error) {
            console.error(error);
        }
    };

    const addWord = async (newData) => {
        try {
            console.log(newData);
            const resp = await GET.addWord(newData);
            console.log(resp);
            getWordsServer();
        } catch (error) {
            console.error(error);
        }
    }

    const value = { dataServer, setDataServer, updateWord, getWordsServer, addWord }; // данные, которые будут храниться в контексте - данные с сервера и функция-апдейтер

    useEffect(() => {
        getWordsServer();
    }, []); // [] означает, что эффект будет вызван только при монтировании компонента


    if (!dataServer) {
        return (
            <div className="windows8">
                <div className="wBall" id="wBall_1">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_2">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_3">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_4">
                    <div className="wInnerBall"></div>
                </div>
                <div className="wBall" id="wBall_5">
                    <div className="wInnerBall"></div>
                </div>
            </div>
        )
    }

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
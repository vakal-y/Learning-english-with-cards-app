import { createContext, useState, useEffect } from 'react';
import GET from '../../GET';
import './MyContext.scss';

export const MyContext = createContext(); // хранилище, куда складываются данные с сервера

// создание универсального компонента
export function MyContextComponent({ children }) {
    const [dataServer, setDataServer] = useState(false);
    const value = { dataServer, setDataServer }; // данные, которые будут храниться в контексте - данные с сервера и функция-апдейтер

    // useEffect(() => {
    //     getWordsServer();
    // }, []); // [] означает, что эффект будет вызван только при монтировании компонента

    useEffect(() => {
        // имитация задержки в 2 секунды перед получением данных
        const delay = setTimeout(() => {
            getWordsServer();
        }, 5000);

        // очистка таймаута при размонтировании компонента
        return () => clearTimeout(delay);
    }, []);

    async function getWordsServer() {
        try {
            const wordsServer = await GET.getWords(); // вызываю метод из класса GET
            setDataServer(wordsServer);
        } catch (error) {
            console.error('Error fetching data from the server:', error);
            setDataServer([]); // данные по умолчанию в случае ошибки
        }
    }

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
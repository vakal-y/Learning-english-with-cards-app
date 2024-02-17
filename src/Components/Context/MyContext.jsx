import { createContext, useState, useEffect } from 'react';
import GET from '../../GET';

export const MyContext = createContext(); // хранилище, куда складываются данные с сервера

// создание универсального компонента
export function MyContextComponent({ children }) {
    const [dataServer, setDataServer] = useState(false);
    const value = { dataServer, setDataServer }; // данные, которые будут храниться в контексте - данные с сервера и функция-апдейтер

    useEffect(() => {
        getWordsServer();
    }, []); // [] означает, что эффект будет вызван только при монтировании компонента

    async function getWordsServer() {
        try {
            const wordsServer = await GET.getUsers();
            setDataServer(wordsServer);
        } catch (error) {
            console.error('Error fetching data from the server:', error);
            setDataServer([]); // данные по умолчанию в случае ошибки
        }
    }

    if (!dataServer) {
        return <h1>loading...</h1>
    }

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
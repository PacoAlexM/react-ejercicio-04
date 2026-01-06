import { useState, useCallback } from 'react'
import { MyTitle } from './ui/MyTitle'
import { MySubtitle } from './ui/MySubtitle'

export const MemoHook = () => {
    const [title, setTitle] = useState('Hola');
    const [subtitle, setSubtitle] = useState('Mundo!');

    const handleMyAPICall = useCallback(() => {
        console.log('Llamar a API - ', subtitle);
    }, [subtitle]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">Hook App</h1>

            <MyTitle title={ title } />
            <MySubtitle subtitle={ subtitle } callMyAPI={ handleMyAPICall } />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ () => setTitle('Hello') }>Cambiar Título</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ () => setSubtitle('World!') }>Cambiar Subtítulo</button>
        </div>
    );
}

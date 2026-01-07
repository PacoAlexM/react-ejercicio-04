// import { useState, useEffect } from 'react'

interface Props {
    currentPokedexEntry: number;
    // pokemonName: string;
    onPreviousPokedexEntryClick: () => void;
    onNextPokedexEntryClick: () => void;
    onPokemonNameChange: (pokemonName: string) => void;
}

export const SearchPokemon = ({ currentPokedexEntry, /*pokemonName,*/ onPreviousPokedexEntryClick, onNextPokedexEntryClick, onPokemonNameChange }: Props) => {
    // const [name, setName] = useState(pokemonName);

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         onPokemonNameChange(name);
    //     }, 700);
    // 
    //     return () => {
    //         clearTimeout(timerId);
    //     }
    // }, [name]);

    const handleFormAction = (formData: FormData) => {
        const newName = formData.get('pokemon-name') as string;

        if (newName.trim() === '') return;

        // console.log({ newName });

        onPokemonNameChange(newName);
    }

    return (
        <>
            <div className="flex gap-2 mb-2">
                <button className="flex items-center justify-center gap-2 enabled:bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md enabled:cursor-pointer" disabled={ currentPokedexEntry == 1 } onClick={ onPreviousPokedexEntryClick }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112L184 256l144 144"/></svg> Anterior
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ onNextPokedexEntryClick }>
                    Siguiente <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="m184 112l144 144l-144 144"/></svg>
                </button>
            </div>

            {/* <input type="text" className="bg-white text-black px-4 py-2 rounded-md w-1/2 mb-2" value={ name } onChange={ event => setName(event.target.value) } placeholder="Buscar: ejem. bulbasaur" /> */}
            <form action={ handleFormAction } className="flex flex-col items-center justify-center">
                <input type="text" name="pokemon-name" className="bg-white text-black px-4 py-2 mb-2 rounded-md w-[250px]" placeholder="Buscar: ejem. bulbasaur" />
            </form>
        </>
    );
}

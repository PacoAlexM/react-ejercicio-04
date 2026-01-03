import { useState, useEffect } from 'react'

interface Props {
    currentPokedexEntry: number;
    pokemonName: string;
    onPreviousPokedexEntryClick: () => void;
    onNextPokedexEntryClick: () => void;
    onPokemonNameChange: (pokemonName: string) => void;
}

export const SearchPokemon = ({ currentPokedexEntry, pokemonName, onPreviousPokedexEntryClick, onNextPokedexEntryClick, onPokemonNameChange }: Props) => {
    const [name, setName] = useState(pokemonName);

    useEffect(() => {
        const timerId = setTimeout(() => {
            onPokemonNameChange(name);
        }, 700);

        return () => {
            clearTimeout(timerId);
        }
    }, [name]);

    return (
        <>
            <div className="flex gap-2 mb-2">
                <button className="enabled:bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md enabled:cursor-pointer" disabled={ currentPokedexEntry == 1 } onClick={ onPreviousPokedexEntryClick }>Anterior</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ onNextPokedexEntryClick }>Siguiente</button>
            </div>

            <input type="text" className="bg-white text-black px-4 py-2 rounded-md w-1/2 mb-2" value={ name } onChange={ event => setName(event.target.value) } placeholder="Buscar: ejem. bulbasaur" />
        </>
    );
}

import { useState, useRef } from 'react'
import { useCounter } from '../hooks/useCounter'
import { usePokemon } from '../hooks/usePokemon'

export const PokemonPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [pokemonName, setPokemonName] = useState<string>('');
    const { counter, increment, decrement } = useCounter();
    const { pokemon, formattedId, isLoading } = usePokemon({ id: counter, name: pokemonName });

    const handleSearchPokemon = () => {
        if (inputRef.current?.value.trim() === '') return;

        const name: string = inputRef.current!.value.toLowerCase();

        setPokemonName(name);

        inputRef.current?.select();
    }

    if (isLoading) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">Cargando...</h3>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">No encontrado</h3>
            </div>
        );
    }
    
    return (
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>
            <h3 className="text-xl font-bold text-white">#{ formattedId } { pokemon.name }</h3>
            <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ counter }.png` } alt={ pokemon.name } />

            <div className="flex gap-2 mb-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ decrement }>Anterior</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ increment }>Siguiente</button>
            </div>

            <input type="text" className="bg-white text-black px-4 py-2 rounded-md w-1/2 mb-2" ref={ inputRef } />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-1/2" onClick={ handleSearchPokemon }>Buscar Pokémon</button>
        </div>
    );
}

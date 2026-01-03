// import { useRef } from 'react'
import { useCounter } from '../hooks/useCounter'
import { useName } from '../hooks/useName'
import { usePokemon } from '../hooks/usePokemon'

import { PokemonInfo } from './components/PokemonInfo'
import { SearchPokemon } from './components/SearchPokemon'

export const PokemonPage = () => {
    // const inputRef = useRef<HTMLInputElement>(null);
    const { counter, increment, decrement } = useCounter();
    const { name, save } = useName();
    const { pokemon, formattedId, isLoading, error, errorMessage, reset } = usePokemon({ id: counter, pokemonName: name });

    if (isLoading) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">Cargando...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient flex flex-col items-center">
                <h1 className="text-2xl font-thin text-white">Pokémon</h1>
                <h3 className="text-xl font-bold text-white">No encontrado</h3>
                { errorMessage && <h3 className="text-sm font-thin text-white mb-4">{ errorMessage }</h3> }
                <button className="underline cursor-pointer hover:text-blue-400" onClick={ reset }>Regresar</button>
            </div>
        );
    }
    
    return (
        <div className="bg-gradient flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Pokémon</h1>

            {/*
            <h3 className="text-xl font-bold text-white">#{ formattedId } { pokemon?.name }</h3>
            <img src={ pokemon?.imageUrl } alt={ pokemon?.name } />

            <div className="flex gap-2 mb-3">
                {
                    pokemon?.types.map(type => (
                        <img className="w-[90px]" key={ type.typeId } src={ type.typeImageUrl } alt={ type.typeName } />
                    ))
                }
            </div>
            */}

            <PokemonInfo pokemon={ pokemon } pokedexEntry={ formattedId } />

            {/*
            <div className="flex gap-2 mb-2">
                <button className="enabled:bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md enabled:cursor-pointer" disabled={ counter == 1 } onClick={ decrement }>Anterior</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={ increment }>Siguiente</button>
            </div>

            <input type="text" className="bg-white text-black px-4 py-2 rounded-md w-1/2 mb-2" value={ name } onChange={ (event) => saveName(event.target.value) } ref={ inputRef } placeholder="Buscar: ejem. bulbasaur" />
            */}

            <SearchPokemon currentPokedexEntry={ counter } pokemonName={ name } onPreviousPokedexEntryClick={ decrement } onNextPokedexEntryClick={ increment } onPokemonNameChange={ save } />
        </div>
    );
}

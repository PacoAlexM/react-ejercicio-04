import { useState, useEffect } from 'react'
import type { PokemonResponse } from '../03-examples/interfaces/PokemonResponse.interface'
import type { Pokemon, PokemonType } from '../03-examples/interfaces/Pokemon.interface'

// interface Pokemon {
//     id: number;
//     name: string;
//     imageUrl: string;
//     types: PokemonType[];
// }
// 
// interface PokemonType {
//     typeId: number;
//     typeName: string;
//     typeImageUrl: string;
// }

interface Props {
    id: number;
    pokemonName: string;
}

const PokemonType: { [type: string]: number } = {
    'normal': 1,
    'fighting': 2,
    'flying': 3,
    'poison': 4,
    'ground': 5,
    'rock': 6,
    'bug': 7,
    'ghost': 8,
    'steel': 9,
    'fire': 10,
    'water': 11,
    'grass': 12,
    'electric': 13,
    'psychic': 14,
    'ice': 15,
    'dragon': 16,
    'dark': 17,
    'fairy': 18,
}

export const usePokemon = ({ id, pokemonName }: Props) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getPokemonById = async (id: number) => {
        setIsLoading(true);
        setError(false);
        setErrorMessage('');
        
        await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`)
            .then(response => {
                // console.log(response);

                if (!response.ok) throw new Error(`HTTP error! Status: ${ response.status }`, { cause: response.statusText });

                return response.json() as Promise<PokemonResponse>;
            })
            .then(data => {
                const { id, name, types } = data;

                const typesData: PokemonType[] = types.map(type => ({
                    typeId: PokemonType[type.type.name],
                    typeName: type.type.name,
                    typeImageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${ PokemonType[type.type.name] }.png`,
                }));

                setPokemon({
                    id,
                    name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`,
                    types: typesData,
                });
            })
            .catch(error => {
                // console.log({ error });
                // setPokemon(null);
                setError(true);
                setErrorMessage(error.message);
            });

        // const data = await response.json();
        // 
        // setPokemon({
        //     id: id,
        //     name: data.name,
        //     imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }`,
        // });

        // console.log(pokemon);
        
        setIsLoading(false);
    }

    // const getPokemonByName = async (name: string) => {
    //     if (name.trim() === '') return;
    // 
    //     setIsLoading(true);
    // 
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`);
    //     const data = await response.json();
    //     
    //     setPokemon({
    //         id: data.order,
    //         name: name,
    //         imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ data.order }`,
    //     });
    // 
    //     setIsLoading(false);
    // }

    const getPokemonByName = async (name: string) => {
        if (name.trim() === '') return;

        setIsLoading(true);
        setError(false);
        setErrorMessage('');

        await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${ response.status }`, { cause: response.statusText });

                return response.json() as Promise<PokemonResponse>;
            })
            .then(data => {
                const { id, name, types } = data;

                const typesData: PokemonType[] = types.map(type => ({
                    typeId: PokemonType[type.type.name],
                    typeName: type.type.name,
                    typeImageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${ PokemonType[type.type.name] }.png`,
                }));

                setPokemon({
                    id,
                    name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`,
                    types: typesData,
                });
            })
            .catch(error => {
                // setPokemon(null);
                setError(true);
                setErrorMessage(error.message);
            });

        setIsLoading(false);
    }

    const reset = () => setError(false);

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    useEffect(() => {
        // const timeoutId = setTimeout(() => {
        //     getPokemonByName(name);
        // }, 700);
        // 
        // return () => {
        //     clearTimeout(timeoutId);
        // }

        getPokemonByName(pokemonName);
    }, [pokemonName]);

    return {
        pokemon,
        isLoading,
        error,
        errorMessage,
        formattedId: pokemon?.id.toString().padStart(3, '0'),
        reset,
    }
}

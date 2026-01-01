import { useState, useEffect } from 'react'
import type { PokemonResponse } from '../03-examples/interfaces/PokemonResponse.interface'

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    typeId: number[];
}

interface Props {
    id: number;
    name: string;
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

export const usePokemon = ({ id, name = '' }: Props) => {
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

                setPokemon({
                    id,
                    name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }`,
                    typeId: types.map(type => PokemonType[type.type.name]),
                });
            })
            .catch(error => {
                // console.log({ error });
                setPokemon(null);
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

                setPokemon({
                    id,
                    name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }`,
                    typeId: types.map(type => PokemonType[type.type.name]),
                });
            })
            .catch(error => {
                setPokemon(null);
                setError(true);
                setErrorMessage(error.message);
            });

        setIsLoading(false);
    }

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getPokemonByName(name);
        }, 700);
    
        return () => {
            clearTimeout(timeoutId);
        }
    }, [name]);

    return {
        pokemon,
        isLoading,
        error,
        errorMessage,
        formattedId: pokemon?.id.toString().padStart(3, '0'),
    }
}

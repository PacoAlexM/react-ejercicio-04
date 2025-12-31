import { useState, useEffect } from 'react'

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

interface Props {
    id: number;
    name: string;
}

export const usePokemon = ({ id, name }: Props) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPokemonById = async (id: number) => {
        setIsLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`);
        const data = await response.json();

        setPokemon({
            id: id,
            name: data.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }`,
        });

        setIsLoading(false);
    }

    const getPokemonByName = async (name: string) => {
        if (name.trim() === '') return;

        setIsLoading(true);

        name = name.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`);
        const data = await response.json();

        setPokemon({
            id: data.order,
            name: name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ data.order }`,
        });

        setIsLoading(false);
    }

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    useEffect(() => {
        getPokemonByName(name);
        console.log(name);
    }, [name]);

    return {
        pokemon,
        isLoading,
        formattedId: id.toString().padStart(3, '0'),
    }
}

import type { Pokemon } from '../interfaces/Pokemon.interface'

interface Props {
    pokemon?: Pokemon | null;
    pokedexEntry?: string;
}

export const PokemonInfo = ({ pokemon, pokedexEntry }: Props) => {
    return (
        <>
            <h3 className="text-xl font-bold text-white">#{ pokedexEntry } { pokemon?.name }</h3>
            <img className="size-40" src={ pokemon?.imageUrl } alt={ pokemon?.name } />

            <div className="flex gap-2 mb-3">
                {
                    pokemon?.types.map(({ typeId, typeName, typeImageUrl }) => (
                        <img className="w-25" key={ typeId } src={ typeImageUrl } alt={ typeName } />
                    ))
                }
            </div>
        </>
    )
}

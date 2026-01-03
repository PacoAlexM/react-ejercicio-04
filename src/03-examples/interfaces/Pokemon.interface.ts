export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: PokemonType[];
}

export interface PokemonType {
    typeId: number;
    typeName: string;
    typeImageUrl: string;
}

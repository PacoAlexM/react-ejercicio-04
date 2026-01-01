export interface PokemonResponse {
    base_experience: number;
    height: number;
    id: number;
    name: string;
    types: Type[];
    weight: number;
}

export interface Type {
    slot: number;
    type: Species;
}

export interface Species {
    name: string;
    url: string;
}

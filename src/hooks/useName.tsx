import { useState } from 'react'

export const useName = (initialValue: string = 'bulbasaur') => {
    const [name, setName] = useState<string>(initialValue);

    const saveName = (newName: string) => {
        setName(newName.toLowerCase());
    }

    return {
        name,
        saveName,
    }
}

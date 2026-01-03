import { useState } from 'react'

export const useName = (initialValue: string = '') => {
    const [name, setName] = useState<string>(initialValue);

    const save = (newName: string) => {
        setName(newName.toLowerCase());
    }

    return {
        name,
        save,
    }
}

import { /*useEffect*/ use, type Usable } from 'react'
import { /*getUserAction,*/ type User } from './api/get-user.action'

interface Props {
    getUser: Usable<User>;
}

// const userPromise = getUserAction(1);

export const ClientInformation = (/*{ id }: { id: number }*/ { getUser }: Props) => {
    // useEffect(() => {
    //     getUserAction(id)
    //         .then(console.log);
    // }, [id]);

    const { id, name, location, role } = use(getUser);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h2 className="text-4xl font-thin text-white">{ name } - #{ id }</h2>

            <p className="text-white text-2xl">{ location }</p>
            <p className="text-white text-xl">{ role }</p>
        </div>
    );
}

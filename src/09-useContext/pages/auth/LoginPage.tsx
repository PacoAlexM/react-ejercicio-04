import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { UserContext } from '../../context/UserContext'

export const LoginPage = () => {
    const { login } = useContext(UserContext);
    const [userId, setUserId] = useState('');

    const navigation = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = login(+userId);

        console.log({ result });

        if (!result) {
            toast.error('Usuario no encontrado');
        }

        navigation('/profile');
    }

    return (
        <div className="flex flex-col items-center min-h-screen">
            <h1 className="text-4xl font-bold">Iniciar Sesión</h1>

            <hr />

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2 my-10">
                <Input type="number" value={ userId } onChange={ e => setUserId(e.target.value) } placeholder="ID del Usuario" />
                <Button type="submit">Login</Button>
            </form>

            <Link to="/about">
                <Button variant="ghost">Volver a la página principal</Button>
            </Link>
        </div>
    );
}

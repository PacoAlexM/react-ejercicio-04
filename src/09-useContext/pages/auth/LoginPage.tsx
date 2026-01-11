import { Link } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const LoginPage = () => {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <h1 className="text-4xl font-bold">Iniciar Sesión</h1>

            <hr />

            <form className="flex flex-col gap-2 my-10">
                <Input type="number" placeholder="ID del Usuario" />
                <Button type="submit">Login</Button>
            </form>

            <Link to="/about">
                <Button variant="ghost">Volver a la página principal</Button>
            </Link>
        </div>
    );
}

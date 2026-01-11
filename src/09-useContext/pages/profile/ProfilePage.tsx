import { Button } from '@/components/ui/button'

export const ProfilePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Perfil del usuario</h1>

            <hr />

            <pre className="my-4">{ JSON.stringify({}, null, 2) }</pre>

            <Button variant="destructive">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/>
                </svg> Salir
            </Button>
        </div>
    );
}

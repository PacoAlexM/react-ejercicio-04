import { type JSX, use } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'

interface Props {
    element: JSX.Element;
}

export const PublicRoute = ({ element }: Props) => {
    const { authStatus } = use(UserContext);

    if (authStatus === 'checking') return null;

    if (authStatus === 'not-authenticated') return element;

    return <Navigate to="/" replace />;
}

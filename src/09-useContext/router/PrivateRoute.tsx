import { type JSX, use } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'

interface Props {
    element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
    const { authStatus } = use(UserContext);

    if (authStatus === 'checking') return null;

    if (authStatus === 'authenticated') return element;

    return <Navigate to="/login" replace />;
}

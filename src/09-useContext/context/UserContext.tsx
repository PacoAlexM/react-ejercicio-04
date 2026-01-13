import { useState, type PropsWithChildren, createContext } from 'react'
import { type User, users } from '../data/user-mock.data'

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
    authStatus: AuthStatus;
    user: User | null;
    login: (userId: number) => boolean;
    logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number): boolean => {
        const user = users.find(user => user.id === userId);

        if (!user) {
            console.log(`User ${userId} not found`);

            setUser(null);
            setAuthStatus('not-authenticated');

            return false;
        }

        setUser(user);
        setAuthStatus('authenticated');

        return true;
    }

    const handleLogout = () => {
        setUser(null);
        setAuthStatus('not-authenticated');
    }

    return <UserContext value={{
        authStatus,
        user,
        login: handleLogin,
        logout: handleLogout,
    }}>{ children }</UserContext>;
}

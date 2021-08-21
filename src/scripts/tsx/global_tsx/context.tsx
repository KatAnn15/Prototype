import { createContext } from 'react';

interface ContextProps {
    loggedIn: Boolean,
    email: (string | null),
    setStatus: React.Dispatch<React.SetStateAction<Boolean>>,
    setEmail: React.Dispatch<React.SetStateAction<null | string>>,
}

export const GlobalContext = createContext({} as ContextProps);


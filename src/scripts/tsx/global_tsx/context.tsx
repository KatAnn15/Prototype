import React, { createContext } from 'react';

interface ContextProps {
    loggedIn: Boolean,
    email: (string | null),
    setStatus: React.Dispatch<React.SetStateAction<Boolean>>,
    setEmail: React.Dispatch<React.SetStateAction<null | string>>,
    subscribed: Boolean,
    setSubscriptionStatus: React.Dispatch<React.SetStateAction<Boolean>>
}

export const GlobalContext = createContext({} as ContextProps);

export const key = "?api_key=29ab4f75bb2db1deeb32771398e6c025&language=en-US"


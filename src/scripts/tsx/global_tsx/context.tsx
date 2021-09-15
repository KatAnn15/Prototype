import React, { createContext } from 'react';

interface ContextProps {
    loggedIn: Boolean,
    email: (string | null),  
    subscribed: Boolean,
    name: (string|null),
    setStatus: React.Dispatch<React.SetStateAction<Boolean>>,
    setEmail: React.Dispatch<React.SetStateAction< string | null>>,
    setSubscriptionStatus: React.Dispatch<React.SetStateAction<Boolean>>,
    setName: React.Dispatch<React.SetStateAction<(string | null)>>
}

export const GlobalContext = createContext({} as ContextProps);

export const key = "?api_key=29ab4f75bb2db1deeb32771398e6c025&language=en-US"


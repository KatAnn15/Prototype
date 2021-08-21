import * as React from 'react';
import App from "./App";
import { GlobalContext } from './scripts/tsx/global_tsx/context';

interface ContextProps {
  email: (string|null),
  setEmail: React.Dispatch<React.SetStateAction<null | string>>,
  status: Boolean,
  setStatus: React.Dispatch<React.SetStateAction<Boolean>>
}

const AppWrapper: React.FC  = () => {
  const [email, setUserEmail] = React.useState<ContextProps["email"]>(null)
  const [status, setUserStatus] = React.useState<ContextProps["status"]>(false)
    return (
      <GlobalContext.Provider value={{loggedIn:status, email: email, setEmail: setUserEmail, setStatus: setUserStatus}}>
      <div className="appWrapper">
        <App/>
      </div></GlobalContext.Provider>
    );
  }
  
  export default AppWrapper;
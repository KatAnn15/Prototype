import * as React from 'react';
import App from "./App";
import { GlobalContext } from './scripts/tsx/global_tsx/context';

interface ContextProps {
  email: (string | null),
  setEmail: React.Dispatch<React.SetStateAction<null | string>>,
  status: Boolean,
  setStatus: React.Dispatch<React.SetStateAction<Boolean>>,
  subscribed: Boolean,
  setSubscriptionStatus: React.Dispatch<React.SetStateAction<Boolean>>,
  name: (string | null),
  setName: React.Dispatch<React.SetStateAction<string>>
}

const AppWrapper: React.FC  = () => {
  const emailStorageItem = window.localStorage.getItem("appAuth-email");
  const nameStorageItem = window.localStorage.getItem("appAuth-name");
  let savedEmail: (string | null) = null;
  let savedLoggedIn: Boolean = false;
  let savedName: (string | null) = null;
  if (emailStorageItem) {
    savedEmail = emailStorageItem;
    savedLoggedIn = true;
  }
  if (nameStorageItem) {
    savedName = nameStorageItem
  }
  
  const [email, setUserEmail] = React.useState<ContextProps["email"]>(savedEmail);
  const [name, setUserName] = React.useState<ContextProps["email"]>(savedName)
  const [status, setUserStatus] = React.useState<ContextProps["status"]>(savedLoggedIn);
  const [subscribed, setSubscriptionStatus] = React.useState<ContextProps["subscribed"]>(false)
    return (
      <GlobalContext.Provider value={{loggedIn:status, email: email, name: name, setName: setUserName, setEmail: setUserEmail, setStatus: setUserStatus, subscribed: subscribed, setSubscriptionStatus: setSubscriptionStatus}}>
      <div className="appWrapper">
        <App/>
      </div></GlobalContext.Provider>
    );
  }
  
  export default AppWrapper;
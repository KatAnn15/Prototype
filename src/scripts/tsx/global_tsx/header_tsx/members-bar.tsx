import * as React from 'react';
import { useContext, useState } from 'react';
import {GlobalContext} from "../context";
import {isMobile} from "react-device-detect";

interface MembersBarProps {
    setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>
}

interface LoginDisplayProps {
    mLoginDisplay: ("none" | "block"),
    setMLoginDisplay: React.Dispatch<React.SetStateAction<"none" | "block">>
}

const MembersBar :React.FC<MembersBarProps> = ({setModalVisibility}) => {
    const context = useContext(GlobalContext);
    const [mLoginDisplay, setMLoginDisplay] = useState<LoginDisplayProps["mLoginDisplay"]>("none")
    
    const setUserStatus = () => {
        if (context.loggedIn) {
        context.setStatus(false);
        window.localStorage.removeItem("appAuth-email");
        window.localStorage.removeItem("appAuth-name");
        } else { 
            setModalVisibility(true)
        }
    }

    const toggleLoginBtnForMobile: () => void = () => {
        if (isMobile) {
            mLoginDisplay === "none" ? setMLoginDisplay("block") : setMLoginDisplay("none")
        }
    }

    return (
        <div className="members-bar_wrapper">
            {context.loggedIn ? <button className="member_welcome-message" onClick={toggleLoginBtnForMobile}>Welcome, {context.name}</button>: null}
            <button className="members-bar_login-button" style={{display: (isMobile && !context.loggedIn) || !isMobile ? "block" : mLoginDisplay, top: isMobile && context.loggedIn ? "-10px" :  isMobile && !context.loggedIn ? "-35px" :"25px"}} onClick={setUserStatus}>{context.loggedIn ? "Log Out" : "Log In"}</button>
        </div>
    )
}

export default MembersBar


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
        window.localStorage.removeItem("appAuth-email")
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
            {context.loggedIn ? <button className="member_welcome-message" onClick={toggleLoginBtnForMobile}>Welcome, {context.email?.split("@")[0]}</button>: null}
            <button className="members-bar_login-button" style={{display: (isMobile && !context.loggedIn) || !isMobile ? "block" : mLoginDisplay, top: isMobile &&context.loggedIn ? "75px" : "25px"}} onClick={setUserStatus}>{context.loggedIn ? "Log Out" : "Log In"}</button>
        </div>
    )
}

export default MembersBar


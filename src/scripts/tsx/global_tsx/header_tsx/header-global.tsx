import * as React from 'react';
import firebase from '../firebase_setup';
import { useCallback, useEffect, useState, useContext } from 'react';
import {GlobalContext} from "../context";
import {Link} from "react-router-dom";
import SearchBar from "../search_bar_tsx/search-bar";
import LoginModal from "./login-modal";
import {isMobile} from "react-device-detect";

interface HeaderGlobalProps  {
    logo: string,
    updateLogo: string
}

interface ModalVisibleProps {
    modalVisible: Boolean,
    setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>
}

interface MembersMoreToggle {
    areaExpanded: Boolean,
    setAreaExpanded: React.Dispatch<React.SetStateAction<Boolean>>
}

const HeaderGlobal:React.FC = () => {
    const [logo, updateLogo] = useState<HeaderGlobalProps["logo"]>("");
    const context = useContext(GlobalContext);
    const {loggedIn} = context;
    const [modalVisible, setModalVisibility] = useState<ModalVisibleProps["modalVisible"]>(false);
    const [areaExpanded, setAreaExpanded] = useState<MembersMoreToggle["areaExpanded"]>(false);

    const fetchLogo = useCallback(async () => {
        const ref = firebase.storage().ref();
        const fileData = await ref.child("ATFImages/netflix.png")
        const file = await fileData.getDownloadURL();
        updateLogo(file);
    }, [])

    const setLoggedInStatus = () => {
        if (context.loggedIn) { 
            context.setStatus(false);
            window.localStorage.removeItem("appAuth-email");
         } else {
             setModalVisibility(true)
         }
    }

    const setSubscribedStatus = () => {
        context.subscribed ? context.setSubscriptionStatus(false) : context.setSubscriptionStatus(true)
    }
    
    const toggleMembersAreaMobile: () => void = () => {
        areaExpanded ? setAreaExpanded(false) : setAreaExpanded(true)
    }

    useEffect(() => {
        fetchLogo()
    }, [fetchLogo])

    return (
        <div className="header-global_wrapper">
            <Link to={"/"}><img className="site-logo-img" src={logo} alt="Netflix logo" /></Link>
            <SearchBar />
            <div className="header-global_members-area" style={{display: isMobile && !areaExpanded ? "none" : "flex"}}>
                <span> {context.loggedIn ? `Welcome, ${context.name}!` :"UNLIMITED TV SHOWS & MOVIES"}</span>
                {!context.subscribed && context.loggedIn ?  <button className="subscription-bar" onClick={setSubscribedStatus}>Join Now</button> : null}
                <button className="login-bar" onClick={setLoggedInStatus}>{loggedIn ? "Sign Out" : "Sign Up"}</button>
            </div>
            {isMobile ? <button className="members-bar_mobile-more-btn" onClick={toggleMembersAreaMobile}>More</button>: null}
            {modalVisible ? <LoginModal setModalVisibility={setModalVisibility}/> : null}
        </div>
    )
}

export default HeaderGlobal
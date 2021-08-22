import * as React from 'react';
import firebase from '../firebase_setup';
import { useCallback, useEffect, useState, useContext } from 'react';
import {GlobalContext} from "../context"

type PropsHeader = {
    logo: string,
    updateLogo: string
}
const HeaderGlobal:React.FC = () => {
    const [logo, updateLogo] = useState<PropsHeader["logo"]>("");
    const context = useContext(GlobalContext);
    const {loggedIn} = context

    const fetchLogo = useCallback(async () => {
        const ref = firebase.storage().ref();
        const fileData = await ref.child("ATFImages/netflix.png")
        const file = await fileData.getDownloadURL();
        updateLogo(file);
    }, [])

    useEffect(() => {
        fetchLogo()
    }, [fetchLogo])

    return (
        <div className="header-global_wrapper">
            <img className="site-logo-img" src={logo} alt="Netflix logo" />
            <div className="header-global_members-area">
                <span>UNLIMITED TV SHOWS & MOVIES</span>
                <button className="subscription-bar">Join Now</button>
                <button className="login-bar">{loggedIn ? "Sign Out" : "Sign Up"}</button>
            </div>
        </div>
    )
}

export default HeaderGlobal
import * as React from 'react';
import firebase from "../../global_tsx/firebase_setup";
import MembersBar from "../header_tsx/members-bar"

import { useState, useEffect, useCallback } from 'react';

type Props = {
    logo: string,
    updateLogo: string
}

const Header: React.FC = () => {
    const [logo, updateLogo] = useState<Props["logo"]>("");

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
        <div className="header-wrapper">
            <img className="site-logo-img" src={logo} alt="Netflix logo" />
            <MembersBar/>
        </div>
    )
}

export default Header
import * as React from 'react';
import firebase from "../../global_tsx/firebase_setup";
import MembersBar from "../header_tsx/members-bar";
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import LoginModal from "./login-modal";

interface LogoProps  {
    logo: string,
    updateLogo: string
}

interface ModalVisibleProps {
    modalVisible: Boolean,
    setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>
}

const HeaderHome: React.FC = () => {
    const [logo, updateLogo] = useState<LogoProps["logo"]>("");
    const [modalVisible, setModalVisibility] = useState<ModalVisibleProps["modalVisible"]>(false)

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
        <div className="header-home_wrapper">
            <Link to={"/"}><img className="site-logo-img" src={logo} alt="Netflix logo" /></Link>
            <MembersBar setModalVisibility={setModalVisibility}/>
            {modalVisible ? <LoginModal setModalVisibility={setModalVisibility}/> : null}
        </div>
    )
}

export default HeaderHome 
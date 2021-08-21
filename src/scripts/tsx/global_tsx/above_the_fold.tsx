import * as React from 'react';
import firebase from "./firebase_setup";

import { useState, useEffect, useCallback } from 'react';

type Props = {
    ATFData : {
        title: string,
        subtitle: string,
        imageURL: string,
        actionNote: string
    },
    setATFData: React.Dispatch<React.SetStateAction<{
        title: string;
        subtitle: string;
        imageURL: string;
        actionNote: string
    }>>
}

const AboveTheFold: React.FC = ()  => {
    const [ATFData, setATFData] = useState<Props["ATFData"]>({title: "", subtitle: "", imageURL: "", actionNote: ""})
    const ref = firebase.firestore().collection("ATF");
  
    const fetchAFTData = useCallback(() => {
        const data: firebase.firestore.DocumentData[] = [];
        ref.onSnapshot((snaps) => {
           snaps.forEach(snap => {data.push(snap.data())});
           setATFData({title: data[0].title, subtitle: data[0].subtitle, imageURL: data[0].imageURL, actionNote: data[0].actionNote});
         });          
    }, [ref])
    useEffect(() => {
        fetchAFTData()
    }, [fetchAFTData])
    return (
        <div className="above-the-fold-wrapper" >
            <img className="above-the-fold_cover-image" src={ATFData.imageURL} alt="movies list cover" />
            <div className="above-the-fold_info-wrapper">
            <div className="above-the-fold_info-container">
                <h1 className="above-the-fold_title">{ATFData.title}</h1>
                <h2 className="above-the-fold_subtitle">{ATFData.subtitle}</h2>
                <h3 className="above-the-fold_action-note">{ATFData.actionNote}</h3>
                </div>
            </div>
        </div>
    )
}

export default AboveTheFold
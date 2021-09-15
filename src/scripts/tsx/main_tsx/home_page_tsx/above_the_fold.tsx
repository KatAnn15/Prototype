import * as React from 'react';
import firebase from "../../global_tsx/firebase_setup";
import { GlobalContext } from '../../global_tsx/context';
import { Link } from 'react-router-dom';

import { useState, useEffect, useCallback, useContext } from 'react';

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
    const [ATFData, setATFData] = useState<Props["ATFData"]>({title: "", subtitle: "", imageURL: "", actionNote: ""});
    const context = useContext(GlobalContext);

    const ref = firebase.firestore().collection("ATF");
  
    const fetchAFTData = useCallback(() => {
        const data: firebase.firestore.DocumentData[] = [];
        ref.onSnapshot((snaps) => {
           snaps.forEach(snap => {data.push(snap.data())});
           setATFData({title: data[0].title, subtitle: data[0].subtitle, imageURL: data[0].imageURL, actionNote: data[0].actionNote});
         });          
    }, [ref])

    const setSubsctriptionStatus = () => {
        context.setSubscriptionStatus(true)
    }

    useEffect(() => {
        fetchAFTData()
    }, [fetchAFTData])

    return (
        <div className="above-the-fold-wrapper" >
            <img className="above-the-fold_cover-image" src={ATFData.imageURL} alt="movies list cover" />
            <div className="above-the-fold_info-wrapper">
            <div className="above-the-fold_info-container">
                <h1 className="above-the-fold_title">{ATFData.title}</h1>
                { context.loggedIn === true && context.subscribed ? <div className="above-the-fold_loggedIn__true_div">
                    <h2 className="above-the-fold_subtitle">Begin your journey</h2>
                    <button className="above-the-fold_action-button"><Link to="/movies"> Watch Now </Link></button>
                </div> :
                <div className="above-the-fold_loggedIn__false_div">
                <h2 className="above-the-fold_subtitle">{ATFData.subtitle}</h2>
                <h3 className="above-the-fold_action-note">{ATFData.actionNote}</h3>
                {context.subscribed ? null : <button className="above-the-fold_join-btn" onClick={setSubsctriptionStatus}>Subscribe</button>}
                </div> 
                }
                </div>
            </div>
        </div>
    )
}

export default AboveTheFold
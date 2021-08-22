import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import firebase from "../../../global_tsx/firebase_setup";
import FAQItem from "./faq-item"

interface FAQItemsTypes {
    faqItems: (JSX.Element | null)[],
    setFAQItems: React.Dispatch<React.SetStateAction<(JSX.Element | null)[]>>
}

const FAQList: React.FC = () => {
    const [faqItems, setFAQItems] = useState<FAQItemsTypes["faqItems"]>([null])
    const collection = firebase.firestore().collection("FAQ");

    const fetchFAQ = useCallback(() => {
        collection.onSnapshot(snaps => {
            let items: {item: JSX.Element, num: number}[] = [];
            snaps.forEach(snap => {
                const snapData = snap.data();
                const {question, answer, sort} = snapData;
                items.push({item: <FAQItem question={question} answer={answer}/>, num: sort})
            })
            items = items.sort( (a, b) => (a.num - b.num));
            const mapped = items.map(item => item.item)
            setFAQItems(mapped)
        })
    }, [collection])
    useEffect(() => {fetchFAQ()}, [fetchFAQ])
    return (
        <div className="faq-list_wrapper">
            <div className="faq-list_content-container">
                <h2 className="faq_title">Frequently Asked Questions</h2>
                <div className="faq-items_wrapper">{faqItems}</div>                
            </div>
        </div>
    )
}

export default FAQList
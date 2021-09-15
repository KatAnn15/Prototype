import * as React from 'react';
import {useState} from "react"

interface FAQItemProps {
    question: string,
    answer: string[]
}
interface DisplayTypes {
    display: ("none" | "block"),
    setDisplay: React.Dispatch<React.SetStateAction<"none" | "block">>
}

const FAQItem: React.FC<FAQItemProps> = ({question, answer}) => {
    const [display, setDisplay] = useState<DisplayTypes["display"]>("none");
    const style = {
        display: display
    }

    const openAnswer = () => {
        setDisplay(display === "none" ? "block" :  "none")
    }

    const answerHTML = answer.map((paragraph, i) => (<h3 className="faq_answer-body" id={`faq_answer-body__${i}`} key={i}>{paragraph}</h3>))
    
    return(
        <div className="faq-item_wrapper">
            <div className="faq_question_wrapper" onClick={openAnswer}>
                <h3 className="faq_question-body">{question}</h3>
                {display === "none" ? 
                <button className="faq_toggle-btn" >&#65291;</button> :
                 <button className="faq_toggle-btn" style={{fontSize: "22px", fontWeight: 900}}>&#10761;</button>}
            </div>
            <div className="faq_answer-wrapper" style={style}>
                {answerHTML}
            </div>
        </div>
    )
}

export default FAQItem
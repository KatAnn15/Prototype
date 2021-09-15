import * as React from 'react';
import {useState, useEffect, useCallback} from "react";
import {Item} from "./elements-list";
import PreviewItemWrapper from "./preview-item-wrapper"

interface PreviewItemProps {
    item: Item["item"]
}

interface BuilderPreviewProps {
    previewElements: (string | null),
    setPreviewElements: React.Dispatch<React.SetStateAction<string | null>>
}

interface PreviewHTMLProps {
    previewHTML: (null | PreviewItemProps["item"][]),
    setPreviewHTML: React.Dispatch<React.SetStateAction<null | PreviewItemProps["item"][]>>
}

const BuilderPreview: React.FC<BuilderPreviewProps> = ({previewElements, setPreviewElements}) => {
    const [previewHTML, setPreviewHTML] = useState<PreviewHTMLProps["previewHTML"]>(null)

    const setHTMLFromStorage = useCallback(() => {
        if (previewElements) {
            const storageJSON: {items: {element: PreviewItemProps["item"]}[]} = JSON.parse(previewElements);
            setPreviewHTML(storageJSON.items.map(element => element.element))
        }
    }, [previewElements])

    useEffect(() => setHTMLFromStorage(), [setHTMLFromStorage])
   
    return(
        <div className="builder-preview_wrapper">
            {previewHTML ? previewHTML.map((element, i) => {
            return <PreviewItemWrapper element={element} previewState={{previewElements, setPreviewElements}} key={i}/>
        }) : null}
        </div>
    )
}

export default BuilderPreview
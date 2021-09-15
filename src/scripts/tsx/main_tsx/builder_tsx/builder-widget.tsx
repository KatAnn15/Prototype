import * as React from 'react';
import { useState } from 'react';
import BuilderEditor from './builder-editor';
import BuilderPreview from './builder-preview';

interface PreviewElementsProps {
    previewElements: (string | null),
    setPreviewElements: React.Dispatch<React.SetStateAction<string | null>>
}

const BuilderWidget: React.FC = () => {
    const [previewElements, setPreviewElements] = useState<PreviewElementsProps["previewElements"]>("");

    const saveChangesToStorage = () => {
        if (previewElements) window.localStorage.setItem("previewItems", previewElements)
    }

    return (
        <div className="builder-widget_wrapper">
            <BuilderEditor previewElements={previewElements} setPreviewElements={setPreviewElements}/>
            <BuilderPreview previewElements={previewElements} setPreviewElements={setPreviewElements}/>
            <button className="save-changes_btn" onClick={saveChangesToStorage}>Save</button>
        </div>
    )
}

export default BuilderWidget
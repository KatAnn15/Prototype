import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { elementsList } from "./elements-list";
import {Item} from "./elements-list"

interface StorageProps {
    element: {
        element: Item["item"]
    }
}

interface EditorWidthProps {
    editorWidth: number,
    setEditorWidth: React.Dispatch<React.SetStateAction<number>>
}

interface BuilderEditorProps {
    previewElements: (string | null),
    setPreviewElements: React.Dispatch<React.SetStateAction<string | null>>
}

const initialWidth: number = 700;
const minWidth: number = 350;

const BuilderEditor: React.FC<BuilderEditorProps> = ({previewElements, setPreviewElements}) => {
    const [editorWidth, setEditorWidth] = useState<EditorWidthProps["editorWidth"]>(initialWidth);
    const currentStorageItems = window.localStorage.getItem("previewItems");

    const setEditorWidthHandler = (e: MouseEvent) => {
        let currentWidth = editorWidth;
        const handlerPosition = e.clientX;
        const  difference = editorWidth - handlerPosition - 100;
        currentWidth = editorWidth - difference;
        if (currentWidth >= minWidth && currentWidth <= initialWidth) {
            setEditorWidth(currentWidth)
        }
    }

    const initMove = () => {
        window.addEventListener("mousemove", setEditorWidthHandler);
        window.addEventListener("mouseup", () => {window.removeEventListener("mousemove", setEditorWidthHandler)})
    }

    const addToPreview = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item["item"]) => {
        const newStorageItem: StorageProps["element"] = ({element: item});
        let alteredStorageItems;
        if (previewElements) {
            const storageJSON: {items: StorageProps["element"][]} = JSON.parse(previewElements)
           const maxCount = Math.max(...storageJSON.items.map(item => item.element.count));
           if (maxCount > 0) {
           newStorageItem.element.count = maxCount + 1;
            alteredStorageItems = JSON.stringify({items: [...storageJSON.items, newStorageItem]});
           } else {
            alteredStorageItems = JSON.stringify({items: [ newStorageItem]});
           }
        } else {
            alteredStorageItems = JSON.stringify({items: [ newStorageItem]});
           }
           setPreviewElements(alteredStorageItems)
    }
    
    const initPreview  = useCallback(() => {
        if (currentStorageItems) {
            setPreviewElements(currentStorageItems)
        }
    }, [currentStorageItems, setPreviewElements])
    
    useEffect(() => initPreview(), [initPreview])

    return (
        <div className="builder-editor_wrapper" id="builder-editor_wrapper" style={{width: editorWidth + "px"}}>
            <button id="resize-handler" onMouseDown={initMove} ></button>
            <div className="editor-elements_container">
                {elementsList.map((element, i) => {
                    return <div className="elements-group_container" style={{backgroundColor: element.backgroundColor}} key={i}>
                        <h3 className="elements-group_title">{element.title}</h3>
                        <div className="element-group_elements-list">
                            {element.items.map((item, u) => {
                                const child = React.createElement(item.key, {style: item.style, className: item.class}, item.content);
                                return <div className={"element-item_wrapper"} key={u + "child"} onClick={(e) => addToPreview(e, item)}>{child}</div>
                             })}
                        </div>
                        </div>
                })}
                </div>
        </div>
    )
}   

export default BuilderEditor
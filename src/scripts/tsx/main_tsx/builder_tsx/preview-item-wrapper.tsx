import * as React from 'react';
import { Item } from './elements-list';
import PreviewEditPanel from "./preview_edit-panel";
import {useState} from "react";

interface PreviewItemWrapperProps {
    element: Item["item"],
    previewState: {
        previewElements: (string | null),
        setPreviewElements: React.Dispatch<React.SetStateAction<string | null>>}
}
interface PreviewItemProps {
    item: Item["item"]
}
interface EditPanelProps {
    panelDisplay: ("block" | "none"),
    setPanelDisplay: React.Dispatch<React.SetStateAction<"block" | "none">>
}

const PreviewItemWrapper: React.FC<PreviewItemWrapperProps> = ({element, previewState}) => {
    const {previewElements, setPreviewElements } = previewState;
    const [panelDisplay, setPanelDisplay] = useState<EditPanelProps["panelDisplay"]>("none")

    const deleteItem = () => {
        if (previewElements) {
            const storageJSON: {items: {element: PreviewItemProps["item"]}[]} = JSON.parse(previewElements);
            const filteredItems = storageJSON.items.filter(elementItem => elementItem.element.count !== element.count );
            setPreviewElements(JSON.stringify({items: filteredItems}))
        }
    }
    const repositionItem = (event: MouseEvent) => {
        if (previewElements) {
            const storageJSON: {items: {element: PreviewItemProps["item"]}[]} = JSON.parse(previewElements);
            
            const newItems = storageJSON.items.map(item => {
                if (item.element.id === element.id && item.element.count === element.count) {
                    const elementHtmlProto = document.getElementById("preview-item-" + element.id + `_${element.count}`)!;
                    console.log(elementHtmlProto)
                    const editorElement = document.getElementById("builder-editor_wrapper")!;
                    if (elementHtmlProto.scrollWidth > 0 && elementHtmlProto.scrollHeight > 0) {
                        const currentOffsetX = event.clientX - editorElement.offsetWidth - Number(element.style.width.replace("px", ""));
                        const currentOffsetY = event.clientY - elementHtmlProto.offsetHeight - Number(element.style.height.replace("px", ""));
                        item.element.offsetLeft = currentOffsetX;
                        item.element.offsetTop = currentOffsetY;
                    } else {
                        window.removeEventListener("mousemove", repositionItem)
                    }
                    return item
                } else {return item}
            })
            setPreviewElements(JSON.stringify({items: newItems}))
        } 
    }
    const repositionItemHandler = () => {
        window.addEventListener("mousemove", repositionItem);
        window.addEventListener("mouseup", () => {window.removeEventListener("mousemove", repositionItem)});
    }
    const handleEditPanelDisplay = () => {
        console.log(panelDisplay)
        if (panelDisplay === "none") {setPanelDisplay("block")} else { setPanelDisplay("none")}
    }
    const resizeElement = (event: MouseEvent) => {
        if (previewElements) {
            const storageJSON: {items: {element: PreviewItemProps["item"]}[]} = JSON.parse(previewElements);
            
            const newItems = storageJSON.items.map(item => {
                if (item.element.id === element.id && item.element.count === element.count) {
                    const currentElement = document.getElementById(`preview-item-${element.id}_${element.count}`)!;
                    const currentMouseX = event.clientX;
                    const currentMouseY = event.clientY;
                    item.element.style.width = currentMouseX - currentElement.offsetLeft - Number(item.element.style.width.replace("px", "")) + "px";
                    item.element.style.height = currentMouseY - currentElement.offsetTop - Number(item.element.style.height.replace("px", ""))+ "px";
                    console.log(currentMouseX, currentElement)
                    return item
                } else {return item}
            })
            setPreviewElements(JSON.stringify({items: newItems}))
        } 
    }

    const handleResize = () => {
        window.addEventListener("mousemove", resizeElement);
        window.addEventListener("mouseup", () => {window.removeEventListener("mousemove", resizeElement)});
    }
    return (
        <div className="preview-item_wrapper" id={`preview-item-${element.id}_${element.count}`} style={{top: element.offsetTop + "px", left: element.offsetLeft +"px"}}>
        <div className={`preview-item_wrapper`}  >
            {panelDisplay === "none" ? <button className="preview-item_edit-btn" onClick={handleEditPanelDisplay}><i className="far fa-edit fa-lg"></i></button>: <PreviewEditPanel previewState={previewState} element={element} closePanel={handleEditPanelDisplay}/>}
            {React.createElement(element.key, {style: element.style, className: element.class + "_preview", onMouseDown: repositionItemHandler}, element.content)}
            <button className="preview-item_delete-btn" onClick={deleteItem}><i className="fas fa-trash-alt fa-lg" ></i></button>
            <button className="preview-item_size-handler" onMouseDown={handleResize}></button>
        </div>
        </div>
    )
}

export default PreviewItemWrapper
import * as React from 'react';
import { Item } from './elements-list';

interface PreviewEditPanelProps {
    previewState: {
        previewElements: (string | null),
        setPreviewElements: React.Dispatch<React.SetStateAction<string | null>>,
    },
    element: Item["item"],
    closePanel: () => void
}
interface PreviewItemsProps {
    item: (Item["item"] | null),
}
interface EditPanelItemsProps {
    items : {
        wrapperClassName: string,
        inputClassName: string,
        titleClassName: string,
        inputType: string,
        min: number,
        max: number,
        value: string,
        title: string
    }[]
}

const PreviewEditPanel: React.FC<PreviewEditPanelProps> = ({element, previewState, closePanel}) => {
    const {previewElements, setPreviewElements } = previewState;
    const editPanelItems: EditPanelItemsProps["items"] = [
        {
            wrapperClassName: "border-panel_wrapper",
            inputClassName: "border_range",
            titleClassName: "border_title",
            inputType: "range",
            min: 1,
            max: 10,
            value: element.style.borderWidth,
            title: "Border width: "
        },
        {
            wrapperClassName: "bg-color_wrapper",
            inputClassName: "bg-color_range",
            titleClassName: "bg-color_title",
            inputType: "color",
            min: 0,
            max: 0,
            value: element.style.backgroundColor,
            title: "Background: "
        },
        {
            wrapperClassName: "border-color_wrapper",
            inputClassName: "border-color_range",
            titleClassName: "border-color_title",
            inputType: "color",
            min: 0,
            max: 0,
            value: element.style.borderColor,
            title: "Border color: "
        }
    ]

    const handleInputSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRange = event.target.classList[0];
        if (previewElements) {
            let updatedItems: ({element: PreviewItemsProps["item"]}[] | null) = null;
            const currentElementsJSON = JSON.parse(previewElements);
            const currentElements: {items: {element: Item["item"]}[]} = currentElementsJSON;
            switch (selectedRange) {
                case ("bg-color_range"):
                updatedItems = currentElements.items.map(item => {
                    if (element.id === item.element.id && element.count === item.element.count){ 
                     item.element.style.backgroundColor = event.target.value;
                    }
                     return item
                })
                break;
                case ("border_range"):
                updatedItems = currentElements.items.map(item => {
                    if (element.id === item.element.id && element.count === item.element.count) {
                        if (element.style.borderStyle !== "none") {
                            item.element.style.borderWidth = event.target.value + "px";
                        } else {
                            item.element.style.borderStyle = "solid";
                            item.element.style.borderColor = "white";
                            item.element.style.borderWidth = event.target.value + "px";
                        }
                    }
                     return item
                })
                break;
                case("border-color_range"):
                updatedItems = currentElements.items.map(item => {
                    if (element.id === item.element.id && element.count === item.element.count) {
                        if (element.style.borderStyle) {
                            item.element.style.borderColor =event.target.value;
                        } 
                    }
                     return item
                })
                break;
            }
            setPreviewElements(JSON.stringify({items: updatedItems}))
        }
    }

    const closeDiv = (event: MouseEvent) => {
        const elements = document.getElementsByClassName("preview-edit-panel_wrapper")!;
        const actualClickedElementClass = (event.target as HTMLElement).className;
       for (let i = 0; i < elements.length; i++) {
           if (!elements.item(i)?.innerHTML.includes(actualClickedElementClass)) {
               closePanel()
           }
       }
    }
    window.addEventListener("mouseup", closeDiv)

    return (
        <div className="preview-edit-panel_wrapper">
            {editPanelItems.map((item, i) => {
                return (
                    <div className={`edit-panel_item-wrapper ${item.wrapperClassName}`} key={i} >
                        <h5 className={item.titleClassName}>{item.title}  {item.value} </h5>
                        <input type={item.inputType} className={`${item.inputClassName} input-range`} min={item.min} max={item.max}  value={item.value} onChange={handleInputSelect}/>
                    </div>
                )
            })}
        </div>
    )
}
export default PreviewEditPanel
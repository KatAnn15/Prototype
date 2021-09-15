import * as React from 'react';
import {useState, useCallback, useEffect} from "react"

interface PaginationItemProps {
    pageNum: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number
}
const activeColor = "blue";

interface ColorProps {
    color: ("black"| typeof activeColor ),
    setColor: React.Dispatch<React.SetStateAction<"black" | typeof activeColor>>
}

const PaginationItem: React.FC<PaginationItemProps> = ({pageNum, setPage, page}) => {
    const [color, setColor] = useState<ColorProps["color"]>("black");

    const checkColor = useCallback(() => {
        if (pageNum === page) {
            setColor(activeColor)
        } else {
            setColor("black")
        }
    }, [page, pageNum])

    useEffect(() => {checkColor()}, [checkColor])
    
    return (
        <div className="pagination-item_wrapper">
            <button className="pagination-item_btn" onClick={() => setPage(pageNum)} style={{color: color, borderColor: color}}>{pageNum}</button>
        </div>
    )
}

export default PaginationItem 
import * as React from 'react';
import PaginationItem from "./pagination-item";
import {useState, useEffect, useCallback} from "react";

interface PaginationListProps {
    paginationList: (JSX.Element[] | null),
    setPaginationList: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>
}

interface PaginationWidgetProps {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number
}

const limit = 5;

const PaginationWidget: React.FC<PaginationWidgetProps> = ({setPage, page}) => {
    const [paginationList, setPaginationList] = useState<PaginationListProps["paginationList"]>(null);

    const setPages = useCallback(() => {
        const pagesArray = new Array(limit).fill(0).map((item, i) => item = i).map(item => <PaginationItem pageNum={item + 1} setPage={setPage}  page={page}/>);
        setPaginationList(pagesArray)
    }, [setPage, page]);

    useEffect(() => {setPages()}, [setPages])

    return (
        <div className="pagination-widget_wrapper">{paginationList}</div>
    )
}

export default PaginationWidget
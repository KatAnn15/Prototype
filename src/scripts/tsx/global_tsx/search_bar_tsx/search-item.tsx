import * as React from 'react';
import posterPlaceholder from "../../../../assets/images/header/Netflix_logo.webp"

interface SearchItemProps {
    title: string,
    poster_path: string
}
const posterBase = "https://image.tmdb.org/t/p/original";

const SearchItem: React.FC<SearchItemProps> = ({title, poster_path}) => {
    return (
        <div className="search-item_wrapper" style={{backgroundImage: poster_path ? `url(${posterBase + poster_path})`: `url(${posterPlaceholder})`}}>
            <h5 className="search-item_title">{title}</h5>
        </div>
    )
}

export default SearchItem
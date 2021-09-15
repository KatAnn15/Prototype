import * as React from 'react';
import { Link } from 'react-router-dom';

interface FilteredMovieItemProps {
    title: string,
    poster_path: string,
    id: number
}

const posterBase = "https://image.tmdb.org/t/p/original";

const FilteredMovieItem:React.FC<FilteredMovieItemProps> = ({title, poster_path, id}) => {
    return (
        <Link to={`/movies/${id}`}>
            <div className="filtered-movie_item_wrapper">
                <h3 className="filtered-movie_item_title">{title}</h3>
                <div className="filtered-movie_item_poster" style={{backgroundImage: `url(${posterBase + poster_path})`}}></div>
            </div>
        </Link>
    )
}

export default FilteredMovieItem
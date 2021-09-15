import * as React from 'react';
import {Link} from "react-router-dom";
import {key} from "../../global_tsx/context"

interface MovieItemProps{
    title: string,
    id: string,
    poster_path: string
}

const posterBase = "https://image.tmdb.org/t/p/original";

const MovieItem: React.FC<MovieItemProps> = ({title, id,  poster_path}) => {
    return(
        <Link to={`/movies/${id}`}>
        <div className="movie-item_wrapper" key={id.toString()}>
            <div className="movie-item_poster-container" style={{backgroundImage: `url(${posterBase}${poster_path}${key})`}}>
            </div>
            <h3 className="movie-item_title">{title}</h3>
        </div>
        </Link>
    )
}

export default MovieItem
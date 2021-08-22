import * as React from 'react';

interface MovieItemProps{
    title: string,
    id: string,
    poster_path: string
}

const posterBase = "https://image.tmdb.org/t/p/original";
const key = "?api_key=29ab4f75bb2db1deeb32771398e6c025"

const MovieItem: React.FC<MovieItemProps> = ({title, id,  poster_path}) => {
    return(
        <div className="movie-item_wrapper" key={id.toString()}>
            <div className="movie-item_poster-container" style={{backgroundImage: `url(${posterBase}${poster_path}${key})`}}>
            </div>
            <h3 className="movie-item_title">{title}</h3>
        </div>
    )
}

export default MovieItem
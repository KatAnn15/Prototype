import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import MovieItem from './movie-item';

interface MoviesListStateProps {
    movies: (null|JSX.Element)[],
    pushMovies: React.Dispatch<React.SetStateAction<(JSX.Element | null)[]>>
}
interface MoviesListProps{
    category: string
}
interface TransformStateProps {
    transform: number,
    setTransform: React.Dispatch<React.SetStateAction<number>>
}

const MoviesList: React.FC<MoviesListProps> = ({category}) => {
    const [movies, pushMovies] = useState<MoviesListStateProps["movies"]>([null]);
    const [transform, setTransform] = useState<TransformStateProps["transform"]>(40)

    const getMovies = useCallback(async() => {
        const popularMovies = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=29ab4f75bb2db1deeb32771398e6c025`);
        const moviesData = await popularMovies.json();
        const results: {title: string,id: string,poster_path: string}[] = moviesData.results;
       const moviesItems: JSX.Element[] = [];
       results.forEach(movie => {
           const {title,id,poster_path} = movie;
           moviesItems.push(<MovieItem title={title} id={id} poster_path={poster_path} key={id}/>)
       })
       pushMovies(moviesItems)
    }, [category])

    const slideList = (event:string) => {
        const limit = 100
        let count = transform;
        if (event === "forward") {
               count -= limit;
               setTransform(count)
        } else {
            count += limit;
            setTransform(count)
        }
    }
    
    useEffect(() => {getMovies()}, [getMovies])

    return (
        <div className="movies-list_wrapper">
            <h2 className="movies-page_subtitle">{category.toUpperCase()}</h2>
            <div className="movies-page_movies-list">
                <div className="movies-list_navigation movies-list_navigation__left">
                <button className="movies-list_nav-btn movies-list_nav-btn_left" onClick={(e) => slideList("back")}><span></span></button>
            </div>
            <div className="movies-list_movies-container" style={{transform : `translateX(${transform}px)`}}>
            {movies}
            </div>
            <div className="movies-list_navigation movies-list_navigation__right">
                <button className="movies-list_nav-btn movies-list_nav-btn_right" onClick={(e) => slideList("forward")}><span></span></button>
            </div>
            </div>            
        </div>
    )
}

export default MoviesList
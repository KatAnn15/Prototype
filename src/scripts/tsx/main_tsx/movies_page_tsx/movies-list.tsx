import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import MovieItem from './movie-item';
import {key} from "../../global_tsx/context"

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
interface DisplayBackStateProps {
    displayBack: string,
    setDisplayBack: React.Dispatch<React.SetStateAction<string>>
}
interface DisplayForwardStateProps {
    displayForward: string,
    setDisplayForward: React.Dispatch<React.SetStateAction<string>>
}

const innerWidth = window.innerWidth;
let  limit = 480;

const MoviesList: React.FC<MoviesListProps> = ({category}) => {
    const [movies, pushMovies] = useState<MoviesListStateProps["movies"]>([null]);
    const [transform, setTransform] = useState<TransformStateProps["transform"]>(0);
    const [displayBack, setDisplayBack] = useState<DisplayBackStateProps["displayBack"]>("none");
    const [displayForward, setDisplayForward] = useState<DisplayForwardStateProps["displayForward"]>("flex");

    const getMovies = useCallback(async() => {
        const popularMovies = await fetch(`https://api.themoviedb.org/3/movie/${category}${key}`);
        const moviesData = await popularMovies.json();
        const results: {title: string,id: string,poster_path: string}[] = moviesData.results;
        const moviesItems: JSX.Element[] = [];   

       results.forEach(movie => {
           const {title,id,poster_path} = movie;
           moviesItems.push(<MovieItem title={title} id={id} poster_path={poster_path} key={id}/>)
       })
       pushMovies(moviesItems);     

    }, [category])

    const slideList = (event:string) => {
        let count = transform;
        if (event === "forward") {     
            const element = document.getElementById(`movies-container_${category}`)!;
            const lastChild = element.lastElementChild!;
            const lastChildPosition = lastChild.getBoundingClientRect().right;
            count -= limit;
               setTransform(count);
               if (lastChildPosition < innerWidth + limit) {
                setDisplayForward("none");
            } else {
             setDisplayBack("flex")
            }
        } else {
            count += limit;
            setTransform(count);
            if (count === 0 || count > limit) {
                setDisplayBack("none");
            } else {
                setDisplayForward("flex")
            }
        }        
    }
    
    useEffect(() => {getMovies()}, [getMovies])

    return (
        <div className="movies-list_wrapper">
            <h2 className="movies-page_subtitle">{category.toUpperCase()}</h2>
            <div className="movies-page_movies-list">
                <div className="movies-list_navigation movies-list_navigation__left" style={{display: displayBack}}>
                <button className="movies-list_nav-btn movies-list_nav-btn_left" onClick={(e) => slideList("back")} ><span></span></button>
            </div>
            <div className="movies-list_movies-container" id={`movies-container_${category}`} style={{transform : `translateX(${transform}px)`}}>
            {movies}
            </div>
            <div className="movies-list_navigation movies-list_navigation__right" style={{display: displayForward}}>
                <button className="movies-list_nav-btn movies-list_nav-btn_right" onClick={(e) => slideList("forward")} ><span></span></button>
            </div>
            </div>            
        </div>
    )
}

export default MoviesList
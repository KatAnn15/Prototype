import * as React from 'react';
import HeaderGlobal from '../../global_tsx/header_tsx/header-global';
import MoviesList from './movies-list';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

interface MoviesListStateProps {
    moviesList: (JSX.Element | null)[],
    setMoviesList: React.Dispatch<React.SetStateAction<JSX.Element>>
}

const MoviesPage:React.FC = () => {
    const params = useParams();
    const [moviesList, setMoviesList] = useState<MoviesListStateProps["moviesList"]>([null]);

    const setAllMovies = useCallback(() => {
    const categories: string[] = Object.values(params);
    const category: string = categories[0]
    let listByCategories = [];

        if ( !category || category === "all") {
            const categoriesList = ["popular", "upcoming" , "now_playing"];
            listByCategories = categoriesList.map(categoryItem => (<MoviesList category={categoryItem} key={categoryItem}/>))
        } else {
            listByCategories.push(<MoviesList category={category} key={category}/>)
        }
        setMoviesList(listByCategories)
    }, [params])
    
 useEffect(() => {
  setAllMovies()
 }, [setAllMovies]) 
    return (
        <div className="movies-page_wrapper">
            <HeaderGlobal/>
            <h1 className="movies-page_title">Netflix choice</h1>
            {moviesList}
        </div>
    )
}

export default MoviesPage
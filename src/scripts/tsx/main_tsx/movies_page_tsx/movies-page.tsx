import * as React from 'react';
import HeaderGlobal from '../../global_tsx/header_tsx/header-global';
import FilterWidget from "./filter_widget_tsx/filter-widget";
import MoviesList from "./movies-list";
import { useState, useCallback, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {key} from "../../global_tsx/context";
import FilteredMovieItem from './filtered_movies_list_tsx/filtered-movie-item';
import PaginationWidget from "./pagination_tsx/pagination-widget"

interface FilterExpandedStateProps {
    filterExpanded: Boolean;
    setFilterStatus: React.Dispatch<React.SetStateAction<Boolean>>
}

interface MoviesListProps {
    moviesList: (JSX.Element[] | React.ReactElement |null),
    setMoviesList: React.Dispatch<React.SetStateAction<(null | JSX.Element[] | React.ReactElement)>>
}

interface PageProps {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const MoviesPage:React.FC = () => {
    const [filterExpanded, setFilterStatus] = useState<FilterExpandedStateProps["filterExpanded"]>(false);
    const [moviesList, setMoviesList] = useState<MoviesListProps["moviesList"]>(null);
    const [page, setPage] = useState<PageProps["page"]>(1);

    const location = useLocation();
    const search = location.search
      
    const setFiltersStatus = () => {
        filterExpanded ? setFilterStatus(false) : setFilterStatus(true)
    }

    const setMoviesListDeafult = useCallback(() => {
        if (search) {
            const currentParams = search.replace("?", "");
            const paramsArray = currentParams.split("&").map(splitee => splitee.split("="));
            let paramsDouble: {key: string, value: (string)[]}[] = paramsArray.map(param => ({key: param[0], value: param[1].toString().split("|")}));
            
            const allMovies: (Promise<any>|undefined)[] = paramsDouble.map(param => {
                switch(param.key) {
                    case "categories":
                        return new Promise ((resolve, reject) => {
                            const allCategoriesMovies = param.value.map(par => fetch("https://api.themoviedb.org/3/movie/" + par + key + "&page=" + page).then(resp => resp.json()).then(data => data.results));
                            Promise.all(allCategoriesMovies).then(resp => {
                                resolve([].concat.apply([], resp))
                            })
                        })
                    case "genres" :
                        return  fetch("https://api.themoviedb.org/3/discover/movie" + key + "&with_genres=" + param.value.join("|") + "&page=" + page).then(resp => resp.json()).then(data => data.results);
                    case "include_adult":
                        return fetch("https://api.themoviedb.org/3/discover/movie" + key + "&include_adult" + param.value.join("|") + "&page=" + page).then(resp => resp.json()).then(data => data.results);
                }
            })
            Promise.all(allMovies).then(response => {
                const allResults: {title: string, id: number, poster_path: string}[]  = [].concat.apply([], response);
                console.log("all results: ", allResults)
                const allIDs: number[] = allResults.map(result => result.id);
                const setIDs = [...new Set(allIDs)];
                const setResults: {title: string, id: number, poster_path: string}[] = setIDs.map(item=> allResults.filter(res => res.id === item)[0]);
                const moviesList = setResults.map((res, i) => <FilteredMovieItem title={res.title} id={res.id} poster_path={res.poster_path} key={i}/>);
                setMoviesList(<div className="filtered-movie-list_wrapper">{moviesList}</div>)
            })
        } else {
            const categories = ["upcoming", "top_rated"];
            const defaultList = categories.map((category, i) => <MoviesList category={category} key={"cat" + i}/>);
            setMoviesList(defaultList)
        }
    }, [search, page])
    
    useEffect(() => {setMoviesListDeafult()}, [setMoviesListDeafult])
 
    return (
        <div className="movies-page_wrapper">
            <HeaderGlobal/>
            <div className="filter-widget-space_wrapper">
                {filterExpanded ? <FilterWidget setFiltersStatus={setFiltersStatus}/> : <h3 className="filter-widget-space_title" onClick={setFiltersStatus} style={{top: "50px"}}>Discover More</h3>}
            </div>
            <h1 className="movies-page_title">Netflix choice</h1>
            <div className="movies-list_page-container">
                {moviesList}
            </div>
            {search ? <PaginationWidget setPage={setPage} page={page}/> : null}
        </div>
    )
}

export default MoviesPage
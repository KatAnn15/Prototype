import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {key} from "../../global_tsx/context";
import SearchItem from "./search-item"

interface OptionsProps {
    options: (JSX.Element[]|null ),
    setOptions: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>[]
}
interface DisplayProps {
    display:  ("grid" | "none")
}

const SearchBar: React.FC = () => {
    const [options, setOptions] = useState<OptionsProps["options"]>(null)
    const [display, setDisplay] = useState<DisplayProps["display"]>("none");
    const history = useHistory()

    const searchMovie = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        let target = e.currentTarget;
        if (target.value.length > 2) {
            const fetchedData = await fetch(`https://api.themoviedb.org/3/search/movie` + key + "&query=" + target.value + "&page=1").then(resp => resp.json());
            const items: {id: number, title: string, poster_path: string}[] = fetchedData.results;
            const moviesOptionslist = items.map((item) => (<Link to={"/movies/" + item.id} key={item.id}><SearchItem title={item.title} poster_path={item.poster_path}/></Link>))
            setOptions(moviesOptionslist);
           target.focus();
           setDisplay("grid")
        }
        if (target.value.trim() === ""){
            changeDisplay()
        }
    }
    const changeDisplay = () => {
        setDisplay("none")
    }
    useEffect(() => {
        history.listen((location, action) => { 
            if (action === "PUSH") {
                changeDisplay()
            }
        })
    }, [history])

    return (
        <div className="search-bar_wrapper" >
            <input className="search-bar_input-bar" list="movies-list" name="moviesSearch" placeholder="Search a movie..." autoComplete="off" onInput={searchMovie}/>
            <div className="search-options_wrapper" style={{display: display}}>
                {options}
            </div>
        </div>
    )
}

export default SearchBar
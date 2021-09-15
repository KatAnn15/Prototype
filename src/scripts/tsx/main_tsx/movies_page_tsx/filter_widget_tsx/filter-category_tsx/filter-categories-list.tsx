import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import FilterCategoryItem from "./filter-catgory-item";
import {key} from "../../../../global_tsx/context"

interface CatgoriesProps {
    categories: (JSX.Element[] | null[]),
    setCategories: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>
}

const FilterCategoriesList: React.FC = () => {
    const [categories, setCategories] = useState<CatgoriesProps["categories"]>([null]);

    const getGenres = async () => {
        const genresData: {genres: {name: string, id: number}[]} = await fetch("https://api.themoviedb.org/3/genre/movie/list" + key).then(resp => resp.json());
        const allGenresNames = genresData.genres.map(genre => ({lab: genre.name, val: genre.id.toString()}))
        return allGenresNames
    }

    const renderCategories = useCallback(async () => {
        const genres = await getGenres();

        const categoriesNamesList = [
            {label: "Categories", value: [{val: "top_rated", lab: "Top Rated"}, {val:"popular", lab: "Popular"}, {val:"upcoming", lab: "Upcoming"}, {val:"now_playing", lab: "Now Playing"}]},
            {label: "Genres", value: genres}, 
            {label:"Include Adult", value: [{lab: "Include", val: true}, {lab: "Exclude", val: false}]}
        ];
        const categoriesLists = categoriesNamesList.map((categoryItem, i) => (<FilterCategoryItem data={categoryItem} key={"cat" + i}/>));
        setCategories(categoriesLists)        
    }, []);

    useEffect(() => {renderCategories()}, [renderCategories]);

    return (
        <div className="filter-categories-list_wrapper">
            {categories}
        </div>
    )
}

export default FilterCategoriesList
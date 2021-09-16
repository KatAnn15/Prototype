import * as React from 'react';
import {useCallback, useState, useEffect} from "react";
import {key} from "../../../../global_tsx/context";
import SimilarItem from './similar_item';
import {Link} from "react-router-dom";

interface MovieItemSimilarProps {
    id: string
}

interface SimilarItemsProps {
    similarItems: ([] | JSX.Element[]),
    setSimilar: React.Dispatch<React.SetStateAction<([] | JSX.Element[])>>
}

const MovieItemSimilar:React.FC<MovieItemSimilarProps> = ({id}) => {
    const [similarItems, setSimilar] = useState<SimilarItemsProps["similarItems"]>([])

    const getSimilar = useCallback(async () => {
       const similarData = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar${key}`).then(resp => resp.json());
       const similarItems: ({poster_path: string, original_title: string, id: number})[]  = similarData.results;
       const similarElements = similarItems.map((item, i) => <Link to={"/movies/" + item.id} key={"simLink" + i}><SimilarItem data={item} key={"similar" + i}/></Link>);
       setSimilar(similarElements)
    }, [id])

    useEffect(() => {getSimilar()}, [getSimilar])

    return (
        <div className="movie-item-similar_wrapper">
            <h3 className="movie-item_similar_text">Discover More:</h3>
            <div className="movie-item_similar_container">
                {similarItems}
            </div>
        </div>
    )
}

export default MovieItemSimilar
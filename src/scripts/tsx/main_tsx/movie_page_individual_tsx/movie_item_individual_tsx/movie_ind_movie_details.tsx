import * as React from 'react';
import {useContext} from "react";
import {GlobalContext} from "../../../global_tsx/context";
import MovieItemVideo from './movie_item_video';
import netflixLogo from "../../../../../assets/images/header/Netflix_logo.webp"

interface MovieItemDetailsProps {
    movieData: ({id: number, adult: Boolean, genres: {id: number, name: string}[], original_title: string, overview: string, popularity: number, poster_path: string, release_date: string, revenue: number, status: string, tagline: string, vote_count: number}[])
}

const posterBase = "https://image.tmdb.org/t/p/original";

const MovieItemDetails: React.FC<MovieItemDetailsProps> = ({movieData}) => {
    const {id, adult, genres, original_title,overview,popularity,poster_path,release_date, revenue, status, tagline, vote_count } = movieData[0];
    const genresNames = genres.map(genre=> genre.name).join(", ");
    const context = useContext(GlobalContext)

    return (
        <div className="movie-item-details_wrapper">
                <div className="movie-item_poster" style={{backgroundImage: poster_path ? `url(${posterBase + poster_path})`: `url(${netflixLogo})`}}></div>
            <div className="movie-item_main-data movie-item_block">
                <div className="movie-item_audience-data movie-item_sub-block">
                    <h3 className="movie-item_audience-data_adult-status">{adult ? "Rated" : "General audience"}</h3>
                </div>
                <div className="movie-item_info movie-item_sub-block">
                    <h2 className="movie-item_info_title">{original_title}</h2>
                    <h3 className="movie-item_info_release-date">{release_date}</h3>
                    <h3 className="movie-item_info_overview">{overview}</h3>
                </div>
            </div>
            {context.subscribed ? 
            <div></div> : 
            <div className="join-now-banner">
                <div className="join-now_text">
                    <img className="join-now_logo" src="https://pngimg.com/uploads/netflix/netflix_PNG15.png" alt="netflix-logo"/>
                    <h3 className="join-now_subtitle">Watch all movies now.</h3>
                 </div>
                 <button className="join-now_action-btn">Join Now</button>
            </div>}
            <div className="movie-item_tagline-wrapper">
            <h3 className="movie-item_info_tagline">{tagline}</h3>
            </div>
            <div className="movie-item_additional-info movie-item_block">
                <h2 className="movie-item_additional-info_details">More Details</h2>
                <div className="movie-item_stats movie-item_sub-block">
                    <h3 className="movie-item_stats_popularity"> <span>Popularity: </span> <br/> {popularity}</h3>
                    <h3 className="movie-item_genres"><span>Genres:</span> <br/> {genresNames}</h3>
                    <h3 className="movie-item_stats_revenue"> <span>Revenue: </span> <br/>  {revenue}</h3>
                    <h3 className="movie-item_stats_vote-count"> <span>Voted:</span>  <br/>  {vote_count}</h3>
                    <h3 className="movie-item_stats_status"><span>Release status:</span> <br/>  {status}</h3>
                </div>
            </div>
            <MovieItemVideo id={id.toString()}/>
        </div>
    )
}

export default MovieItemDetails
import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import {key} from "../../../global_tsx/context";
import {isTablet} from "react-device-detect";

interface MovieItemVideoProps {
    id: string
}
interface VideoSourceProps {
    videos: (null | JSX.Element[]),
    setVideos: React.Dispatch<React.SetStateAction<(null |  JSX.Element[])>>
}

const MovieItemVideo: React.FC<MovieItemVideoProps> = ({id}) => {

    const [videos, setVideos] = useState<VideoSourceProps["videos"]>(null)

    const getVideo = useCallback(async () => {
        const videoData = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos` + key).then(resp => resp.json());
        if (videoData.results) {
            const allVideos: {key: number}[] = videoData.results;
            const videosElemets = allVideos.map((video, i) => (<iframe className="movie-item_video_container" style={{border: "none", margin: "5px"}} width={isTablet ? "370px" : "500px"} height="250px" src={`https://www.youtube.com/embed/${video.key}/`}   title="YouTube video player" key={"video" + i} ></iframe>))
            setVideos(videosElemets)
        }
    }, [id]);

    useEffect(() => {getVideo()}, [getVideo])

    return (
        <div className="movie-item-video_wrapper" style={{marginTop: "50px", display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
            {videos}
        </div>
    )
}

export default MovieItemVideo
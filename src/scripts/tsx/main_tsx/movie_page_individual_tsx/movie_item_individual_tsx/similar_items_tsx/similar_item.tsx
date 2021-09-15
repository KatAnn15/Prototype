import * as React from 'react';

interface SimilarItemProps {
    data: {poster_path: string, original_title: string}
}

const posterBase = "https://image.tmdb.org/t/p/original";

const SimilarItem: React.FC<SimilarItemProps> = ({data}) => {
    const {poster_path, original_title} = data;

    return (
        <div className="similar-item_wrapper">
            <div className="similar-item_poster" style={{backgroundImage: `url(${posterBase}${poster_path})`}}></div>
            <h3 className="similar-item_title">{original_title}</h3>
        </div>
    )
}

export default SimilarItem
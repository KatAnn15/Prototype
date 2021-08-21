import * as React from 'react';
interface GalleryItemProps {
    title: string,
    subtitle: string,
    mediaURL: string,
    mediaAlt: string
}

const ListGalleryItem: React.FC<GalleryItemProps> = ({title, subtitle, mediaURL, mediaAlt}) => {
    return (
        <div className="list-gallery-item_wrapper">
            <div className="list-gallery-item_info-container">
                <h2 className="list-gallery-item_title">{title}</h2>
                <h3 className="list-gallery-item_subtitle">{subtitle}</h3>
            </div>
            <div className="list-gallery-item_media-container">
                <img src={mediaURL} alt={mediaAlt} className="list-gallery-item_image" />
            </div>
        </div>
    )
}

export default ListGalleryItem
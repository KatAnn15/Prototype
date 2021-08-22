import * as React from 'react';
import AdditionalBox from "./additional-box";
import VideoCover from "./video-cover"

interface GalleryItemProps {
    title: string,
    subtitle: string,
    mediaURL: string,
    mediaAlt: string,
    additionalBox: Boolean,
    videoCover: string,
    downloadGif : string, imageURL: string, name :string
}

const ListGalleryItem: React.FC<GalleryItemProps> = ({title, subtitle, mediaURL, mediaAlt, additionalBox, videoCover, downloadGif, imageURL, name}) => {
    return (
        <div className="list-gallery-item_wrapper">
            <div className="list-gallery-item_content-wrapper">
                <div className="list-gallery-item_info-container">
                    <h2 className="list-gallery-item_title">{title}</h2>
                    <h3 className="list-gallery-item_subtitle">{subtitle}</h3>
                </div>
                <div className="list-gallery-item_media-container">
                {videoCover ? <VideoCover videoCover={videoCover}/> : null}
                    <img src={mediaURL} alt={mediaAlt} className="list-gallery-item_image" />
                    {additionalBox ? <AdditionalBox downloadGif={downloadGif} imageURL={imageURL} name={name}/> : null}
                </div>
            </div>
        </div>
    )
}

export default ListGalleryItem
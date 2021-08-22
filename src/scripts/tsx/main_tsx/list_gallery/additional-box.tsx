import * as React from 'react';

interface AdditionalBoxProps {
    downloadGif: string,
    name: string,
    imageURL: string
}

const AdditionalBox:React.FC<AdditionalBoxProps> = ({downloadGif, name, imageURL}) => {
    return (
        <div className="additional-box_wrapper">
            <img src={imageURL} alt="" className="additional-box_image" />
            <div className="additional-box_info-container">
                <h4 className="additional-box_info-container_name">{name}</h4>
                <h4 className="additional-box_info-container_downloading">Downloading</h4>
            </div>
            <img src={downloadGif} alt="" className="additional-box_gif" />
        </div>
    )
}

export default AdditionalBox
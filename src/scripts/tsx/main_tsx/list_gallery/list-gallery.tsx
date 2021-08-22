import * as React from 'react';
import ListGalleryItem from './list-gallery-item';
import firebase from "../../global_tsx/firebase_setup";
import { useCallback, useEffect, useState } from 'react';

interface ListGalleryProps {
    files: JSX.Element
}

const ListGallery: React.FC = () => {
    const ref = firebase.firestore();
    const [files, setFiles] = useState<(ListGalleryProps["files"]|null)[]>([null])
    const fetchListGalleryItems = useCallback(async() => {
        const files = await ref.collection("HomeListGallery");
        const allFiles: JSX.Element[] = [];
        files.onSnapshot(snaps => {
            snaps.forEach(snap => {
                const snapData = snap.data();
                const {title, subtitle, mediaURL, mediaAlt, additionalBox, videoCover, downloadGif, imageURL, name} = snapData;
                allFiles.push(<ListGalleryItem title={title} subtitle={subtitle} mediaURL={mediaURL} mediaAlt={mediaAlt} additionalBox={additionalBox} videoCover={videoCover} downloadGif={downloadGif} imageURL={imageURL} name={name}/>)
            })
            setFiles(allFiles)
        })
    }, [ref]);

useEffect(() => {
    fetchListGalleryItems()
}, [fetchListGalleryItems])

    return (
        <div className="list-gallery_wrapper">
            {files}
        </div>
    )
}

export default ListGallery
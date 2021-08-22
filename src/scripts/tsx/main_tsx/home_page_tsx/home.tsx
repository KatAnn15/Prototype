import * as React from 'react';
import AboveTheFold from './above_the_fold';
import ListGallery from '../list_gallery/list-gallery';
import FAQList from './faq_tsx/faq_list';
import HeaderHome from '../../global_tsx/header_tsx/header-home';

const HomePage: React.FC = () => {
    return (
        <div className="home-page-wrapper">
            <HeaderHome/>
            <AboveTheFold/>
             <ListGallery/>
             <FAQList />
        </div>
    )
}

export default HomePage
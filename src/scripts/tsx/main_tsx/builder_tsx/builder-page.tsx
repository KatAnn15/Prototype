import * as React from 'react';
import BuilderWidget from './builder-widget';
import HeaderGlobal from '../../global_tsx/header_tsx/header-global';

const BuilderPage: React.FC = () => {
    return (
        <div className="builder-page_wrapper">
            <HeaderGlobal/>
            <BuilderWidget/>
        </div>
    )
}

export default BuilderPage
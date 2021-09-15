import * as React from 'react';
import { Link, HashRouter } from 'react-router-dom';

const Footer:React.FC = () => {
    return (
        <div className="footer_wrapper">
            <HashRouter>
            <Link to="/builder">
            <h3 className="footer_title">Click to build your own widget!</h3>
            </Link>
            </HashRouter>
        </div>
    )
}

export default Footer
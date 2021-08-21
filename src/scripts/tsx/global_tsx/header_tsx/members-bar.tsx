import * as React from 'react';
import {GlobalContext} from "../context"

const MembersBar :React.FC = () => {
    const context = React.useContext(GlobalContext)
    const setUserStatus = () => {
        context.loggedIn ? context.setStatus(false) : context.setStatus(true)
    }
    return (
        <div className="members-bar_wrapper">
            <button className="members-bar_login-button" onClick={setUserStatus}>{context.loggedIn ? "Log Out" : "Log In"}</button>
        </div>
    )
}

export default MembersBar
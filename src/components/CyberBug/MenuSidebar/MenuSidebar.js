import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function MenuSidebar() {
    const { userLogin } = useSelector(state => state.UsersCyberBugReducer)

    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={userLogin.avatar} alt='avatar' />

                </div>
                <div className="account-info mt-2">
                    <small>{userLogin?.email.length > 15 ? userLogin?.email.slice(0,15).concat("...") : userLogin?.email }</small>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-cog " />
                    <NavLink to='/projectmanager' activeStyle={{ fontWeight: "bold", color: "purple" }} style={{ color: "black", marginLeft: "6px", textDecoration: "none" }}>Project Manager</NavLink>
                </div>
                {/* <div>
                    <i className="fa fa-credit-card " />
                    <NavLink to='/indexcyberbug' activeStyle={{ fontWeight: "bold", color: "purple" }} style={{ cursor: "no-drop", color: "black", marginLeft: "6px", textDecoration: "none" }}>Cyber Board</NavLink>
                </div> */}
                <div>
                    <i className="fa fa-cog " />
                    <NavLink to='/createproject' activeStyle={{ fontWeight: "bold", color: "purple" }} style={{ color: "black", marginLeft: "6px", textDecoration: "none" }}>Create Project</NavLink>
                </div>

                <div>
                    <i className="fa fa-cog " />
                    <NavLink to='/usermanager' activeStyle={{ fontWeight: "bold", color: "purple" }} style={{ color: "black", marginLeft: "6px", textDecoration: "none" }}>User Manager</NavLink>
                </div>
            </div>

        </div>

    )
}

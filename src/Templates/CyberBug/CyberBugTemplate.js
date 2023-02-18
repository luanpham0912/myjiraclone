import React from "react";
import { Route } from "react-router-dom";
import MenuSidebar from "../../components/CyberBug/MenuSidebar/MenuSidebar";
import ModalCyberBug from "../../components/CyberBug/Modal/ModalCyberBug";
import Sidebar from "../../components/CyberBug/Sidebar/Sidebar";


export const CyberBugTempate = (props) => {
    const {Component, ...restParam} = props
    return <Route {...restParam} render={(propsRoute)=>{
        return <div className="jira">
            <Sidebar/>
            <MenuSidebar/>
            <Component  {...propsRoute}/>
            <ModalCyberBug/>
        </div>
    }
    }/>
}



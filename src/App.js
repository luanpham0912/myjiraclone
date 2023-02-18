import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';

import LoginCyberBug from './pages/CyberBug/LoginCyberBug/LoginCyberBug';

import PageNotFound from './pages/PageNotFound/PageNotFound';

import { UserLoginTemplate } from './Templates/HomeTemplate/UserLoginTemplate';
import './index.css'
import { CyberBugTempate } from './Templates/CyberBug/CyberBugTemplate';
import indexCyberBug from './pages/CyberBug/indexCyberBug/indexCyberBug';
import CreateProject from './pages/CyberBug/ProjectCyberBug/CreateProject';
import ProjectManager from './pages/CyberBug/ProjectManager/ProjectManager';
import ModalCyberBug from './HOC/CyberbugHOC/ModalCyberBug';
import UserManager from './pages/CyberBug/UserManager/UserManager';
import UserEdit from './pages/CyberBug/UserManager/UserEdit';
import RegisterCyberBug from './pages/CyberBug/RegisterCyberBug/RegisterCyberBug';


function App() {

  return (
    <>
      {/* <Modal/> */}
      <ModalCyberBug/>
      <LoadingComponent />
      <Switch>
        <UserLoginTemplate exact path='/login' Component={LoginCyberBug} />
        <UserLoginTemplate exact path='/register' Component={RegisterCyberBug} />

        <CyberBugTempate exact path='/projectmanager/projectdetail/:projectId' Component={indexCyberBug}/>
        <CyberBugTempate exact path='/createproject' Component={CreateProject}/>
        <CyberBugTempate exact path='/projectmanager' Component={ProjectManager}/>
        <CyberBugTempate exact path='/usermanager' Component={UserManager}/>
        <CyberBugTempate exact path='/usermanager/edit/:id' Component={UserEdit}/>
        <UserLoginTemplate exact path='/' Component={LoginCyberBug}/>
        <Route path="*" component={PageNotFound}/>

      </Switch>
  
    </>
  );
}

export default App;

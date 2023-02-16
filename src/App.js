import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Header from './components/Home/Header/Header';
import Modal from './HOC/HOCModal/Modal';
import About from './pages/About/About';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import Contact from './pages/Contact/Contact';
import LoginCyberBug from './pages/CyberBug/LoginCyberBug/LoginCyberBug';
import DemoHOCMaldal from './pages/DemoHOCModal/DemoHOCMaldal';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import Todolist from './pages/Todolist/Todolist';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './Templates/HomeTemplate/UserLoginTemplate';
import './index.css'
import { CyberBugTempate } from './Templates/CyberBug/CyberBugTemplate';
import indexCyberBug from './pages/CyberBug/indexCyberBug/indexCyberBug';
import CreateProject from './pages/CyberBug/ProjectCyberBug/CreateProject';
import ProjectManager from './pages/CyberBug/ProjectManager/ProjectManager';
import ModalCyberBug from './HOC/CyberbugHOC/ModalCyberBug';
import UserManager from './pages/CyberBug/UserManager/UserManager';

function App() {

  return (
    <>
      {/* <Modal/> */}
      <ModalCyberBug/>
      <LoadingComponent />
      <Switch>
        
        {/* <Route exact path='/home' component={Home} /> */}
        {/* <Route exact path='/home' render={(propsRoute) =>{
              return  <> 
                 <Header />
                  <Home/>
                 </> 
        }} /> */}
        {/* <HomeTemplate exact path='/home' Component={Home} /> */}
        <UserLoginTemplate exact path='/login' Component={LoginCyberBug} />
        <CyberBugTempate exact path='/indexcyberbug/:projectId' Component={indexCyberBug}/>
        <CyberBugTempate exact path='/createproject' Component={CreateProject}/>
        <CyberBugTempate exact path='/projectmanager' Component={ProjectManager}/>
        {/* <CyberBugTempate exact path='/usermanager' Component={UserManager}/> */}

      
        <UserLoginTemplate exact path='/' Component={LoginCyberBug}/>
        <Route path="*" component={PageNotFound}/>

      </Switch>
  
    </>
  );
}

export default App;

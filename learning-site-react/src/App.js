import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Home_Loggedin from './react-components/Home_loggedin';
import Home_Guest from './react-components/Home';
import Home_Admin from  './react-components/Home_admin';
// import Header from './react-components/Header'; Not in use yet
import Course from './react-components/Course';
import SkillMainpage from "./react-components/SkillMainPage";
import SkillNavigation from "./react-components/SkillNavigation";
import AddSkill from "./react-components/AddSkill";
import LoginPage from "./react-components/LoginPage";
import CreateCourse from "./react-components/CreateCourse";
import CourseMainPage from "./react-components/CourseMainPage";
import CourseNavigation from "./react-components/CourselNavigation";
import SkillPageForAdmin from "./react-components/SkillPageForAdmin";
import RemoveCourse from "./react-components/RemoveCourse";
import RemoveSkill from "./react-components/RemoveSkill";
import CoursePageForAdmin from "./react-components/CoursePageForAdmin";
import Dashboard from "./react-components/Dashboard/dashboard";
import Profile from "./react-components/Dashboard/Profile";
import Enrolled from "./react-components/Dashboard/enrolled";
import SignUp from "./react-components/SignUp/SignUp";

class App extends React.Component {

    state ={

    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch classname={'routerSwitch'}> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                        { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                        <Route exact path='/enrolled' render={() =>
                            (<Enrolled appState={this.state}/>)}/>
                        <Route exact path='/profile' render={() =>
                            (<Profile appState={this.state}/>)}/>
                        <Route exact path='/dashboard' render={() =>
                            (<Dashboard appState={this.state}/>)}/>
                        <Route exact path='/loggedin' render={() =>
                            (<Home_Loggedin appState={this.state}/>)}/>
                        <Route exact path='/admin/addCourse' render={() =>
                            (<CreateCourse appState={this.state}/>)}/>
                        <Route exact path='/admin/addSkill' render={() =>
                            (<AddSkill appState={this.state}/>)}/>
                        <Route exact path='/admin/removeCourse' render={() =>
                            (<RemoveCourse appState={this.state}/>)}/>
                        <Route exact path='/admin/removeSkill' render={() =>
                            (<RemoveSkill appState={this.state}/>)}/>
                        <Route exact path='/admin/allSkill' render={() =>
                            (<SkillPageForAdmin appState={this.state}/>)}/>
                        <Route exact path='/admin/allCourse' render={() =>
                            (<CoursePageForAdmin appState={this.state}/>)}/>
                        <Route exact path='/skill' render={() =>
                            (<SkillNavigation appState={this.state}/>)}/>
                        <Route exact path='/course' render={() =>
                            (<CourseNavigation appState={this.state}/>)}/>
                        <Route exact path='/' render={() =>
                            (<LoginPage appState={this.state}/>)}/>
                        <Route exact path='/signup' render={() =>
                            (<SignUp appState={this.state}/>)}/>
                        <Route path="/course/:courseid" component={CourseMainPage}/>
                        <Route path="/skill/:skillid" component={SkillMainpage}/>
                        <Route path="/dashboard/:userid" component={Dashboard}/>
                        <Route exact path='/addSkill' render={() =>
                            (<AddSkill appState={this.state}/>)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Home_Loggedin from './react-components/Home_loggedin';
// import Header from './react-components/Header'; Not in use yet
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
import SignUp from "./react-components/SignUp/SignUp";
import ModifySkillPageForAdmin from "./react-components/ModifySkillPageForAdmin";
import ModifyCoursePageForAdmin from "./react-components/ModifyCoursePageForAdmin";
import {checkSession} from "./actions/user";
import EnrolledContent from "./react-components/Dashboard/enrolled";
import AccountProfileDetails from "./react-components/Dashboard/accountDetails";
import ProfileContent from "./react-components/Dashboard/Profile"

class App extends React.Component {

    componentDidMount() {
        checkSession(this); // sees if a user is logged in
    }

    state = {
        currentUser: null
    }


    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <BrowserRouter>
                    <Switch classname={'routerSwitch'}> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                        <Route
                            exact path={["/", "/login", "/dashboard"] /* any of these URLs are accepted. */ }
                            render={ props => (
                                <div className="app">
                                    { /* Different componenets rendered depending on if someone is logged in. */}
                                    {!currentUser ? <LoginPage {...props} app={this} /> : ((currentUser.currentUser.userType === "Admin") ? (<CoursePageForAdmin {...props} app={this}/>) : <Dashboard {...props} app={this} />)}
                                </div>                   // ... spread operator - provides all of the props in the props object

                            )}
                        />
                        <Route exact path='/enrolled' render={ props => (
                            <div>
                                {currentUser ? <EnrolledContent {...props} app={this}/> :
                                    <LoginPage {...props} app={this}/>}
                            </div>
                            )}
                        />
                        <Route exact path='/profile' render={ props => (
                            <div>
                                {currentUser ? <ProfileContent {...props} app={this}/> :
                                    <LoginPage {...props} app={this}/>}
                            </div>
                            )}
                        />
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
                        <Route path="/modify/skill/:skillid" component={ModifySkillPageForAdmin}/>
                        <Route path="/modify/course/:courseid" component={ModifyCoursePageForAdmin}/>
                        <Route path="/dashboard/:userid" component={Dashboard}/>
                        <Route path="/enrolled/:userid" component={EnrolledContent}/>
                        <Route path="/profile/:userId" component={AccountProfileDetails}/>
                        <Route exact path='/addSkill' render={() =>
                            (<AddSkill appState={this.state}/>)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

// Should this be a data class?
// Add a display student class?


import React from "react";
import Header from "./../Header";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SkillInCourse from "./../SkillInCourse"
import TextBoxGenerator from "../TextBoxGenerator";
import {Grid} from "@material-ui/core";
import Input from "../Input";
import { useHistory } from 'react-router-dom';
import NewButton from "./../Button";

import "./style.css";

class CourseNavigation extends React.Component {
    state = {}; // Changed type to array



    render() {

        const {
            skillID
        } = this.props;

        return (
            <div>
                <Header/>
                <span>This should be a dropdown menu or search box. But there is not
                a way to reformat a string yet.</span><br/>
                <div className="center_bottom">
                    <div className="buttons">
                        <NewButton buttonName = "course 1" link = "./../course/1"/>
                        <NewButton buttonName = "course 2" link = "./../course/2"/>
                        <NewButton buttonName = "course 3" link = "./../course/3"/>
                        <NewButton buttonName = "Go back to User" link = "./../loggedin"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseNavigation;
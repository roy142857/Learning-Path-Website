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

class SkillNavigation extends React.Component {
    state = {}; // Changed type to array



    render() {

        const {
            skillID, urlTemp = `./../skill/${skillID}`
        } = this.props;

        return (
            <div>
                <Header/>
                <span>This should be a dropdown menu or search box. But there is not
                a way to reformat a string yet.</span><br/>
                <div className="center_bottom">
                    <NewButton buttonName = "Skill 1" link = "./../skill/1"/>
                    <NewButton buttonName = "Skill 2" link = "./../skill/2"/>
                    <NewButton buttonName = "Skill 3" link = "./../skill/3"/>
                    <NewButton buttonName = "Go back to User" link = "./../user"/>
                </div>
            </div>
        );
    }
}

export default SkillNavigation;
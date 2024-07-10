// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Skill from "../Skill";
import SkillInCourse from "./../SkillInCourse"
import TextBoxGenerator from "../TextBoxGenerator";
import {Grid} from "@material-ui/core";
import Input from "../Input";
import NewButton from "./../Button";

import "./style.css";

class SkillMainPage extends React.Component {
    state = {
        }; // Change type to array?



    render(){
        const {skillid, match, location} = this.props;
        const true_skillid = parseInt(this.props.skillid || this.props.match.params.skillid);
    return (
        <div>
            <Header></Header>
            <Skill skillID = {true_skillid} />
            <Link to={"./../skill"}>
                { /* Using the global state variable from App.js */}
                <NewButton classname={'ButtonMiddle'}
                    buttonName = "Back To All Skills Page"
                />
            </Link>
        </div>
    );
}}

export default SkillMainPage;
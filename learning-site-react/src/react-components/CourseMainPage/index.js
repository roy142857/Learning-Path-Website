// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Course from "../Course";
import Skill from "../Skill";
import SkillInCourse from "./../SkillInCourse"
import TextBoxGenerator from "../TextBoxGenerator";
import {Grid} from "@material-ui/core";
import Input from "../Input";
import NewButton from "./../Button";

import "./style.css";

class CourseMainPage extends React.Component {
    state = {
        }; // Change type to array?



    render(){
        const {courseid, match, location} = this.props;
        const true_courseid = parseInt(this.props.courseid || this.props.match.params.courseid);
    return (
        <div>
            <Header></Header>
            <Course courseID = {true_courseid} />
        </div>
    );
}}

export default CourseMainPage;
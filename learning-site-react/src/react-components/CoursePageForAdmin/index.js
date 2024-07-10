import React from "react";
import Header from "./../Header";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Skill from "../Skill";
import SkillCardGenerator from "../SkillCardGenerator";

import "./style.css";
import CourseCardGenerator from "../CourseCardGenerator";
import AdminMenu from "../AdminMenu";

class CoursePageForAdmin extends React.Component {
    render(){
        const courseID = Skill.getAllSkillIDs();
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div>
                    {courseID.map(id => (
                        <div className="coursecard">
                            <Link to={`./../course/${id}`}>
                                <CourseCardGenerator courseID={id} /></Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }}

export default CoursePageForAdmin;
import React from "react";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";

import "./style.css";
import Button from "@material-ui/core/Button";

/* Component for the Home page */
class AdminMenu extends React.Component {
    render() {
        return (
            <div className="menubar">
                <ul id="bar">
                    <li><b>Admin Dashboard</b></li>
                    <li><a href="/admin/allCourse">Courses</a></li>
                    <li><a href="/admin/allSkill">Skills</a></li>
                    <li><a href="/admin/addCourse">Add Course</a></li>
                    <li><a href="/admin/addSkill">Add Skill</a></li>
                    <li><a href="/admin/removeCourse">Remove Course</a></li>
                    <li><a href="/admin/removeSkill">Remove Skill</a></li>
                    <li><a href="/">Log Out</a></li>
                </ul>
            </div>
        );
    }
}

export default AdminMenu;
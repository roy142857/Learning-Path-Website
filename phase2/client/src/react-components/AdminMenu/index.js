import React from "react";
// import Button from "@material-ui/core/Button";
import "./style.css";
import {logout} from "./../../actions/user"

/* Component for the Home page */
class AdminMenu extends React.Component {

    render() {
        const { app } = this.props
        return (
            <div className="menubar">
                <ul id="bar">
                    <li><a href="/admin/allCourse">Admin Dashboard</a></li>
                    <li><a href="/admin/allCourse">Courses</a></li>
                    <li><a href="/admin/allSkill">Skills</a></li>
                    <li><a href="/admin/addCourse">Add Course</a></li>
                    <li><a href="/admin/addSkill">Add Skill</a></li>
                    <li><a onClick={() => logout(app)} href="/login">Log Out</a></li>
                </ul>
            </div>
        );
    }
}

export default AdminMenu;
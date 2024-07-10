import React from "react";
import Header from "./../Header";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./style.css";
import CourseCardGenerator from "../CourseCardGenerator";
import AdminMenu from "../AdminMenu";
import Course from "../Course";

class RemoveCourse extends React.Component {
    render() {
        const courseID = Course.getAllCourseIDs();
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div>
                    {courseID.map(id => (
                        <div className="removecard">
                            <Link to={`./../course/${id}`}>
                                <CourseCardGenerator courseID={id}/></Link>
                            <Button id="removecoursebtn" className="btn">Remove</Button>
                        </div>))
                    }
                </div>
            </div>
        );
    }
}

export default RemoveCourse;
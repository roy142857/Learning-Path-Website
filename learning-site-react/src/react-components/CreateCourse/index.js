import React from "react";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";

import "./style.css";
import Button from "@material-ui/core/Button";
import AdminMenu from "../AdminMenu";

/* Page for add new course */
class CreateCourse extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div className="centerbox">
                    <h1>Add a new course</h1>
                    <label className="label"><b>Course Name</b></label><br/>
                    <input type="text" id="name" placeholder="Enter Course Name"></input><br/>
                    <label className="label"><b>Description</b></label><br/>
                    <textarea id="description" placeholder="Enter Course Description"></textarea><br/>
                    <div id="addcoursebtn">
                        <Button className="btn" id="add">Add Course</Button>
                    </div>
                    <div id="cancelcoursebtn">
                        <Link to={"/admin"}>
                            <Button className="btn" id="cancel">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
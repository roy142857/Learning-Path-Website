import React from "react";
import "./style.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextBoxGenerator from "../TextBoxGenerator";

// This will only render one course at a time, use this multiple times for a full tree.
class CourseInSkills extends React.Component {

    state = {

    }

    render() {
        const { course } = this.props;

        return (
            <div>
                <TextBoxGenerator title={course.name} content={course.description} maxWidth='200px'
                                  bgcolor='#cfe8fc'/>
            </div>
        );
    }
}

export default CourseInSkills;
// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Course from "../Course";

import "./style.css";
import {getSingleCourse} from "../../actions/course";

async function getCourse(trueId, component) {
    const temp = await getSingleCourse(trueId, component)
    return temp
}

class CourseMainPage extends React.Component {
    state = {
        courseList: [],
        message: {type: "", body: ""},
        courseListGot: false
    }; // Change type to array?

    render() {
        const {courseid, match, location} = this.props;
        const trueId = this.props.match.params.courseid;
        if (this.state.courseListGot === false) {
            getCourse(trueId, this)
            this.setState({courseListGot: true})
        }
        return (
            <div>
                <div>{this.state.courseList.map(course => (
                    <Course course={course}/>
                ))}</div>
            </div>
        );
    }
}

export default CourseMainPage;
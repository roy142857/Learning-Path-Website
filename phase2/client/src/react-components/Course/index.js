// Should this be a data class?
// Add a display student class?


import React from "react"

import "./style.css";
import NavBar from "./NavBar";
import NewButton from "./../Button";
import Header from "../Header"

// function MenuIcon() {
//     return null;
// }

class Course extends React.Component {
    state = {}; // Change type to array?


    render() {
        const {course} = this.props;
        return (
            <div>
                <Header></Header>
                <div className="courseOverview">
                    <h1> {course.name} </h1>
                </div>
                <NavBar
                    video_src={course.videoLink}
                    course_info={course}
                    related_skills={course.skillRelated}
                />

                { /* Using the global state variable from App.js */}
                {/*<div className="buttons">*/}
                {/*    <NewButton buttonName="Back to user page" link="./../loggedin"/>*/}
                {/*    <NewButton buttonName="Back to all courses page" link="./../course"/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Course;
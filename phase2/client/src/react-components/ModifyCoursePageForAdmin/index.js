// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
import "./style.css";
import AdminMenu from "../AdminMenu";
import {getSingleCourse, modifyCourse} from "../../actions/course";
import Button from "@material-ui/core/Button";

async function getCourse(trueId, component) {
    const temp = await getSingleCourse(trueId, component)
    return temp
}

class ModifyCoursePageForAdmin extends React.Component {
    state = {
        courseList: [],
        message: {type: "", body: ""},
        courseListGot: false
    }; // Change type to array?


    render() {
        const dashboard = this
        const {courseId, match, location} = this.props;
        const trueId = this.props.match.params.courseid
        if (this.state.courseListGot === false) {
            // console.log("Getting")
            getCourse(trueId, this)
            this.setState({courseListGot: true})
        }
        return (
            <div>
                <Header/>
                <AdminMenu/>
                <div>{this.state.courseList.map(course => (
                    <div className="container-center-horizontal">
                    <form id="modify_skill_form" onSubmit={(e) => {
                        e.preventDefault();
                        modifyCourse(course._id, e.target, dashboard);
                    }}>
                        <div className="centerbox">
                            <h1>Change Course with id: {course._id}</h1>
                            <label className="label"><b>Course Name</b></label><br/>
                            <input type="text" id="name" placeholder={course.name} name="name"/><br/>
                            <label className="label"><b>Learning Time (MUST BE NUMBER)</b></label><br/>
                            <input type="text" id="name" placeholder={course.suggestedLearningTime}
                                   name="suggestedLearningTime"/><br/>
                            <label className="label"><b>Overview</b></label><br/>
                            <input id="description" placeholder={course.overview} name="overview"/><br/>
                            <label className="label"><b>Description</b></label><br/>
                            <input id="description" placeholder={course.description} name="description"/><br/>
                            <label className="label"><b>Video Link</b></label><br/>
                            <input type="text" id="name" placeholder={course.videoLink} name="videoLink"/><br/>
                            <label className="label"><b>Image Link</b></label><br/>
                            <input type="text" id="name" placeholder={course.image} name="image"/><br/>
                            <div id="addcoursebtn">
                                <Button className="btn" id="add" type="submit">Change Course</Button>
                            </div>
                        </div>
                    </form>
                    </div>
                ))}</div>

                <label className={`addSkill_message--${dashboard.state.message.type}`}>
                    <b>{dashboard.state.message.body}</b>
                </label>
                <br/>
            </div>
        );
    }
}

export default ModifyCoursePageForAdmin;
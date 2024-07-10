import React from "react";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";
import "./style.css";
import AdminMenu from "../AdminMenu";
import {addCourse} from "../../actions/course"
import {default as logo} from "../../img/add_course.png";
import InputTitle from "../AddSkill/InputTitle";
import InputTitleLarge from "../AddSkill/InputTitleLarge";
import NewButton from "../Button";

/* Page for add new course */
class CreateCourse extends React.Component {
    state = {
        message: {type: "", body: ""}
    };

    render() {
        const dashboard = this
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div className="container-center-horizontal">
                    <div className="add-course-page">
                        <img
                            className="addcourselogo"
                            src={logo}
                        />
                        <form id="add_course_form" onSubmit={(e) => {
                            e.preventDefault();
                            addCourse(e.target, dashboard);
                        }}>
                            <div className="addcourse">
                                <div className="addcourseframe">
                                    <div className="addcourseblock">
                                        <InputTitle
                                            title="Course Name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter Course Name"
                                            className="inputline"
                                            inputId="coursename"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                    <div className="addcourseblock">
                                        <InputTitle
                                            title="Learning Time (Hour)"
                                            name="suggestedLearningTime"
                                            type="number"
                                            placeholder="Enter Learning Time"
                                            className="inputline"
                                            inputId="learningtime"
                                            labelclass="inputLabel"
                                            step="0.1"
                                        />
                                    </div>
                                    <div className="addcourseblock">
                                        <InputTitleLarge
                                            title="Overview"
                                            name="overview"
                                            placeholder="Enter Course Overview"
                                            className="inputbox"
                                            inputId="courseoverview"
                                            type="text"
                                            labelclass="inputArea"
                                        />
                                    </div>
                                    <div className="addcourseblock">
                                        <InputTitleLarge
                                            title="Description"
                                            name="description"
                                            placeholder="Enter Course Description"
                                            className="inputbox"
                                            inputId="coursedescription"
                                            type="text"
                                            labelclass="inputArea"
                                        />
                                    </div>
                                    <div className="addcourseblock">
                                        <InputTitle
                                            title="Video Link"
                                            name="videoLink"
                                            type="text"
                                            placeholder="Enter Video Link"
                                            className="inputline"
                                            inputId="coursevideolink"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                    <div className="addcourseblock">
                                        <InputTitle
                                            title="Image Link"
                                            name="image"
                                            type="text"
                                            placeholder="Enter Image Link"
                                            className="inputline"
                                            inputId="courseimagelink"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="statusDiv">
                                <label className="status">
                                    <b>{dashboard.state.message.body}</b>
                                </label>
                            </div>
                            <div className="add_course_btn">
                                <NewButton buttonName="Add Course" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
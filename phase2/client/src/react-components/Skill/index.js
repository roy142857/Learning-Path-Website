// Should this be a data class?
// Add a display student class?

import React from "react";
import "./style.css";
import NavBar from "./NavBar";
import NewButton from "../Button";

class Skill extends React.Component {
    state = {}; // Change type to array?

    render() {
        const {skill} = this.props;
        return (
            <div>
                <div className="skillOverview">
                    <h1> {skill.name} </h1>
                </div>
                <NavBar
                    video_src={skill.videoLink}
                    skill_info={skill}
                    related_courses={skill.courseRelated}
                />

                { /* Using the global state variable from App.js */}
                {/*<div className="buttons">*/}
                {/*    <NewButton buttonName="Back to user page" link="./../loggedin"/>*/}
                {/*    <NewButton buttonName="Back to all skills page" link="./../skill"/>*/}
                {/*</div>*/}
            </div>
        );
    }

}

export default Skill;
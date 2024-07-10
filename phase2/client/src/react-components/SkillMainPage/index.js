// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
import {Link} from "react-router-dom";
import Skill from "../Skill";
import NewButton from "./../Button";

import "./style.css";
import {getSingleSkill} from "../../actions/skill";

async function getSkill(trueId, component) {
    const temp = await getSingleSkill(trueId, component)
    return temp
}

class SkillMainPage extends React.Component {
    state = {
        skillList: [],
        message: {type: "", body: ""},
        skillListGot: false
    }; // Change type to array?


    render() {
        const {skillid, match, location} = this.props;
        const trueId = this.props.match.params.skillid
        console.log(trueId)
        if (this.state.skillListGot === false) {
            // console.log("Getting")
            getSkill(trueId, this)
            this.setState({skillListGot: true})
        }
        return (
            <div>
                <Header></Header>
                <div>{this.state.skillList.map(skill => (
                    <Skill skill={skill}/>
                ))}</div>
                <Link to={"./../skill"}>
                    { /* Using the global state variable from App.js */}
                    <NewButton classname={'ButtonMiddle'}
                               buttonName="Back To All Skills Page"
                    />
                </Link>
            </div>
        );
    }
}

export default SkillMainPage;
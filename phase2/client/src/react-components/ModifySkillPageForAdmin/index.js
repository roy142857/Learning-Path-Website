// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
// import Skill from "../Skill";
import "./style.css";
import AdminMenu from "../AdminMenu";
import {getSingleSkill, modifySkill} from "../../actions/skill";
import {Button} from '@material-ui/core';
import {default as logo} from "../../img/logo.svg";

async function getSkill(trueId, component) {
    const temp = await getSingleSkill(trueId, component)
    return temp
}

class ModifySkillPageForAdmin extends React.Component {
    state = {
        skillList: [],
        message: {type: "", body: ""},
        skillListGot: false
    }; // Change type to array?


    render() {
        const dashboard = this
        const {skillid, match, location} = this.props;
        const trueId = this.props.match.params.skillid
        if (this.state.skillListGot === false) {
            // console.log("Getting")
            getSkill(trueId, this)
            this.setState({skillListGot: true})
        }
        return (
            <div>
                <Header/>
                <AdminMenu/>
                <div>{this.state.skillList.map(skill => (
                    <div className="container-center-horizontal">
                        <div className="add-skill-page">
                            <img
                                className="logo"
                                src={logo}
                            />
                            <form id="modify_skill_form" onSubmit={(e) => {
                                e.preventDefault();
                                modifySkill(skill._id, e.target, dashboard);
                            }}>
                                <div className="centerbox">
                                    <h1>Change skill</h1>
                                    <label className="label"><b>Skill Name</b></label><br/>
                                    <input type="text" id="name" placeholder={skill.name} name="name"/><br/>
                                    <label className="label"><b>Overview</b></label><br/>
                                    <input id="description" placeholder={skill.overview} name="overview"/><br/>
                                    <label className="label"><b>Description</b></label><br/>
                                    <input id="description" placeholder={skill.description} name="description"/><br/>
                                    <label className="label"><b>Video Link</b></label><br/>
                                    <input type="text" id="name" placeholder={skill.videoLink} name="videoLink"/><br/>
                                    <label className="label"><b>Image Link</b></label><br/>
                                    <input type="text" id="name" placeholder={skill.image} name="image"/><br/>
                                    <div id="addskillbtn">
                                        <Button className="btn" id="add" type="submit">Change Skill</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
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

export default ModifySkillPageForAdmin;
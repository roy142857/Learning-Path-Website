// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
// import Skill from "../Skill";
import SkillCardGenerator from "../SkillCardGenerator";
import "./style.css";
import AdminMenu from "../AdminMenu";
import {uid} from "react-uid";
import {getSkills} from "../../actions/skill";
import Grid from '@material-ui/core/Grid';

class SkillPageForAdmin extends React.Component {
    state = {
        skillList: [],
        message: {type: "", body: ""},
        skillListGot: false
    }; // Change type to array?


    render() {
        // const skillIDS = Skill.getAllSkillIDs();
        const {dashboard} = this
        // getSkills(this)
        if (this.state.skillListGot === false) {
            // console.log("Getting")
            getSkills(this)
            this.setState({skillListGot: true})
        }
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div className="skills">
                    <Grid container spacing={1}>
                        {this.state.skillList.map(skill => (
                            <Grid item xs={6} md={3}>
                                <SkillCardGenerator
                                    key={uid(
                                        skill
                                    )}
                                    skill={skill}
                                    dashboard={dashboard}
                                    skillList={this}
                                    remove={true}
                                    modify={true}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default SkillPageForAdmin;
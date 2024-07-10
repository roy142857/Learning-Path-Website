// Should this be a data class?
// Add a display student class?


import React from "react";
import Header from "./../Header";
import NewButton from "./../Button";
import "./style.css";
import SkillCardGenerator from "../SkillCardGenerator";
import {uid} from "react-uid";
import {getSkills} from "../../actions/skill";
import Grid from '@material-ui/core/Grid';

class SkillNavigation extends React.Component {
    state = {
        skillList: [],
        message: {type: "", body: ""},
        skillListGot: false
    }; // Change type to array?


    render() {

        const {dashboard} = this
        // getSkills(this)
        if (this.state.skillListGot === false) {
            // console.log("Getting")
            getSkills(this)
            this.setState({skillListGot: true})
        }

        return (
            <div>
                <Header/>
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
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default SkillNavigation;
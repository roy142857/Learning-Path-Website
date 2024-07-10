// Should this be a data class?
// Add a display student class?


import React from "react";
import Header from "./../Header";
import NewButton from "./../Button";
import CourseCardGenerator  from "../CourseCardGenerator";
import {uid} from "react-uid";
import {getCourses} from "../../actions/course";
import Grid from '@material-ui/core/Grid';

import "./style.css";
import {getSkills} from "../../actions/skill";
import SkillCardGenerator from "../SkillCardGenerator";

class CourseNavigation extends React.Component {
    state = {
        courseList: [],
        message: {type: "", body: ""},
        courseListGot: false
    }; // Change type to array?


    render() {

        const {dashboard} = this
        // getSkills(this)
        if (this.state.courseListGot === false) {
            // console.log("Getting")
            getCourses(this)
            this.setState({courseListGot: true})
        }
        return (
            <div>
                <Header/>
                <div className="courses">
                    <Grid container spacing={1}>
                        {this.state.courseList.map(course => (
                            <Grid item xs={6} md={3}>
                                <CourseCardGenerator
                                    key={uid(
                                        course
                                    )}
                                    course={course}
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

export default CourseNavigation;
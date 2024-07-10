import React from "react";
import Header from "./../Header";

import "./style.css";
import CourseCardGenerator from "../CourseCardGenerator";
import AdminMenu from "../AdminMenu";
import {getCourses} from "../../actions/course";
import {Grid} from "@material-ui/core";
import {uid} from "react-uid";

class CoursePageForAdmin extends React.Component {
    state = {
        courseList: [],
        message: {type: "", body: ""},
        courseListGot: false
    }; // Change type to array?
    render() {
        const {dashboard, app} = this.props
        if (this.state.courseListGot === false) {
            getCourses(this)
            this.setState({courseListGot: true})
        }
        return (
            <div>
                <Header></Header>
                <AdminMenu app={app}></AdminMenu>
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
                                    courseList={this}
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

export default CoursePageForAdmin;
// Should this be a data class?
// Add a display student class?


import React from "react"
import Header from "./../Header"
import {Link} from "react-router-dom"
import SkillInCourse from "./../SkillInCourse"
import YoutubeFrame from "../YoutubeFrame";

import "./style.css";
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, Toolbar, Typography, Button, AppBar} from "@material-ui/core";
import NavTabs from "./NavBar";
import NavBar from "./NavBar";
import SkillCardGenerator from "../SkillCardGenerator";
import Skill from "./../Skill"
import NewButton from "./../Button";

// function MenuIcon() {
//     return null;
// }

class Course extends React.Component {
    static state = {
        allCourses: [{
            courseName: "Machine Learning",
            courseId: 1,
            courseImage: require("../../computer_science.jpeg").default,
            courseOverview: "Machine learning (ML) is a set of techniques that allow computers to learn from data and " +
                "experience, rather than requiring humans to specify the desired behaviour by hand.",

            courseDescription: "Machine learning (ML) is a set of techniques that allow computers to learn from data and " +
                "experience, rather than requiring humans to specify the desired behaviour by hand. ML has become increasingly " +
                "central both in AI as an academic field, and in industry. This course provides a broad introduction to some " +
                "of the most commonly used ML algorithms. We start with nearest neighbors, the canonical nonparametric model. " +
                "We then turn to parametric models: linear regression, logistic regression, softmax regression, and neural " +
                "networks. We then move on to unsupervised learning, focusing in particular on probabilistic models, but also " +
                "principal components analysis and K-means. Finally, we cover the basics of reinforcement learning.",
            video_src: "https://www.youtube.com/embed/lMk5AGz88g4",
            skillRelated: [
                {skillId: 1},
                {skillId: 3}
            ]
        }, {
            courseName: "Algorithm Analysis",
            courseId: 2,
            courseImage: require("../../algorithms.png").default,
            courseOverview: "Introduction to abstraction and rigour. Informal introduction to logical notation and reasoning.",
            courseDescription: "Introduction to abstraction and rigour. Informal introduction to logical notation and " +
                "reasoning. Understanding, using and developing precise expressions of mathematical ideas, including " +
                "definitions and theorems. Structuring proofs to improve presentation and comprehension. General " +
                "problem-solving techniques. Running time analysis of iterative programs. Formal definition of Big-Oh. " +
                "Diagonalization, the Halting Problem, and some reductions. Unified approaches to programming and theoretical problems.",
            video_src: "https://www.youtube.com/embed/SRWrQMwGYsQ",
            skillRelated: [
                {skillId: 1},
                {skillId: 2}
            ]
        }, {
            courseName: "Intro to Computer Science",
            courseId: 3,
            courseImage: require("../../computer_science.jpeg").default,
            courseOverview: "Abstract data types and data structures for implementing them. Linked data structures. " +
                "Encapsulation and information-hiding. Object-oriented programming.",
            courseDescription: "Abstract data types and data structures for implementing them. Linked data structures. " +
                "Encapsulation and information-hiding. Object-oriented programming. Specifications. Analyzing the efficiency " +
                "of programs. Recursion. This course assumes programming experience as provided by CSC108H1. Students who " +
                "already have this background may consult the Computer Science Undergraduate Office for advice about skipping " +
                "CSC108H1. Practical (P) sections consist of supervised work in the computing laboratory. These sections are " +
                "offered when facilities are available, and attendance is required. NOTE: Students may go to their college to " +
                "drop down from CSC148H1 to CSC108H1. See above for the drop down deadline.",
            video_src: "https://www.youtube.com/embed/Sh6lK57Cuk4",
            skillRelated: [
                {skillId: 1},
                {skillId: 2},
                {skillId: 3}
            ]
        }]

    }; // Change type to array?


    static searchCourseFromID(id) {
        for (let item in this.state.allCourses) {
            if (this.state.allCourses[item].courseId === id) {
                return this.state.allCourses[item];
            }
        }
        return null;
    }

    static searchCourseFromName(Name) {
        for (let item in this.state.allSkills) {
            if (this.state.allCourses[item].courseName === Name) {
                return this.state.allCourses[item];
            }
        }
        return null;
    }

    static getNewCourseId() {
        let temp = 1;
        for (let item in this.state.allCourses) {
            if (this.state.allCourses[item].courseId > temp) {
                temp = this.state.allCourses[item].courseId;
            }
        }
        return temp + 1;
    }

    static addCourse(courseImage, courseName, courseDescription, video_link) {
        const newID = this.getNewCourseId();
        this.state.allCourses.push({
            courseName: courseName,
            courseId: newID,
            courseImage: {
                backgroundImage: courseImage
            },
            courseDescription: courseDescription,
            video_src: video_link,
            skillRelated: []
        })
        return;
    }

    static getAllCourseIDs() {
        const ids = [];
        for (let item in this.state.allCourses) {
            ids.push(this.state.allCourses[item].courseId);
        }
        return ids;
    }

    render() {
        const {courseName, courseID, courseImage, CourseDescription, course_url, skillRelated} = this.props
        const item = this.constructor.searchCourseFromID(this.props.courseID) || this.constructor.searchCourseFromName(this.props.courseName);
        console.log(item);
        // item.skillRelated.map(skill => (console.log(`./../course/${skill.skillId}`)))
        if (item == null) {
            return (
                <div>There is no this course yet.</div>
            )
        }
        return (
            <div>
                <div className="courseOverview">
                    <h1> {item.courseName} </h1>
                </div>
                <NavBar
                    video_src={item.video_src}
                    course_info={item.courseDescription}
                    related_skills={item.skillRelated}
                />

                    { /* Using the global state variable from App.js */}
                <div className="buttons">
                    <NewButton buttonName = "Back to user page" link = "./../loggedin"/>
                    <NewButton buttonName = "Back to all courses page" link = "./../course"/>
                </div>
            </div>
        );
    }
}

export default Course;
// Should this be a data class?
// Add a display student class?

import React from "react";
import TextBoxGenerator from "../TextBoxGenerator";
import "./style.css";
import CourseCardGenerator from "./../CourseCardGenerator";
import CustomizedTreeView from "../TreeView";

class Skill extends React.Component {
    static state = {
        allSkills: [{
            skillId: 1,
            skillName: 'Skill test 1',
            skillDescription: 'Description test 1',
            courses: [{courseId: 1}, {courseId: 2}, {courseId: 3}],
            innerimage: require("../../image1.jpeg").default,
        }, {
            skillId: 2,
            skillName: 'Skill test 2',
            skillDescription: 'Description test 2',
            courses: [{courseId: 2}, {courseId: 3}],
            innerimage: require("../../image2.jpeg").default,
        }, {
            skillId: 3, skillName: 'Skill test 3',
            skillDescription: 'Description test 3',
            courses: [{courseId: 1}, {courseId: 3}],
            innerimage: require("../../image3.jpeg").default,
        }]
    }; // Change type to array?

    static searchSkillFromID(id) {
        for (let item in this.state.allSkills) {
            if (this.state.allSkills[item].skillId === id) {
                return this.state.allSkills[item];
            }
        }
        return null;
    }

    static searchSkillFromName(Name) {
        for (let item in this.state.allSkills) {
            if (this.state.allSkills[item].skillName === Name) {
                return this.state.allSkills[item];
            }
        }
        return null;
    }

    static getNewSkillId(){
        let temp = 1;
        for (let item in this.state.allSkills) {
            if (this.state.allSkills[item].skillId > temp) {
                temp = this.state.allSkills[item].skillId;
            }
        }
        return temp + 1;
    }

    static addSkill(skillName, skillDescription){
        const newID = this.getNewSkillId();
        console.log(`New skill with id ${newID} added.`)
        this.state.allSkills.push({skillId: newID, skillName: skillName,
        skillDescription: skillDescription, courses: []})
        console.log(this.state.allSkills);
        // this.setState({allSkills: allSkills})
    }

    static getAllSkillIDs() {
        const ids = [];
        for (let item in this.state.allSkills) {
            ids.push(this.state.allSkills[item].skillId);
        }
        return ids;
    }

    render() {

        const {skillName, skillID} = this.props;
        const item = this.constructor.searchSkillFromName(this.props.skillName) || this.constructor.searchSkillFromID(this.props.skillID);
        if (item == null){
            console.log(this.constructor.state.allSkills);
            return (
                <div>There is no this skill yet.</div>
            )
        }
        return (
            <div>
                <TextBoxGenerator title={`${item.skillId}: ${item.skillName}`} content={item.skillDescription}
                                  maxWidth='300px'/>
                <div className="courseCards">
                    {item.courses.map(course => (
                        <CourseCardGenerator courseID={course.courseId}/>
                    ))}
                </div>
                <CustomizedTreeView classname={'TreeLeft'} courses={item.courses}/>
            </div>
        );
    }

}

export default Skill;
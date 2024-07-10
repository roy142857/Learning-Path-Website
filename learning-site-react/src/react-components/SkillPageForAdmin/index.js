// This is the class which present the skill info
// In this, it will call the skill, which return the info about the skills
// All data is also in skill

import React from "react";
import Header from "./../Header";
import { Link } from "react-router-dom";
import Skill from "../Skill";
import SkillCardGenerator from "../SkillCardGenerator";
import "./style.css";
import AdminMenu from "../AdminMenu";

class SkillPageForAdmin extends React.Component {
    state = {
        }; // Change type to array?



    render(){
        const skillIDS = Skill.getAllSkillIDs();
    return (
        <div>
            <Header></Header>
            <AdminMenu></AdminMenu>
            <div>
                {skillIDS.map(id => (
                    <div className="card">
                        <Link to={`./../skill/${id}`}>
                            <SkillCardGenerator skillID={id} skill_link = {`./../skill/${id}`} innerimage = {require(`../../image${id}.jpeg`).default}/> </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}}

export default SkillPageForAdmin;
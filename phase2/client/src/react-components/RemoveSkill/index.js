import React from "react";
import Header from "./../Header";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Skill from "../Skill";
import SkillCardGenerator from "../SkillCardGenerator";

import "./style.css";
import AdminMenu from "../AdminMenu";

class RemoveSkill extends React.Component {
    state = {}; // Change type to array?


    render() {
        const skillIDS = Skill.getAllSkillIDs();
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
                <div>
                    {skillIDS.map(id => (
                        <div className="removeskill">
                            <Link to={`./../skill/${id}`}>
                                <SkillCardGenerator skillID={id} skill_link={`./../skill/${id}`}
                                                    innerimage={require(`../../image${id}.jpeg`).default}/> </Link>
                            <Button id="removeskillbtn" className="btn">Remove</Button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default RemoveSkill;
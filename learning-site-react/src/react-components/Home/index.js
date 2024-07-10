import React from "react";
import Header from "./../Header";
import { Link } from "react-router-dom";
import "./style.css";
import SkillCardGenerator from "../SkillCardGenerator";
import Skill from "./../Skill";
import NewButton from "./../Button";

/* Component for the Home page */
class Home_Guest extends React.Component {
    render() {
        const skillIDs = Skill.getAllSkillIDs();
        return (
            <div>
                <Header/>
                <div className="skillCards">
                    <SkillCardGenerator
                        style = {{ paddingRight: '10px'}}
                        skillID={skillIDs[1]}
                        skill_link = {`./../skill/${skillIDs[1]}`}
                        innerimage = {require('../../image1.jpeg').default}/>
                    <SkillCardGenerator
                        style = {{ paddingRight: '10px'}}
                        skillID={skillIDs[2]}
                        skill_link = {`./../skill/${skillIDs[2]}`}
                        innerimage = {require('../../image2.jpeg').default}/>
                </div>
                <div className="center_bottom">
                    <Link to={"./../loginPage"}>
                        { /* Using the global state variable from App.js */}
                        <NewButton buttonName = "Login"/>
                    </Link>
                    {/*<Link to={"./../loggedin"}>*/}
                    {/*    { /* Using the global state variable from App.js *!/*/}
                    {/*    <Button className = "btn">User</Button>*/}
                    {/*</Link>*/}
                    {/*<br/>*/}
                    {/*<Link to={"./../admin"}>*/}
                    {/*    { /* Using the global state variable from App.js *!/*/}
                    {/*    <Button className = "btn">Admin</Button>*/}
                    {/*</Link>*/}
                </div>
            </div>
        );
    }
}

export default Home_Guest;
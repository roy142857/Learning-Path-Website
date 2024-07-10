import React from "react";
import {Link} from "react-router-dom";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";
import Skill from "./../Skill";
import "./style.css";
import Button from "@material-ui/core/Button";
import AdminMenu from "../AdminMenu";

/* Page for add new course */
class AddSkill extends React.Component {

    state = {
        skillName: '', skillDescription: ''
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('Something Changed.')
        this.setState({
            [name]: value // [name] sets the object property name to the value of the `name` variable.
        });
    };

    handleClick = event => {
        console.log('Clicked')
        Skill.addSkill(this.state.skillName, this.state.skillDescription);
    }

    render() {
        return (
            <div>
                <Header/>
                <AdminMenu/>
                <div className="centerbox">
                    <h1>Add a new skill</h1>
                    <label className="label"><b>Skill Name</b></label><br/>
                    <input type="text" id="name" placeholder="Enter Skill Name" value={this.state.skillName} onChange={this.handleInputChange}/><br/>
                    <label className="label"><b>Description</b></label><br/>
                    <textarea id="description" placeholder="Enter Skill Description" value={this.state.skillDescription} onChange={this.handleInputChange}/><br/>
                    <div id="addskillbtn">
                        <Button className="btn" id="add" onClick={this.handleClick}>Add Skill</Button>
                    </div>
                    <div id="cancelskillbtn">
                        <Link to={"/admin"}>
                            <Button className="btn" id="cancel">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSkill;
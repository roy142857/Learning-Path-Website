import React from "react";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";
import "./style.css";
import AdminMenu from "../AdminMenu";
import {addSkill} from "../../actions/skill";
import InputTitle from "./InputTitle";
import InputTitleLarge from "./InputTitleLarge";
import {default as logo} from "./../../img/add_skill.png";
import NewButton from "../Button";

/* Page for add new course */
class AddSkill extends React.Component {

    state = {
        message: {type: "", body: ""}
    };

    render() {
        const dashboard = this
        return (
            <div>
                <Header/>
                <AdminMenu/>
                <div className="container-center-horizontal">
                    <div className="add-skill-page">
                        <img
                            className="addskilllogo"
                            src={logo}
                        />
                        <form id="add_skill_form" onSubmit={(e) => {
                            e.preventDefault();
                            addSkill(e.target, dashboard);
                        }}>
                            <div className="addSkill">
                                <div className="addskillframe">
                                    <div className="addskillblock">
                                        <InputTitle
                                            title="Skill Name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter Skill Name"
                                            className="inputline"
                                            inputId="skillname"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                    <div className="addskillblock">
                                        <InputTitleLarge
                                            title="Overview"
                                            name="overview"
                                            placeholder="Enter Skill Overview"
                                            className="inputbox"
                                            inputId="skilloverview"
                                            type="text"
                                            labelclass="inputArea"
                                        />
                                    </div>
                                    <div className="addskillblock">
                                        <InputTitleLarge
                                            title="Description"
                                            name="description"
                                            placeholder="Enter Skill Description"
                                            className="inputbox"
                                            inputId="skilldescription"
                                            type="text"
                                            labelclass="inputArea"
                                        />
                                    </div>
                                    <div className="addskillblock">
                                        <InputTitle
                                            title="Video Link"
                                            name="videoLink"
                                            type="text"
                                            placeholder="Enter Video Link"
                                            className="inputline"
                                            inputId="skillvideolink"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                    <div className="addskillblock">
                                        <InputTitle
                                            title="Image Link"
                                            name="image"
                                            type="text"
                                            placeholder="Enter Image Link"
                                            className="inputline"
                                            inputId="skillimagelink"
                                            labelclass="inputLabel"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="statusDiv">
                                <label className="status">
                                    <b>{dashboard.state.message.body}</b>
                                </label>
                            </div>
                            <div className="add_skill_btn">
                                <NewButton buttonName="Add Skill" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSkill;
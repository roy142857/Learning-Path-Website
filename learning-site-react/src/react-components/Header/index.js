import React from "react";
import "./style.css";
import logo from './../../logo.png';
import TextBoxGenerator from "../TextBoxGenerator";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchBoxGenerator from "../SearchBoxGenerator";


class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <SearchBoxGenerator />
                <img src={logo} className="Applogo"/>
                <Link to={"./../"}>SkillSite</Link> <small>Team 48</small>
            </div>
        );
    }
}

export default Header;
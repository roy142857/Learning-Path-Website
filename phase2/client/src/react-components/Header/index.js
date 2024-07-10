import React from "react";
import "./style.css";
import {Link} from "react-router-dom";


class Header extends React.Component {
    render() {
        const logo = require('../../img/logo.svg').default
        return (
            <div className="Header">
                <Link to={"./../"}>
                    <img src={logo} alt="logo" className="Applogo"/>
                </Link>
            </div>
        );
    }
}

export default Header;
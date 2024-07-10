import React from "react";
// import Button from "@material-ui/core/Button";
import Header from "./../Header";

import "./style.css";
import AdminMenu from "../AdminMenu";

/* Component for the Home page */
class Home_Admin extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <AdminMenu></AdminMenu>
            </div>
        );
    }
}

export default Home_Admin;
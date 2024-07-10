import React, { Component } from 'react';
import './style.css';
import Header from "./../Header";
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import NewButton from "./../Button";

class LoginPage extends Component {

    render() {

        return (
            <div className="Login">
                <Header/>
                <div style={{padding: "10%"}}>
                    <Grid item xl={3} lg={3} md={8} s={12} xs={12} className="loginForm">
                        <TextField
                            name={"User Name"}
                            label={"User Name"}
                            defaultValue={""}
                            className="input"
                            margin="normal"
                            onChange={null}
                            // onChange={e => updateLoginForm(this, e.target)}
                        />
                        <TextField
                            name={"Password"}
                            label={"Password"}
                            type={"Password"}
                            defaultValue={""}
                            className="input"
                            margin="normal"
                            onChange={null}
                            // onChange={e => updateLoginForm(this, e.target)}
                        />
                    </Grid>
                </div>
                <div className="buttons">
                    <NewButton buttonName = "Login as user" link = "./../dashboard"/>
                    <NewButton buttonName = "Login as admin" link = "./../admin/allCourse"/>
                    <NewButton buttonName = "Sign Up" link = "./../signup"/>
                    {/*<NewButton*/}
                    {/*    buttonName = "Login Actual"*/}
                    {/*    onClick={() => login(this, app)}*/}
                    {/*/>*/}
                </div>
            </div>
        );
    }
}

export default LoginPage;
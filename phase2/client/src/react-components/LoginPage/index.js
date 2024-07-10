import React, { Component } from 'react';
import './style.css';
import Header from "./../Header";
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import NewButton from "./../Button";
import {login} from "../../actions/user"
import {updateLoginForm} from '../../actions/user'

class LoginPage extends Component {
    state = {
        email: "",
        password: ""
    }

    constructor(props) {
        super(props);
        this.props.history.push("/login");
    }
    render() {
        const { app } = this.props
        let bt;
        if (app.state.currentUser === null){
            bt =
                <div className="btn_div">
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            {/*<NewButton buttonName = "User Login" type = "submit" link = {`./../dashboard/${app.state.currentUser._id}`}/>*/}
                        </Grid>
                        <Grid item xs={1}>
                            <NewButton buttonName = "Admin Login" link = "./../admin/allCourse"/>
                        </Grid>
                        <Grid item xs={2}>
                            <NewButton buttonName = "Sign Up" link = "./../signup"/>
                        </Grid>
                        <Grid item xs={1}>
                            <NewButton buttonName = "Login" type = "submit"/>
                        </Grid>
                    </Grid>
                </div>
        }
        else if (app.state.currentUser.userType === "Admin"){
            bt = <NewButton buttonName = "Login ADMIN" link = "./../admin/allCourse"/>
        }else{
            bt = <NewButton buttonName = "Login Success USER" link = {`./../dashboard/${app.state.currentUser._id}`}/>
        }
        return (
            <div className="Login">
                <Header/>
                <form id="login_form" onSubmit={(e) => {
                    e.preventDefault();
                    login(e.target, app)
                }}>
                <div style={{padding: "10%"}}>
                    <Grid item xl={2} lg={2} md={4} s={5} xs={5} className="loginForm">
                        <TextField
                            name={"email"}
                            label={"Enter Email Address"}
                            defaultValue={""}
                            className="input"
                            margin="normal"
                            onChange={null}
                            fullWidth
                        />
                        <TextField
                            name={"password"}
                            label={"Enter Password"}
                            type={"Password"}
                            defaultValue={""}
                            className="input"
                            margin="normal"
                            onChange={null}
                            fullWidth
                        />
                    </Grid>
                </div>
                <div>
                    {bt}
                </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;
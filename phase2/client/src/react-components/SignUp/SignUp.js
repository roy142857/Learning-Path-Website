import React from 'react';
import "./style.css"
import "./font-color.css"
import InputTitle from "./InputTitle";
import InputTitleLong from "./InputTitleLong";
import InputTitleLarge from "./InputTitleLarge";
import NewButton from "../Button";
import {adduser} from "../../actions/user";


class SignUp extends React.Component {
    state = {
        message: {type: "", body: ""}
    }

    render() {
        const logo = require('./../../img/logo.svg').default
        const dashboard = this
        return (
            <div className="container-center-horizontal">
                <div className="sign-up-page screen">
                    <img
                        className="logo"
                        src={logo}
                    />
                    <form id="sign_up_form" className="frame-5" onSubmit={(e) => {
                        e.preventDefault();
                        adduser(e.target, dashboard);
                    }}>
                        <div className="create-account">
                            <div className="h1-title valign-text-middle sfpro-regular-normal-black-64px">Create
                                Account
                            </div>
                            <div className="frame-8">
                                <div className="frame-6">
                                    <InputTitle
                                        title="First Name"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="group-1"
                                        inputId="first_name"
                                    />
                                    <InputTitle
                                        title="Last Name"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="group-2"
                                        inputId="last_name"
                                    />
                                </div>
                                <div className="frame-7">
                                    <InputTitle
                                        title="Password*"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        className="group-3"
                                        inputId="password"
                                    />
                                    <InputTitle
                                        title="Email Address*"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email Address"
                                        className="group-4"
                                        inputId="email"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="personal-information">
                            <div className="h1-title valign-text-middle sfpro-regular-normal-black-64px">Personal
                                Information
                            </div>
                            <div className="frame-9">
                                <InputTitleLong
                                    title="Avatar URL"
                                    name="avatar"
                                    type="text"
                                    placeholder="Enter Avatar URL"
                                    className="group-5"
                                    inputId="avatar_url"
                                />
                                <InputTitleLarge
                                    title="Description"
                                    name="description"
                                    type="text"
                                    placeholder="Enter Bio"
                                    className="group-6"
                                    inputId="sign_up_description"
                                />
                            </div>
                        </div>
                        <div className="statusDiv">
                            <label className="status">
                                <b>{dashboard.state.message.body}</b>
                            </label>
                        </div>
                        <div className="sign_up_btn">
                            <NewButton id="log_in" buttonName="Log In" link="./"/>
                            <NewButton id="sign_up" buttonName="Sign Up" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;

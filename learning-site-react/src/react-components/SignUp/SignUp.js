import React from 'react';
import "./style.css"
import "./font-color.css"
import InputTitle from "./InputTitle";
import InputTitleLong from "./InputTitleLong";
import InputTitleLarge from "./InputTitleLarge";
import NewButton from "../Button";
// import adduser from "../../../../phase2/client/src/actions/user";


class SignUp extends React.Component {
    render() {
        const logo = require('./../../img/logo.svg').default
        return (
            <div className="container-center-horizontal">
                <div className="sign-up-page screen">
                    <img
                        className="logo"
                        src={logo}
                    />
                    <form id="sign_up_form" className="frame-5">
                        <div className="create-account">
                            <div className="h1-title valign-text-middle sfpro-regular-normal-black-64px">Create
                                Account
                            </div>
                            <div className="frame-8">
                                <div className="frame-6">
                                    <InputTitle
                                        title="First Name"
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="group-1"
                                        inputId="first_name"
                                    />
                                    <InputTitle
                                        title="Last Name"
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="group-2"
                                        inputId="last_name"
                                    />
                                </div>
                                <div className="frame-7">
                                    <InputTitle
                                        title="Password*"
                                        type="password"
                                        placeholder="Enter Password"
                                        className="group-3"
                                        inputId="password"
                                    />
                                    <InputTitle
                                        title="Email Address*"
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
                                    type="text"
                                    placeholder="Enter Avatar URL"
                                    className="group-5"
                                    inputId="avatar_url"
                                />
                                <InputTitleLarge
                                    title="Description"
                                    type="text"
                                    placeholder="Enter Bio"
                                    className="group-6"
                                    inputId="sign_up_description"
                                />
                            </div>
                        </div>
                    </form>
                    <div className="sign_up_btn">
                        <NewButton id="log_in" buttonName = "Log In" link = "./"/>
                        <NewButton id="sign_up" buttonName = "Sign Up" onClick={function() {
                            const sign_up_form = document.querySelector("#sign_up_form")
                            addUser(sign_up_form, null)
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;

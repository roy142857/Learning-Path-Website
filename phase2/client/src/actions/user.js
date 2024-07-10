
// A function to send a POST request with a new user
import ENV from './../config.js'
const API_HOST = ENV.api_host
const urlPrefix = API_HOST
const axios = require('axios');

export const adduser = (form, dashboardComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/users";
    // The data we are going to send in our request
    const formTemp = new FormData(form);
    let userData = {};
    formTemp.forEach((value, key) => userData[key] = value);
    // userData = JSON.stringify(userData)
    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "POST",
    //     body: userData
    // });
    // Send the request with fetch()
    axios.post(url, userData)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If user was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a user.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the user, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add the user.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const login = (form, comp) => {
    const url = urlPrefix + "/api/users/login"
    const formTemp = new FormData(form);
    let userData = {}
    formTemp.forEach((value, key) => userData[key] = value)
    axios.post(url, userData)
        .then(function (res){
            if (res.status === 200){
                comp.setState({currentUser: res.data})
                console.log(res.data.userType)
                return res.data;
            } else {
                return null;
            }
        })
}

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = urlPrefix + "/api/users/logout";
    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

export const enrollSkill = (user, skill) => {

    user.skillLearning.push(skill._id)
    user.skillLearning.save()
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each user
export const getUsers = (userListComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/users";

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.data.users
            } else {
                alert("Could not get users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            userListComp.setState({ userList: json.users });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with a user ID
export const deleteUser = (userId, dashboardComp, userListComp) => {
    // the URL for the request
    const url = urlPrefix + `/api/users/${userId}`;

    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "delete",
    // });

    // Send the request with fetch()
    axios.delete(url)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                dashboardComp.setState({
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });
                const filteredList = userListComp.state.userList.filter(usr => usr._id !== userId);
                userListComp.setState(
                    { userList: filteredList }
                );

            } else {
                // If server couldn't delete the user, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete the user.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getSingleUser = (userId, userListComp) => {
    const url = urlPrefix + `/api/users/${userId}`;

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                userListComp.setState({ userList: [res.data] });
                // console.log([res.data.users])
                return res.data
            } else if(res.status === 404){
                alert("Could not get the user");
            }else {
                alert("Server error");
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to send a GET request with a user ID
export const getSkillsByUserid = (userId, userListComp) => {
    const url = urlPrefix + `/api/skills/user/${userId}`;
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                userListComp.setState({skillList: res.data.learningSkills})
                console.log(res.data.learningSkills)
                return res.data.learningSkills
            }
            else if (res.status === 404) {
                alert("Could not get the user")
            } else {
                alert("Server error")
            }
        })
        .catch(err => {
            console.log(err)
        })
}

// export const addSkillToUser = (userId, sikllId, userListComp) => {
//     const url = urlPrefix + `/api/skills/${userId}`;
//     axios.get(url)
//         .then(res => {
//
//         })
// }

export const checkSession = (app) => {
    const url = urlPrefix + `/api/users/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (json && json.currentUser) {
                    app.setState({ currentUser: json.currentUser });
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        app.setState({ currentUser: ENV.user });
    }
};

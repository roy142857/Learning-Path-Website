import ENV from './../config.js'
const API_HOST = ENV.api_host
const urlPrefix = API_HOST
const axios = require('axios');

export const addSkill = (form, dashboardComp) => {
    // the URL for the request
    const url = urlPrefix +"/api/skills";
    // The data we are going to send in our request
    const formTemp = new FormData(form);
    let skillData = {};
    formTemp.forEach((value, key) => skillData[key] = value);
    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "post",
    //     body: skillData,
    // });
    // Send the request with fetch()
    axios.post(url, skillData)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If skill was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a skill.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the skill, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add the skill.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each user
export const getSkills = (skillListComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/skills";

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                skillListComp.setState({ skillList: res.data.skills })
                console.log("Setting State")
                console.log(res.data.skills);
            } else {
                alert("Could not get skills");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserSkills = (user, skillListComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/skills";

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                let temp_skills = res.data.skills
                let user_sikllIds = user.skillLearning
                const filteredList = temp_skills.filter(ski => !user_sikllIds.includes(ski._id));
                skillListComp.setState({ skillList: filteredList })
                console.log("Setting State")
                console.log(filteredList);
            } else {
                alert("Could not get skills");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with a user ID
export const deleteSkill = (skillId, dashboardComp, skillListComp) => {
    // the URL for the request
    const url = urlPrefix +`/api/skills/${skillId}`;

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
                const filteredList = skillListComp.state.skillList.filter(ski => ski._id !== skillId);
                skillListComp.setState(
                    { skillList: filteredList }
                );

            } else {
                // If server couldn't delete the skill, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete the skill.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const modifySkill = (id, form, skillListComp)  => {
    // the URL for the request
    const url = urlPrefix +`/api/modify/skill/${id}`;
    // The data we are going to send in our request
    const formTemp = new FormData(form);
    let skillData = {};
    formTemp.forEach((value, key) => skillData[key] = value);
    Object.keys(skillData).forEach(key => {
        if (skillData[key] === '') {
            delete skillData[key];
        }
    });
    console.log(url)
    console.log(skillData)
    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "post",
    //     body: skillData,
    // });
    // Send the request with fetch()
    axios.patch(url, skillData)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If skill was added successfully, tell the user.
                skillListComp.setState({
                    message: {
                        body: "Success: Changed a skill.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the skill, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                skillListComp.setState({
                    message: {
                        body: "Error: Could not change the skill.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getSingleSkill = (skillId, skillListComp) => {
    const url = urlPrefix + `/api/skills/${skillId}`

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                skillListComp.setState({ skillList: [res.data] });
                console.log(`Returning ${res.data}`)
                return res.data
            } else if(res.status === 404){
                alert("Could not get the skill");
            }else {
                alert("Server error");
            }
        })
        .catch(error => {
            console.log(error);
        });
}
import ENV from './../config.js'
const API_HOST = ENV.api_host
const urlPrefix = API_HOST
const axios = require('axios');
// A function to send a POST request with a new course
export const addCourse = (form, dashboardComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/courses";

    // The data we are going to send in our request
    const formTemp = new FormData(form);
    let courseData = {};
    formTemp.forEach((value, key) => courseData[key] = value);

    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "post",
    //     body: courseData,
    // });

    // Send the request with fetch()
    axios.post(url, courseData)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If course was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a course.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the course, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add the course.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const modifyCourse = (id, form, courseListComp)  => {
    // the URL for the request
    const url = urlPrefix +`/api/modify/course/${id}`;
    // The data we are going to send in our request
    const formTemp = new FormData(form);
    let courseData = {};
    formTemp.forEach((value, key) => courseData[key] = value);
    Object.keys(courseData).forEach(key => {
        if (courseData[key] === '') {
            delete courseData[key];
        }
    });
    // Create our request constructor with all the parameters we need
    // const request = new Request(url, {
    //     method: "post",
    //     body: skillData,
    // });
    // Send the request with fetch()
    axios.patch(url, courseData)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If skill was added successfully, tell the user.
                courseListComp.setState({
                    message: {
                        body: "Success: Changed a course.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the skill, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                courseListComp.setState({
                    message: {
                        body: "Error: Could not change the course.",
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
export const getCourses = (courseListComp) => {
    // the URL for the request
    const url = urlPrefix + "/api/courses";

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                courseListComp.setState({ courseList: res.data.courses })
                console.log("Setting State")
                console.log(res.data.courses);
            } else {
                alert("Could not get courses");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with a user ID
export const deleteCourse = (courseId, dashboardComp, courseListComp) => {
    // the URL for the request
    const url = urlPrefix + `/api/courses/${courseId}`;

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
                const filteredList = courseListComp.state.courseList.filter(cor => cor._id !== courseId);
                courseListComp.setState(
                    { courseList: filteredList }
                );

            } else {
                // If server couldn't delete the course, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete the course.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getSingleCourse = (courseId, courseListComp) => {
    const url = urlPrefix +`/api/courses/${courseId}`

    // Since this is a GET request, simply call fetch on the URL
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                courseListComp.setState({ courseList: [res.data]});
                return res.data;
            } else if(res.status === 404){
                alert("Could not get the course");
            }else {
                alert("Server error");
            }
        })
        .catch(error => {
            console.log(error);
        });
}
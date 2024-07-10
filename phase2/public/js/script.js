function getUsers() {
    // the URL for the request
    const url = '/users';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json()
            } else {
                alert('Could not get users')
            }
        })
        .then((json) => {  // the resolved promise with the JSON body
            usersList = document.querySelector('#usersList')
            usersList.innerHTML = '';
            console.log(json)
            json.users.map((u) => {
                li = document.createElement('li')
                li.innerHTML = `Name: <strong>${u.lastName}</strong>, E-Mail: <strong>${u.email}</strong>`
                usersList.appendChild(li)
                console.log(u)
            })
        }).catch((error) => {
        console.log(error)
    })
}

function addUser() {
    // the URL for the request
    const url = '/users';

    // The data we are going to send in our request
    let data = {
        name: document.querySelector('#name').value,
        firstName: document.querySelect('#firstName').value,
        lastName: document.querySelect('#lastName').value,
        avatar: document.querySelect('#avatar').value,
        description: document.querySelect('#description').value,
        skillLearning: [],
        skillLearned: [],
        courseLearning: [],
        courseLearned: [],
        userType: document.querySelect('#userType').value,
        email: document.querySelect('#email').value
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
        .then(function(res) {

            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            const message = document.querySelector('#message')
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log('Added student')
                message.innerText = 'Success: Added a student.'
                message.setAttribute("style", "color: green")

            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                message.innerText = 'Could not add student'
                message.setAttribute("style", "color: red")

            }
            log(res)  // log the result in the console for development purposes,
            //  users are not expected to see this.
        }).catch((error) => {
        log(error)
    })
}

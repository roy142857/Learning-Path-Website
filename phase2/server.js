const path = require('path')
const express = require('express')
const app = express()

const {mongoose} = require('./db/mongoose')
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

// Handlebars
// const hbs = require('hbs')
// app.set('view engine', 'hbs')
// hbs.registerPartials(path.join(__dirname, '/views/partials'))

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)
process.env.TEST_USER_ON = true
const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '61b26ac99d73151aca85c8f2' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

const { Course } = require("./models/course")
const { Skill } = require("./models/skill")
const { User } = require("./models/user")
const { ObjectID } = require("mongodb");

// Session handlers
const session = require('express-session')
const MongoStore = require('connect-mongo')
// const skill = require("../learning-site-react/src/react-components/Skill");
app.use(session({
    secret: 'our hardcoded secret', // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
    cookie: { // the session cookie sent, containing the session id.
        expires: 60000, // 1 minute expiry
        httpOnly: true // important: saves it in only browser's memory - not accessible by javascript (so it can't be stolen/changed by scripts!).
    },

    // Session saving options
    saveUninitialized: false, // don't save the initial session if the session object is unmodified (for example, we didn't log in).
    resave: false, // don't resave an session that hasn't been modified.
}));


/** Static directories **/
// static js directory
app.use("/js", express.static(path.join(__dirname, '/public/js')))
// static image directory
app.use("/img", express.static(path.join(__dirname, '/public/img')))

/** Import the various routes **/
// Webpage routes
// app.use(require('./routes/webpage'))
// // User and login routes
// app.use(require('./routes/users'))
// app.use(require('./routes/skill'))



function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/CourseAPI'
        }) : null
    })
);

app.post("/api/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            console.log(req.session)
            req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.status(200).send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});

app.get("/api/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send()
        }
    });
});

// TODO: Check this one
app.get("/api/users/check-session", (req, res) => {

    // if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
    //     req.session.user = TEST_USER_ID;
    //     req.session.email = TEST_USER_EMAIL;
    //     res.status(200).send({ currentUser: TEST_USER_EMAIL })
    //     return;
    // }
    console.log(req.session)
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

app.post('/api/users', mongoChecker, async (req, res) => {
    // console.log(req.body)

    // Create a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        description: req.body.description,
        skillLearning: [],
        skillLearned:[],
        courseLearning: [],
        courseLearned: [],
        userType: req.body.userType || "user",
        email: req.body.email,
        password: req.body.password
    })
    try {
        // Save the user
        const newUser = await user.save()
        res.status(200).send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send(user) // bad request for changing the student.
        }
    }
})

app.post('/api/skills', mongoChecker, async (req, res) => {
    const skill = new Skill({
        name: req.body.name,
        image: req.body.image,
        overview: req.body.overview,
        description: req.body.description,
        videoLink: req.body.videoLink,
        courseRelated: [],
        // Need to manually add course related
        userFinished: []
        // Need to manually add user finished
    })

    // async-await version:
    try {
        const result = await skill.save()
        res.status(200).send(result)
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

// Do we need authentication for add a course?
app.post('/api/courses', mongoChecker, async (req, res) => {
    const course = new Course({
        name: req.body.name,
        image: req.body.image,
        overview: req.body.overview,
        description: req.body.description,
        videoLink: req.body.videoLink,
        skillRelated: [],
        // Need to manually add skill related
        userFinished: [],
        // Need to manually add user finished，
        suggestedLearningTime: req.body.suggestedLearningTime
    })

    // async-await version:
    try {
        const result = await course.save()
        res.status(200).send(result)
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.get('/api/skills', mongoChecker, async (req, res) => {

    // Get the skills
    try {
        Skill.find().then((skills) => {
            res.status(200).send({ skills })
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})

app.get('/api/courses', mongoChecker, async (req, res) => {

    // Get the skills
    try {
        Course.find().then((courses) => {
            res.status(200).send({ courses })
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})


app.get('/api/users', mongoChecker, async (req, res) => {

    // Get the users
    try {
        User.find().then((users) => {
            res.status(200).send({ users })
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})

app.get('/api/users/:id', mongoChecker, async (req, res) => {

    // Get the user
    try {
        const id = req.params.id
        User.findById(id).then((user) => {
            if (!user) {
                res.status(404).send('Resource not found')  // could not find this student
            } else {
                res.status(200).send(user)
            }
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})

app.get('/api/courses/:id', mongoChecker, async (req, res) => {

    // Get the skills
    try {
        const id = req.params.id
        Course.findById(id).then((course) => {
            if (!course) {
                res.status(404).send('Resource not found')  // could not find this student
            } else {
                res.status(200).send(course)
            }
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

// GET all learning skills from user with user_id
app.get('/api/skills/user/:user_id', mongoChecker, async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id)
        if (!user) {
            res.status(404).send('User not found')
        } else {
            const learningSkills = await user.skillLearning
            res.status(200).send(learningSkills)
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

app.get('/api/skills/:id', mongoChecker, async (req, res) => {

    // Get the skills
    try {
        const id = req.params.id
        Skill.findById(id).then((skill) => {
            if (!skill) {
                res.status(404).send('Resource not found')  // could not find this student
            } else {
                console.log(skill)
                res.status(200).send(skill)
            }
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

})

app.post('/api/relations/:skillId/:courseID', mongoChecker, async (req, res) => {
    try {
        // console.log("calling")
        const skillId = req.params.skillId
        const courseId = req.params.courseID
        Skill.findOne({_id:skillId}).then((skill) => {
            skill.courseRelated.push(courseId)
            skill.save()
        })
        Course.findOne({_id:courseId}).then((course) => {
            course.skillRelated.push(skillId)
            course.save()
        })
        res.status(200).send()
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

app.patch('/api/modify/skill/:skillId', async (req, res) => {
    const id = req.params.skillId
    const fieldsToUpdate = req.body
    console.log(req.body)
    // req.body.map((change) => {
    //     // const propertyToChange = change.path.substr(1) // getting rid of the '/' character
    //     fieldsToUpdate[propertyToChange] = change.value
    // })
    try {
        const skill = await Skill.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        if (!skill) {
            res.status(404).send('Resource not found')
        } else {
            res.send(skill)
        }
    } catch (error) {
        {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.patch('/api/modify/course/:courseId', async (req, res) => {
    const id = req.params.courseId
    const fieldsToUpdate = req.body
    console.log(req.body)
    // req.body.map((change) => {
    //     // const propertyToChange = change.path.substr(1) // getting rid of the '/' character
    //     fieldsToUpdate[propertyToChange] = change.value
    // })
    try {
        const course = await Course.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        if (!course) {
            res.status(404).send('Resource not found')
        } else {
            res.send(course)
        }
    } catch (error) {
        {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.patch('/api/modify/user/:userid', async (req, res) => {
    const userid = req.params.userid
    const fieldsToUpdate = req.body
    console.log(req.body)
    try {
        const user = await User.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }
    } catch (error) {
        {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// app.patch('/api/enroll/:userId/:courseId', mongoChecker, (req, res) => {
//     const courseId = req.params.courseId
//     Course.findById(courseId).then((course) => {
//         if (!course) {
//             res.status(404).send('Course not found')  // could not find this student
//         }
//     })
//     const userId = req.params.userId
//     User.findOne({_id:userId}).then((user) => {
//         if (!user) {
//             res.status(404).send('User not found')  // could not find this student
//         }
//         if (user.courseLearning.includes(courseId)){
//             res.status(403).send("Already enrolling.")
//         }else if (user.courseLearned.includes(courseId)){
//             user.courseLearned.remove(courseId)
//             user.courseLearned.save().then(() => {
//                 user.courseLearning.push(courseId)
//                 user.courseLearned.save().then(() => {
//                     res.status(200).send("Removed from finished")
//                 }).catch((error) => {
//                     res.status(500).send('Internal Server Error')
//                 })
//             })
//         }else{
//             user.courseLearning.push(courseId)
//             user.courseLearned.save().then(() => {
//                 res.status(200).send("Removed from finished")
//             }).catch((error) => {
//                 res.status(500).send('Internal Server Error')
//             })
//         }
//     }).catch((error) => {
//         res.status(500).send('Internal Server Error')
//     })
// })

app.patch('/api/enroll/:userId/:skillId', mongoChecker, (req, res) => {
    const skillId = req.params.skillId
    let skill;
    Skill.findById(skillId).then((sk) => {
        if (!sk) {
            res.status(404).send('Skill not found')  // could not find this student
        }else{
            skill = sk
            console.log(sk)
        }
    }).then(() => {
        const userId = req.params.userId
        User.findOne({_id:userId}).then((user) => {
            if (!user) {
                res.status(404).send('User not found')  // could not find this student
            }
            console.log(user.skillLearning)
            if (user.skillLearning.includes(skill)){
                res.status(403).send("Already enrolled.")
            }else if (user.skillLearned.includes(skillId)){
                user.skillLearned.remove(skillId)
                user.save().then(() => {
                    console.log(skill)
                    user.skillLearning.push(skillId)
                    user.save().then(() => {
                        skill.courseRelated.forEach(element => {
                            if(element in user.courseLearning === false){
                                user.courseLearning.push(element)
                                user.courseLearning.save()
                            }
                        })
                        res.status(200).send("Removed from finished")
                    }).catch((error) => {
                        res.status(500).send('Internal Server Error')
                    })
                })
            }else{
                user.skillLearning.push(skillId)
                user.skillLearning.save().then(() => {
                    skill.courseRelated.forEach(element => {
                        if(element in user.courseLearning === false){
                            user.courseLearning.push(element)
                            user.courseLearning.save()
                        }
                    })
                    res.status(200).send("Skill Enrolled")
                }).catch((error) => {
                    res.status(500).send(error)
                })
            }
        })
    })
    .catch((error) => {
        res.status(500).send('Internal Server Error')
    })
})

app.patch('/api/finish/:userId/:skillId', mongoChecker, (req, res) => {
    const skillId = req.params.skillId
    Skill.findById(skillId).then((skill) => {
        if (!skill) {
            res.status(404).send('Skill not found')  // could not find this student
        }
    })
    const userId = req.params.userId
    User.findOne({_id:userId}).then((user) => {
        if (!user) {
            res.status(404).send('User not found')  // could not find this student
        }
        if (user.skillLearned.includes(skillId)){
            res.status(403).send("Already finished.")
        }else if (user.skillLearning.includes(skillId)){
            user.skillLearning.remove(skillId)
            user.skillLearning.save().then(() => {
                user.skillLearned.push(skillId)
                user.skillLearned.save().then(() => {
                    res.status(200).send("Skill learned")
                }).catch((error) => {
                    res.status(500).send('Internal Server Error')
                })
            })
        }else{
            res.status(403).send('Skill not enrolling')
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error')
    })
})

app.patch('/api/finish/:userId/:courseId', mongoChecker, (req, res) => {
    const courseId = req.params.courseId
    Course.findById(courseId).then((course) => {
        if (!course) {
            res.status(404).send('Course not found') // could not not found')  // could not find this student
        }
    })
    const userId = req.params.userId
    User.findOne({_id:userId}).then((user) => {
        if (!user) {
            res.status(404).send('User not found')  // could not find this student
        }
        if (user.courseLearned.includes(courseId)){
            res.status(403).send("Already finished.")
        }else if (user.courseLearning.includes(courseId)){
            user.courseLearning.remove(courseId)
            user.courseLearning.save().then(() => {
                user.courseLearned.push(courseId)
                user.courseLearned.save().then(() => {
                    res.status(200).send("Course learned")
                }).catch((error) => {
                    res.status(500).send('Internal Server Error')
                })
            })
        }else{
            res.status(403).send('Course not enrolling')
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error')
    })
})

// TODO: Add app get to show the link between the course and the skill

/// a DELETE route to remove a user by its id.
app.delete("/api/users/:userId", mongoChecker, (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndRemove(userId).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.status(200).send(user)
        }
    })
        .catch((error) => {
            console.log(error)
            res.status(500).send() // server error, could not delete.
        })
});

/// A DELETE route to remove a skill by skillId
app.delete("/api/skills/:skillId", mongoChecker, (req, res) => {
    const skillId = req.params.skillId;

    Skill.findByIdAndRemove(skillId).then((skill) => {
        if (!skill) {
            res.status(404).send("Skill not found")
        } else {
            res.status(200).send(skill)
        }
    })
        .catch((error) => {
            console.log(error)
            res.status(500).send() // server error, could not delete.
        })
});

app.delete("/api/courses/:courseId", mongoChecker, (req, res) => {
    const courseId = req.params.courseId;

    Course.findByIdAndRemove(courseId).then((course) => {
        if (!course) {
            res.status(404).send("Course not found")
        } else {
            res.status(200).send(course)
        }
    })
        .catch((error) => {
            console.log(error)
            res.status(500).send() // server error, could not delete.
        })
});


/*************************************************/
app.use(express.static(path.join(__dirname, "/client/build")));
// Routes
// TODO: add more routes
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard", "/api"];
    // if (!goodPageRoutes.includes(req.url) ) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

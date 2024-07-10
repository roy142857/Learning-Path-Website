# Learning Path Website
* Zihao Shen
* Leyang Chen
* Zhexuan Li
* Haoran Zhao

## Phase 2 Update

* User login working. Password are encrypted.
* Admin with more functions:
    * Add course
    * Remove course
    * Add Skill
    * Remove Skill
    * Modify Course
    * Modify Skill
* Course and Skill display based on the mongoDB
* UI Modification
* Express server working

## Login Credential

* Admin
```angular2html
Use postman URL is api/users, UserType: Admin
```
```angular2html
For Heroku:
    email: admin@example.com
    password: 123456789
```

* Regular User
```angular2html
Use Sign up page to create user
```

```angular2html
For Heroku:
    email: user@example.com
    password: 123456789
```


## Setup Locally

Go into phase 2 folder:

```
cd phase2
```

Start your local Mongo database.  For example, in a separate terminal window:

```
# create and run local Mongo database in the root directory of the repo
mkdir mongo-data
mongod --dbpath mongo-data
```

Then, in the root directory of the repo, run:
```
# install server dependencies in the root directory
npm install

# install frontend dependencies in the client directory
cd client
npm install
```

```
# build the React app
cd client
npm run build

# go back to the root directory
cd ..

# run the server
node server.js
```

# How to add videos for course
* Copy embedded code from youtube
* In this code, there is an url
* Copy this url, paste into the form.
* NOTE: in order for display skill and course to work, the video link must be valid.

# Relate course and skill
* Send API call to
* /api/relations/:skillId/:courseId

# MongoDB Configuration
* URL: mongodb+srv://admin:dMFenjmdPllHibzV@cluster0.qlavy.mongodb.net/SkillLearningSite?retryWrites=true&w=majority
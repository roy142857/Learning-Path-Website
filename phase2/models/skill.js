const mongoose = require('mongoose')

const Skill = mongoose.model('Skill', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    image: {
        type: String
        // This is a link to the image of the course
    },
    overview: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        // default is placeholders description
    },
    videoLink: {
        type: String,
        required: false,
        // This is a link to the video of the course
    },
    courseRelated: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    userFinished: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

module.exports = {Skill}
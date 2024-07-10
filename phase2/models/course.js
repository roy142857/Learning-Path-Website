const mongoose = require('mongoose')

const Course = mongoose.model('Course', {
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
        required: true,
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
        type: String
        // This is a link to the video of the course
    },
    skillRelated: {
        type: [mongoose.Schema.Types.ObjectId]
        // TODO: Can I do this?
    },
    userFinished: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    suggestedLearningTime: {
        type: Number,
        required: true
    }
})

module.exports = {Course}
const mongoose = require('mongoose')

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/SkillLearningSite'

mongoose.connect(mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .catch((error) => {
        console.log('Error connecting to mongoDB. Timeout.')
    })
;

module.exports = {mongoose}
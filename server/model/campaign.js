const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    hospital: {type: String, required: true, unique: true},
    message: {type: String, required: true, unique: true}
})

module.exports = mongoose.model("data", userData)
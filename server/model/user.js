const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNo: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    cnfPassword: {type: String, required: true}
})

module.exports = mongoose.model("user", userSchema)
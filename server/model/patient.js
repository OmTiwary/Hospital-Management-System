const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    patientName: {type: String, required: true},
    patientEmail: {type: String, required: true},
    doctor: {type: String, required: true, unique: true},
    visitType: {type: String, required: true, unique: true},
    time: {type: String, required: true},
    date: {type: String, required: true}
})

module.exports = mongoose.model("appointment", patientSchema)
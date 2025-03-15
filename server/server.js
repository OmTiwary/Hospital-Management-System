const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.get('/', (req, res)=>{
    res.send("Server is working well!")
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is connected to http://localhost:${PORT}`)
})

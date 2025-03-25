const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors(
   {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true
   } 
));
app.use(express.json())
app.get('/', (req, res)=>{
    res.send("Server is working well!")
})

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)
.then(()=>console.log("Database Connected."))
.catch((error)=>console.log("Error detected", error))



app.listen(PORT, (req, res)=>{
    console.log(`Server is connected to http://localhost:${PORT}`)
})

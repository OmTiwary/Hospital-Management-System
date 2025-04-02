const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

const userModel = require('./model/user')

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

app.post('/user', (req, res)=>{
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    userModel.findOne({email:email})
    .then(user=>{
        if(user)
        {
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect!")
            }
            
        }
        else
        {
            res.json("No record existed!")
        }
    })
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is connected to http://localhost:${PORT}`)
})


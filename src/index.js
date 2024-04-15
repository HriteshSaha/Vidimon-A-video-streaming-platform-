// require('dotenv').config({path: '../env'})

import dbConnect from "./db/database.js"
import dotenv from "dotenv"
import express from "express"

dotenv.config({path: "./env"})
const app = express()
PORT = process.env.PORT || 3000


dbConnect()
.then(()=> {
    app.listen(PORT, ()=> {
        console.log(`The server is running at: ${PORT}`)
    })
})
.catch((err)=> {
    console.log(`DB connection failed: ${err}`);
})
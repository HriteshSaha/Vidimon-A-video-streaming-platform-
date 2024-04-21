// require('dotenv').config({path: '../env'})

import dbConnect from "./db/database.js"
import dotenv from "dotenv"
import express from "express"
import {app} from "./app.js"

dotenv.config({path: "./env"})
// const app = express()
const port = process.env.PORT || 3000


dbConnect()
.then(()=> {
    app.listen(port, ()=> {
        console.log(`The server is running at: ${port}`)
    })
})
.catch((err)=> {
    console.log(`DB connection failed: ${err}`);
})
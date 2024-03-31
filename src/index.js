// require('dotenv').config({path: '../env'})

import dbConnect from "./db/database.js"
import dotenv from "dotenv"

dotenv.config({path: "./env"})

dbConnect()
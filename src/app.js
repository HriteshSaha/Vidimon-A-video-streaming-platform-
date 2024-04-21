import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// Routes import
import userRouter from "./routes/user.routes.js"


//Routes declaration
app.use("/api/v1/users", userRouter)  // we write "app.get" when we write app and controllers in a same file
// But as we took controllers to the different file that's why we need to write middleware so we write "app.use"



export {app}
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import expressSession from "express-session"
import router from "./src/routes/index.js"
import {globalErrorHandler} from "./src/controllers/index.js"

console.clear()

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET" , "POST" , "PATCH" , "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(expressSession({
    store: new expressSession.MemoryStore(),
    resave: false,
    rolling: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    name: process.env.SESSION_NAME,
    cookie: {
        path: "/",
        maxAge: +process.env.SESSION_MAX_AGE,
        priority: "high",
        httpOnly: true,
        secure: process.env.MODE === "prod",
        sameSite: process.env.MODE === "prod" ? "none" : "lax"
    }
}))

app.use(router)

app.use(globalErrorHandler)

app.listen(
    +process.env.PORT, 
    process.env.HOST, 
    error => {
        if(error) {
            console.error(error)
            return process.exit(1)
        }
        console.log(`server is running on port ${process.env.PORT}!`)
    }
)

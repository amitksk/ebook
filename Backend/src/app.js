import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//---------------routes import---------------
 import userRouter from "./routes/user.route.js"
 import bookRouter from "./routes/book.route.js"

 
// http://localhost:8000/api/v1/users/register
//---------------routes declaration-----------
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)


export default app;

import express from "express";
import cors from 'cors';
import soictRouter from './routes/soictRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cookieParser from "cookie-parser";
import { config } from "dotenv";

export const app = express();

config({
    path: "./config/logs.env",
})

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(
    cors({
        origin: ["https://gbu-academics.vercel.app", "http://localhost:5174"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//Routes
app.use("/", soictRouter);
app.use("/", adminRouter);

app.get('/', (req, res) => {
    const routes = {
        cseServer: "CSE",
        itServer: "IT",
        eceServer: "ECE",
    };
    res.render('server', routes);
    // res.send('server is running')
})
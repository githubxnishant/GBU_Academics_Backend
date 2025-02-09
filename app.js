import express from "express";
import cors from 'cors';
import soictRouter from './routes/soictRoutes.js';
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
        origin: "https://gbu-academics.vercel.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//Routes
app.use("/", soictRouter);

app.get('/', (req, res) => {
    const routes = {
        cseServer: "CSE",
        itServer: "IT",
        eceServer: "ECE",
    };
    res.render('server', routes);
})
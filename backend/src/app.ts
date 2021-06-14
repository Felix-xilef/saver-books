import express from "express";
import "reflect-metadata";
import cors from "cors";

import createConnection from "./database";
import router from "./routes";

createConnection()
const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
}));
app.use(express.json());
app.use(router);


export { app };

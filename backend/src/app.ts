import express from "express";
import "reflect-metadata";

import createConnection from "./database";
import router from "./router";

createConnection()
const app = express();

// app.use(cors({
//     origin: 'http://localhost:4200',
// }));
app.use(express.json());
app.use(router);


export { app };

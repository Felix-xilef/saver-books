import express from "express";
import "reflect-metadata";
import cors from "cors";

import createConnection from "./database";
import router from "./routes";
import authMiddleware from "./middlewares/authMiddleware";
import { loanCron, reservationCron } from "./services/cron";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());

// setting up public directory
app.use("/public", express.static("./public"));

app.use(authMiddleware);
app.use(router);

loanCron.start();
reservationCron.start();

export { app };

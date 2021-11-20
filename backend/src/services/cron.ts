import cron from "node-cron";

import { LoanController } from "../controllers/LoanController";
import { ReservationController } from "../controllers/ReservationController";

const loanController = new LoanController();
const reservationController = new ReservationController();

export const loanCron = cron.schedule(
  "0 1 * * *",
  loanController.scheduleUpdate,
);

export const reservationCron = cron.schedule(
  "0 2 * * *",
  reservationController.scheduleUpdate,
);

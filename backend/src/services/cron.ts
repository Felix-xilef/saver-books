import { LoanController } from "../controllers/LoanController";
import cron from "node-cron";

export const testCron = cron.schedule("* * * * *", () => {
  console.log("Testando a função cron de 1 em 1 minuto");
});

const loanController = new LoanController();

export const loanCron = cron.schedule(
  "* * * * *",
  loanController.scheduleUpdate,
);

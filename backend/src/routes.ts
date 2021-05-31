import { BookController } from "./controllers//BookController";
import { LoanController } from "./controllers//LoanController";
import { ReportController } from "./controllers//ReportController";
import { ReservationController } from "./controllers//ReservationController";
import { UserController } from "./controllers//UserController";
import { Router } from "express";

const router = Router();

const userController = new UserController;
const bookController = new BookController;
const reservationController = new ReservationController;
const loanController = new LoanController;
const reportController = new ReportController;

router.get('/user', userController.select);
router.post('/user', userController.insert);

export default router;

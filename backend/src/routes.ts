import { Router } from "express";
import { BookController } from "./controllers/BookController";
import { LoanController } from "./controllers/LoanController";
import { ReportController } from "./controllers/ReportController";
import { ReservationController } from "./controllers/ReservationController";
import { UserController } from "./controllers/UserController";
import { SubTypesController } from "./controllers/SubTypesController";
import { AuthController } from "./controllers/AuthController";
import { ImageController } from "./controllers/ImageController";
import { ClientController } from "./controllers/ClientController";

const router = Router();

const authController = new AuthController();
const userController = new UserController();
const bookController = new BookController();
const imageController = new ImageController();
const reservationController = new ReservationController();
const loanController = new LoanController();
const reportController = new ReportController();
const subTypesController = new SubTypesController();
const clientController = new ClientController();

router.post("/authenticate", authController.authenticate);

router.get("/user", userController.select);
router.get("/users", userController.selectAll);
router.post("/user", userController.saveEntry);
router.put("/user", userController.saveEntry);
router.delete("/user", userController.delete);

router.get("/client", clientController.select);
router.get("/clients", clientController.selectAll);
router.post("/client", clientController.saveEntry);
router.put("/client", clientController.update);
router.get("/client", clientController.delete);

router.get("/book", bookController.select);
router.get("/books", bookController.selectAll);
router.post("/book", bookController.saveEntry);
router.put("/book", bookController.saveEntry);
router.delete("/book", bookController.delete);

router.get('/s3Url', imageController.getS3Url);

router.get("/reservation", reservationController.select);
router.get("/reservations", reservationController.selectAll);
router.post("/reservation", reservationController.saveEntry);
router.put("/reservation", reservationController.saveEntry);
router.delete("/reservation", reservationController.delete);

router.get("/loan", loanController.select);
router.get("/loans", loanController.selectAll);
router.post("/loan", loanController.saveEntry);
router.put("/loan", loanController.saveEntry);
router.delete("/loan", loanController.delete);

router.get("/genres", subTypesController.getGenres);
router.get("/usertypes", subTypesController.getUserTypes);
router.get("/reservationstatus", subTypesController.getReservationStatus);
router.get("/loanstatus", subTypesController.getLoanStatus);

router.get("/report", reportController.calculate);

export default router;

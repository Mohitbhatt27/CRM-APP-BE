import express from "express";
const ticketRouter = express.Router();
import ticketController from "../../controllers/ticket_controller";
import { isLoggedIn } from "../../middlewares/auth_middleware";

const { createTicket } = ticketController;

ticketRouter.post("/create", isLoggedIn, createTicket);

export default ticketRouter;

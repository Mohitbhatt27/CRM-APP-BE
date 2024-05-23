import express from "express";
const ticketRouter = express.Router();
import ticketController from "../../controllers/ticket_controller";
import {
  isEngineerOrAdmin,
  isLoggedIn,
} from "../../middlewares/auth_middleware";

const { createTicket, updateTicket } = ticketController;

ticketRouter.post("/create", isLoggedIn, createTicket);

ticketRouter.patch("/update/:id", isLoggedIn, isEngineerOrAdmin, updateTicket);

export default ticketRouter;

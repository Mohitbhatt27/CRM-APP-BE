import express from "express";
const userRouter = express.Router();
import userController from "../../controllers/user_controller";

const { getUserById, getAllUsers } = userController;

userRouter.get("/:id", getUserById);

userRouter.get("/", getAllUsers);

export default userRouter;

import express from "express";
const userRouter = express.Router();
import userController from "../../controllers/user_controller";

const { getUserById, getAllUsers, createUser } = userController;

userRouter.get("/:id", getUserById);

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

export default userRouter;

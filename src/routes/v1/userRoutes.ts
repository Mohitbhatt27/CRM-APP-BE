import express from "express";
const userRouter = express.Router();
import userController from "../../controllers/user_controller";
import createUserMiddleware from "../../middlewares/user_middleware";

const { getUserById, getAllUsers, createUser } = userController;

userRouter.get("/:id", getUserById);

userRouter.get("/", getAllUsers);

userRouter.post("/", createUserMiddleware, createUser);

export default userRouter;

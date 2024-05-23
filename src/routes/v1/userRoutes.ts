import express from "express";
const userRouter = express.Router();
import userController from "../../controllers/user_controller";
import {
  createUserMiddleware,
  signInValidator,
} from "../../middlewares/user_middleware";

const { getUserById, getAllUsers, createUser, signinUser } = userController;

userRouter.get("/:id", getUserById);

userRouter.get("/", getAllUsers);

userRouter.post("/signup", createUserMiddleware, createUser);

userRouter.post("/signin", signInValidator, signinUser);

export default userRouter;

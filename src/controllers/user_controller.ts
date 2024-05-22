import { Request, Response } from "express";
import UserService from "../services/user_service";
import UserRepository from "../repositories/user_repository";

const userService = new UserService(new UserRepository());

async function getUserById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const response = await userService.getUserById(id);
    res.status(200).json({
      data: response,
      success: true,
      message: "OK",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Internal server error",
      error: "Internal server error",
    });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const response = await userService.getAllUsers();
    res.status(200).json({
      data: response,
      success: true,
      message: "OK",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Internal server error",
      error: "Internal server error",
    });
  }
}

export default {
  getUserById,
  getAllUsers,
};

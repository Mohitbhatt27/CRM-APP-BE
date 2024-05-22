import { User } from "@prisma/client";
import UserRepository from "../repositories/user_repository";
import createUserDto from "../dtos/createUser_DTO";
import { error } from "console";

class UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUserById(id: string): Promise<User | null> {
    try {
      const response: User | null = await this.userRepository.getUserById(id);

      if (!response) {
        throw { error: "User not found" };
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response: User[] = await this.userRepository.getAllUsers();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userDetails: createUserDto): Promise<User> {
    try {
      const response: User = await this.userRepository.createUser(userDetails);
      if (!response) {
        throw { error: "user not created" };
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

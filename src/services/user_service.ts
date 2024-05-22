import { User } from "@prisma/client";
import UserRepository from "../repositories/user_repository";

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
}

export default UserService;

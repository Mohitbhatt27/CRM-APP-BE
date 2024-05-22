import { PrismaClient, User } from "@prisma/client";
import createUserDto from "../dtos/createUser_DTO";

const prisma = new PrismaClient();

class UserRepository {
  async createUser(userDetails: createUserDto): Promise<User> {
    const response: User = await prisma.user.create({
      data: {
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      },
    });
    return response;
  }

  async getUserById(id: string): Promise<User | null> {
    const response: User | null = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async getAllUsers(): Promise<User[]> {
    const response: User[] = await prisma.user.findMany();
    return response;
  }
}

export default UserRepository;

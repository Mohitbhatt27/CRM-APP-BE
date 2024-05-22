import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  // async createUser(name, email, password): Promise<User> {
  //   const response: User = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       password,
  //     },
  //   });

  //   return response;
  // }

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

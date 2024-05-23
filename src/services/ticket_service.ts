import { Ticket } from "@prisma/client";
import TicketRepository from "../repositories/ticket_repository";
import createTicketDto from "../dtos/createTicket_DTO";
import UserRepository from "../repositories/user_repository";

class UserService {
  ticketRepository: TicketRepository;
  userRepository: UserRepository;

  constructor(
    ticketRepository: TicketRepository,
    userRepository: UserRepository
  ) {
    this.ticketRepository = ticketRepository;
    this.userRepository = userRepository;
  }
  // async getUserById(id: string): Promise<User | null> {
  //   try {
  //     const response: User | null = await this.userRepository.getUserById(id);
  //     if (!response) {
  //       throw { error: "User not found" };
  //     }
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // async getAllUsers(): Promise<User[]> {
  //   try {
  //     const response: User[] = await this.userRepository.getAllUsers();
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  //   async getEngineerToAllocateTicket() {
  //     try {
  //         const engineer = await this.userRepository.getAvailableEngineer();
  //         return engineer;
  //     } catch(error) {
  //         console.log(error);
  //         throw error;
  //     }
  // }
  async createTicket(ticketDetails: createTicketDto): Promise<Ticket> {
    try {
      const response: Ticket = await this.ticketRepository.createTicket(
        ticketDetails
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // async signinUser(userDetails: signinUserDto): Promise<string | null> {
  //   try {
  //     const response = await this.userRepository.signinUser(userDetails);
  //     if (!response) {
  //       throw new NotFoundError("User", "email", userDetails.email);
  //     }
  //     const isPasswordValid = bcrypt.compareSync(
  //       userDetails.password,
  //       response.password
  //     );

  //     if (!isPasswordValid) {
  //       throw new UnauthorisedError();
  //     }

  //     const token: string = generateJWT({
  //       id: response.id,
  //       email: response.email,
  //       role: response.role,
  //     });

  //     return token;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}

export default UserService;

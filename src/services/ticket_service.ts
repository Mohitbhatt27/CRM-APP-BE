import { Ticket } from "@prisma/client";
import TicketRepository from "../repositories/ticket_repository";
import createTicketDto from "../dtos/createTicket_DTO";
import UserRepository from "../repositories/user_repository";
import NotFoundError from "../errors/notFound";
import UpdateTicketDto from "../dtos/updateTicket_DTO";
import UnauthorisedError from "../errors/unauthorisedError";

class TicketService {
  ticketRepository: TicketRepository;
  userRepository: UserRepository;

  constructor(
    ticketRepository: TicketRepository,
    userRepository: UserRepository
  ) {
    this.ticketRepository = ticketRepository;
    this.userRepository = userRepository;
  }
  async createTicket(
    ticketDetails: createTicketDto,
    id: string
  ): Promise<Ticket> {
    try {
      const createdBy = await this.userRepository.getUserById(id);
      if (!createdBy) {
        throw new NotFoundError("User", "id", id);
      }
      const engineersToAllocate = (
        await this.getEngineerToAllocateTicket()
      ).filter((engineer) => engineer.id !== createdBy.id);
      const randomIndex = Math.floor(
        Math.random() * engineersToAllocate.length
      );
      const engineer = engineersToAllocate[randomIndex];

      ticketDetails.assignee = createdBy.email;
      ticketDetails.assignedTo = engineer.email;
      ticketDetails.createdBy = createdBy.email;

      const response: Ticket = await this.ticketRepository.createTicket(
        ticketDetails
      );

      await this.userRepository.updateUser(engineer.id, {
        ticketsAssigned: [...engineer.ticketsAssigned, response.id],
      });

      await this.userRepository.updateUser(createdBy.id, {
        ticketsCreated: [...createdBy.ticketsCreated, response.id],
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateTicket(
    role: string,
    userEmail: string,
    id: string,
    ticketDetails: UpdateTicketDto
  ): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepository.getTicket(id);
      if (!ticket) {
        throw new NotFoundError("Ticket", "id", id);
      }
      if (ticket.assignedTo != userEmail && role != "ADMIN") {
        console.log(ticket.assignedTo, userEmail, role);

        throw new UnauthorisedError();
      }

      const response: Ticket = await this.ticketRepository.updateTicket(
        id,
        ticketDetails
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getEngineerToAllocateTicket() {
    try {
      const engineer = await this.userRepository.getAvailableEngineers();
      return engineer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMyAssignedTickets(id: string) {
    try {
      const response = await this.userRepository.getUserById(id);
      if (!response) {
        throw new NotFoundError("User", "id", id);
      }
      return response.ticketsAssigned;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMyCreatedTickets(id: string) {
    try {
      const response = await this.userRepository.getUserById(id);
      return response?.ticketsCreated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllTicketsForAdmin() {
    try {
      const response = await this.ticketRepository.getAllTickets();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default TicketService;

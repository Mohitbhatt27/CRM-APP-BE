import { PrismaClient, Ticket } from "@prisma/client";
import createTicketDto from "../dtos/createTicket_DTO";
import UpdateTicketDto from "../dtos/updateTicket_DTO";

const prisma = new PrismaClient();

class TicketRepository {
  async createTicket(ticketDetails: createTicketDto): Promise<Ticket> {
    const response = await prisma.ticket.create({
      data: {
        ...ticketDetails,
      },
    });
    return response;
  }

  async getTicket(id: string): Promise<Ticket | null> {
    const response: Ticket | null = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });
    return response;
  }

  async getAllTickets(): Promise<Ticket[]> {
    const response: Ticket[] = await prisma.ticket.findMany();
    return response;
  }

  async deleteTicket(id: string): Promise<Ticket | null> {
    const response: Ticket | null = await prisma.ticket.delete({
      where: {
        id,
      },
    });
    return response;
  }

  async updateTicket(
    id: string,
    ticketDetails: UpdateTicketDto
  ): Promise<Ticket | null> {
    const response: Ticket | null = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        ...ticketDetails,
      },
    });
    return response;
  }
}

export default TicketRepository;

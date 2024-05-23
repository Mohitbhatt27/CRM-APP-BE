import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class createTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmail()
  @IsString()
  assignee: string;

  @IsEmail()
  @IsString()
  assignedTo: string;

  @IsEmail()
  @IsString()
  createdBy: string;

  @IsString()
  clientName: string;

  constructor(title: string, description: string, clientName: string) {
    this.title = title;
    this.description = description;
    this.assignee = "";
    this.assignedTo = "";
    this.createdBy = "";
    this.clientName = clientName;
  }
}

export default createTicketDto;

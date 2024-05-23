import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class createTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  assignee: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  assignedTo: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  clientName: string;

  constructor(
    title: string,
    description: string,
    assignee: string,
    assignedTo: string,
    createdBy: string,
    clientName: string
  ) {
    this.title = title;
    this.description = description;
    this.assignee = assignee;
    this.assignedTo = assignedTo;
    this.createdBy = createdBy;
    this.clientName = clientName;
  }
}

export default createTicketDto;

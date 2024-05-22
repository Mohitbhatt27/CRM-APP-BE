import { NextFunction, Request, Response } from "express";
import SigninUserDto from "../dtos/signinUser_DTO";
import { validate } from "class-validator";
import BadRequestError from "../errors/badRequest";
import { StatusCodes } from "http-status-codes";

export async function signInValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const incomingRequestBody: SigninUserDto = new SigninUserDto(
    req.body.email,
    req.body.password
  );
  const errors = await validate(incomingRequestBody);
  if (errors.length > 0) {
    const errorResponse = errors.map((err) => {
      return {
        property: err.property,
        constraints: err.constraints,
      };
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: new BadRequestError(errorResponse),
      data: {},
      success: false,
      message: "Invalid parameters sent in the request",
    });
  }

  next();
}

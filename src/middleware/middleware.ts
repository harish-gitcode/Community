import { NextFunction, Request, Response } from "express";
import { createErrorResponse } from "../utilities/createResponse.js";
import getUserFromToken from "../utilities/getUserFromToken.js";

type JwtPayload = {
  id: string;
  email: string;
  iat: number;
};

export interface UserRequest extends Request {
  user: {
    email: string;
    id: string;
  };
}

export const authorizeByUserId = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return createErrorResponse(res, "Invalid token", 403);
    const { id, email } = getUserFromToken(token) as JwtPayload;
    req.user = { id, email };
    next();
  } catch (err) {
    const error = err as Error;
    return createErrorResponse(res, error.message);
  }
};

import { Request, Response } from "express";
import {
  createDataResponse,
  createErrorResponse,
} from "../../utilities/createResponse.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import prisma from "../../utilities/prisma.js";

export type JwtPayload = {
  id: string;
  email: string;
  iat: number;
};

const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return createErrorResponse(res, "Invalid token", 403);
    const { id } = getUserFromToken(token) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return createDataResponse(res, user);
  } catch (err) {
    const error = err as Error;
    return createErrorResponse(res, error.message);
  }
};
export default getUser;

import { Request, Response } from "express";
import prisma from "../../utilities/prisma.js";
import {
  createDataResponse,
  createErrorResponse,
} from "../../utilities/createResponse.js";
import validatePassword from "../../utilities/validatePassword.js";
import createJwt from "../../utilities/createJwt.js";
import { validateSingin } from "../../middleware/validation.js";

export type SignInBody = {
  email: string;
  password: string;
};

const signin = async (req: Request, res: Response) => {
  try {
    validateSingin(req.body as SignInBody);
    const { email, password } = req.body as SignInBody;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: true,
        salt: true,
      },
    });
    if (!user) return createErrorResponse(res, "User not found", 404);
    if (!validatePassword(password, user.password, user.salt))
      return createErrorResponse(res, "Invalid password", 403);
    const token = createJwt(user.email, user.id);
    return createDataResponse(
      res,
      {
        ...user,
        password: undefined,
        salt: undefined,
      },
      { access_token: token }
    );
  } catch (err) {
    const error = err as Error;
    return createErrorResponse(res, error.message);
  }
};
export default signin;

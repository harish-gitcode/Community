import { Request, Response } from "express";
import hashPassword from "../../utilities/hashPassword.js";
import prisma from "../../utilities/prisma.js";
import {
  createDataResponse,
  createErrorResponse,
} from "../../utilities/createResponse.js";
import createJwt from "../../utilities/createJwt.js";
import { validateSingup } from "../../middleware/validation.js";

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

const signup = async (req: Request, res: Response) => {
  try {
    validateSingup(req.body as SignupRequest);
    const {
      name,
      email,
      password: plaintextPassword,
    } = req.body as SignupRequest;
    const { salt, hashedPassword: password } = hashPassword(plaintextPassword);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        salt,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    const token = createJwt(email, createdUser.id);
    createDataResponse(res, createdUser, { access_token: token });
  } catch (err) {
    const error = err as Error;
    createErrorResponse(res, error.message);
  }
};

export default signup;

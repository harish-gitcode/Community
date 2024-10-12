import { Request, Response } from "express";
import {
  createDataResponse,
  createErrorResponse,
} from "../../utilities/createResponse.js";
import createSlug from "../../utilities/createSlug.js";
import prisma from "../../utilities/prisma.js";
import { JwtPayload } from "../user/getUser.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import { Roles } from "../role/addRole.js";
import { validateAddCommunity } from "../../middleware/validation.js";

export type CreateCommunityRequest = {
  name: string;
};

const createCommunity = async (req: Request, res: Response) => {
  try {
    validateAddCommunity(req.body as CreateCommunityRequest);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return createErrorResponse(res, "Invalid token", 403);
    const { id } = getUserFromToken(token) as JwtPayload;
    let { name } = req.body as CreateCommunityRequest;
    name = name.trim().split(" ").filter(Boolean).join(" ");
    const slug = createSlug(name);
    const community = await prisma.community.create({
      data: {
        name,
        slug,
        owner: id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        owner: true,
        created_at: true,
        updated_at: true,
      },
    });
    let roleId: string;
    const role = await prisma.role.findUnique({
      where: {
        name: Roles.ADMIN,
      },
      select: {
        id: true,
      },
    });
    if (!role) {
      const { id } = await prisma.role.create({
        data: {
          name: Roles.ADMIN,
        },
      });
      roleId = id;
    } else roleId = role.id;
    await prisma.member.create({
      data: {
        user: id,
        role: roleId,
        community: community.id,
      },
    });
    return createDataResponse(res, community);
  } catch (err) {
    const error = err as Error;
    return createErrorResponse(res, error.message);
  }
};
export default createCommunity;

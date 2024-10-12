import { Request, Response } from "express";
import {
  createDataResponse,
  createErrorResponse,
} from "../../utilities/createResponse.js";
import prisma from "../../utilities/prisma.js";
import getUserFromToken from "../../utilities/getUserFromToken.js";
import { JwtPayload } from "../user/getUser.js";
import { Roles } from "../role/addRole.js";

const deletedMember = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return createErrorResponse(res, "Invalid token", 403);
    const { id: moderatorId } = getUserFromToken(token) as JwtPayload;
    const { id: memberId } = req.params;

    const memberCommunity = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
      select: {
        community: true,
      },
    });
    if (!memberCommunity) return createErrorResponse(res, "Member not found");

    const moderator = await prisma.member.findFirst({
      where: {
        user: moderatorId,
        community: memberCommunity.community,
        memberRole: {
          name: Roles.ADMIN || Roles.MODERATOR,
        },
      },
    });
    if (!moderator) return createErrorResponse(res, "NOT_ALLOWED_ACCESS");
    await prisma.member.delete({
      where: {
        id: memberId,
      },
    });
    return createDataResponse(res, undefined);
  } catch (err) {
    const error = err as Error;
    return createErrorResponse(res, error.message);
  }
};
export default deletedMember;

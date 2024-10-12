import { Router } from "express";
import addMember from "../controllers/member/addMember.js";
import deletedMember from "../controllers/member/deleteMember.js";

const memberRouter = Router();
memberRouter.post("/v1/member", addMember);
memberRouter.delete("/v1/member/:id", deletedMember);
export default memberRouter;

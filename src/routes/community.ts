import { Router } from "express";
import createCommunity from "../controllers/community/createCommunity.js";
import getAllCommunities from "../controllers/community/getAllCommunities.js";
import getAllMembersByCommunityId from "../controllers/community/getAllMembersByCommunityId.js";
import getOwnedCommunitiesByUserId from "../controllers/community/getOwnedCommunitiesByUserId.js";
import getJoinedCommunitiesByUserId from "../controllers/community/getJoinedCommunitiesByUserId.js";

const communityRouter = Router();
communityRouter.get("/v1/community", getAllCommunities);
communityRouter.get("/v1/community/:id/members", getAllMembersByCommunityId);
communityRouter.get("/v1/community/me/owner", getOwnedCommunitiesByUserId);
communityRouter.get("/v1/community/me/member", getJoinedCommunitiesByUserId);
communityRouter.post("/v1/community", createCommunity);
export default communityRouter;

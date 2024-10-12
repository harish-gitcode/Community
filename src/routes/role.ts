import { Router } from "express";
import getAllRoles from "../controllers/role/getAllRoles.js";
import addRole from "../controllers/role/addRole.js";

const roleRouter = Router();
roleRouter.get("/v1/role/", getAllRoles);
roleRouter.post("/v1/role/", addRole);
export default roleRouter;

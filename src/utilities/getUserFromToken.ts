import jwt from "jsonwebtoken";

import env from "./env.js";
const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, env.SERVER_SECRET);
  } catch (err) {
    throw Error("Unauthorized");
  }
};

export default getUserFromToken;

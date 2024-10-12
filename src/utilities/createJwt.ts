import jwt from "jsonwebtoken";
import env from "./env.js";

const createJwt = (email: string, id: string) => {
  return jwt.sign(
    {
      id,
      email,
    },
    env.SERVER_SECRET
  );
};

export default createJwt;

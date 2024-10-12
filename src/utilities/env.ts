import dotenv from "dotenv";
import { cleanEnv, port, str, url } from "envalid";
dotenv.config();

const env = cleanEnv(process.env, {
  DATABASE_URL: url(),
  PORT: port(),
  SERVER_SECRET: str(),
});

export default env;

import express from "express";
import env from "./utilities/env.js";
import bodyParser from "body-parser";
import roleRouter from "./routes/role.js";
import communityRouter from "./routes/community.js";
import userRouter from "./routes/user.js";
import memberRouter from "./routes/member.js";

const app = express();
const PORT = env.PORT;

app.listen(PORT, () => console.log("server running on" + PORT));

app.use(bodyParser.json());

app.use(roleRouter);
app.use(userRouter);
app.use(communityRouter);
app.use(memberRouter);

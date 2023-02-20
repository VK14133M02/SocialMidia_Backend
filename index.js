const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Router/User.route");
const { postRouter } = require("./Router/Post.route");
const { Authorization } = require("./Middlewares/Authorization.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

app.use(Authorization);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("server is connected");
  } catch (err) {
    console.log("something went wrong");
  }
  console.log(`server is connected at port ${process.env.port}`);
});

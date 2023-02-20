const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, age, password, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res
          .status(400)
          .send({ msg: "something went wrong", Error: err.message });
      } else {
        let user = new UserModel({
          name,
          email,
          gender,
          age,
          city,
          password: hash,
        });
        await user.save();
        res.status(200).send({ msg: "New user has been registered" });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", Error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "masai");
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.send(
            res
              .status(400)
              .send({ msg: "something went wrong", Error: err.message })
          );
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", Error: err.message });
  }
});

module.exports = { userRouter };

const express = require("express");
const { PostModel } = require("../Model/Posts.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const { device, device1, device2 } = req.query;
  try {
    let post = await PostModel.find({ user: req.body.user });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", Error: err.message });
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.status(200).send({ msg: "New Post has been added" });
  } catch (err) {
    res.status(400).send({ msg: "something went wrong", Error: err.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  const post = await PostModel.findOne({ _id: ID });
  const user_in_post = post.user;
  const user_making_post = req.body.user;
  try {
    if (user_in_post !== user_making_post) {
      res.send({ msg: "You are not Authorised" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send({ msg: "posts has been updated" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", Error: err.message });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;

  const post = await PostModel.findOne({ _id: ID });
  const user_in_post = post.user;
  const user_making_post = req.body.user;
  try {
    if (user_in_post !== user_making_post) {
      res.send({ msg: "You are not Authorised" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: ID });
      res.send({ msg: "posts has been deleted" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", Error: err.message });
  }
});

module.exports = { postRouter };

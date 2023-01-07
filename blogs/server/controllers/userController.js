const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();

const User = require("../models/user");

const PASSWORD_LENGTH = 3;

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.password.length <= PASSWORD_LENGTH)
    return response.status(403).json({
      error: "Invalid password length, must be < 3",
    });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

module.exports = usersRouter;

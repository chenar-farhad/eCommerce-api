import { Router } from "express";
import jwt from "jsonwebtoken";
import winston from "winston";
import UserModel from "../models/users.model.js";
import userValidation from "../validations/users.validate.js";

const route = Router();

/*------- LOGIN --------*/
route.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  // const user = await UserModel.findOne({ username, password });

  let user;
  if (email) {
    user = await UserModel.findOne({ email, password });
  } else if (username) {
    user = await UserModel.findOne({ username, password });
  } else {
    return res.status(400).json({ error: "Login Failed!" });
  }

  const token = jwt.sign(JSON.stringify(user), process.env.JWT_PRIVATE_KEY);
  console.log(`welcome ${user.username}`);
  winston.info(
    `Login user, Username: \"${username}\" and Password: \"${password}\"`
  );
  res.json({ token });
});

/*------- REGISTER --------*/
route.post("/register", async (req, res) => {
  try {
    await userValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const user = new UserModel(req.body);
  try {
    await user.save();
    winston.info(
      `Register new user, Email:\"${user.email}\" and Username:\"${user.username}\" and Password:\"${user.password}\" Role:\"${user.role}\"`
    );
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }

  res.json("You are registered!");
});

export default route;

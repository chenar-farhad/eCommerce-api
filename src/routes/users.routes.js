import { Router } from "express";
import UsersModel from "../models/users.model.js";
import usersValidation from "../validations/users.validate.js";
import { isAuth, isAdmin } from "../middleware/auth.middleware.js";
import winston from "winston";

const router = Router();

/* -------START USER------- */
/*--START insert --*/
router.post("/users", isAdmin, async (req, res) => {
  try {
    await usersValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }

  const user = new UsersModel(req.body);
  try {
    await user.save();
    winston.info(
      `Create new user, Email:\"${user.email}\" and Username:\"${user.username}\" and Password:\"${user.password}\" Role:\"${user.role}\"`
    );
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json({ message: "users created" });
});
/*  --------------END insert--------------  */

/*--START Search --*/
router.get("/users", async (req, res) => {
  const users = await UsersModel.find({});
  res.json(users);
});
/*  --------------END Search--------------  */

/*-- START Search By ID --*/
router.get("/users/:id", async (req, res) => {
  const users = await UsersModel.findById(req.params.id);
  res.json(users);
});
/*  --------------END search by ID--------------  */

/*-- START Search By Name with Query --*/
router.get("/usersearch", async (req, res) => {
  console.log(req.query);
  const users = await UsersModel.findOne({ name: req.query.name });
  res.json(users);
});
/*  --------------END search by Name Query--------------  */

/*  --------------START Update--------------  */
router.put("/users/:id", isAuth, async (req, res) => {
  try {
    await usersValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }
  try {
    await UsersModel.findByIdAndUpdate(req.params.id, req.body);
    winston.info(`Update user by ID, id:\"${req.params.id}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("users info updated!");
});
/*  --------------END Update--------------  */

/*  --------------START Delete--------------  */
router.delete("/users/:id", async (req, res) => {
  try {
    await UsersModel.findByIdAndRemove(req.params.id);
    winston.info(`Delete user by ID, id:\"${req.params.id}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("users deleted!");
});
/*  --------------END Delete--------------  */

/* -------END USER------- */

export default router;

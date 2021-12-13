import { Router } from "express";
import storeModel from "../models/store.model.js";
import storeValidation from "../validations/store.validate.js";
import { isAuth, isAdmin } from "../middleware/auth.middleware.js";
import winston from "winston";

const router = Router();

/* -------START USER------- */
/*--START create store --*/
router.post("/store", isAdmin, async (req, res) => {
  try {
    await storeValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }

  const store = new storeModel(req.body);
  try {
    await store.save();
    winston.info(
      `Create new store, Email:\"${store.email}\" and Username:\"${store.username}\" and Password:\"${store.password}\" phone:\"${store.phone}\"`
    );
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json({ message: "store created" });
});
/*  --------------END create store--------------  */

/*--START Search --*/
router.get("/store", async (req, res) => {
  const store = await storeModel.find({});
  res.json(store);
});
/*  --------------END Search--------------  */

/*-- START Search By ID --*/
router.get("/store/:username", async (req, res) => {
  const store = await storeModel.findOne({ username: req.params.username });
  res.json(store);
});
/*  --------------END search by ID--------------  */

/*-- START Search By Username with Query --*/
router.get("/storesearch", async (req, res) => {
  console.log(req.query);
  const store = await storeModel.findOne({ username: req.query.username });
  res.json(store);
});
/*  --------------END search by Username Query--------------  */

/*  --------------START Update--------------  */
router.put("/store/:username", isAuth, async (req, res) => {
  try {
    await storeValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }
  try {
    await storeModel.findOneAndUpdate(req.params.username, req.body);
    winston.info(`Update user by ID, username:\"${req.params.username}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("store info updated!");
});
/*  --------------END Update--------------  */

/*  --------------START Delete--------------  */
router.delete("/store/:username", isAuth, async (req, res) => {
  try {
    await storeModel.findOneAndRemove(req.params.username);
    winston.info(
      `Delete store by Username, username:\"${req.params.username}\"`
    );
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("store deleted!");
});
/*  --------------END Delete--------------  */

/* -------END USER------- */

export default router;

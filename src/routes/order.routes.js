import { Router } from "express";
import orderModel from "../models/order.model.js";
import orderValidation from "../validations/order.validate.js";
import { isAuth, isAdmin } from "../middleware/auth.middleware.js";
import winston from "winston";

const router = Router();

/* -------START USER------- */
/*--START create order --*/
router.post("/order", isAdmin, async (req, res) => {
  try {
    await orderValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }

  const order = new orderModel(req.body);
  try {
    await order.save();
    winston.info(`Create new order`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json({ message: "order created" });
});
/*  --------------END create order--------------  */

/*--START Search --*/
router.get("/order", async (req, res) => {
  const order = await orderModel.find({});
  res.json(order);
});
/*  --------------END Search--------------  */

/*-- START Search By ID --*/
router.get("/order/:username", async (req, res) => {
  const order = await orderModel.findOne({ username: req.params.username });
  res.json(order);
});
/*  --------------END search by ID--------------  */

/*-- START Search By Username with Query --*/
router.get("/ordersearch", async (req, res) => {
  console.log(req.query);
  const order = await orderModel.findOne({ username: req.query.username });
  res.json(order);
});
/*  --------------END search by Username Query--------------  */

/*  --------------START Update--------------  */
router.put("/order/:username", isAuth, async (req, res) => {
  try {
    await orderValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(408).send(error.message);
  }
  try {
    await orderModel.findOneAndUpdate(req.params.username, req.body);
    winston.info(`Update user by ID, username:\"${req.params.username}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("order info updated!");
});
/*  --------------END Update--------------  */

/*  --------------START Delete--------------  */
router.delete("/order/:username", isAuth, async (req, res) => {
  try {
    await orderModel.findOneAndRemove(req.params.username);
    winston.info(
      `Delete order by Username, username:\"${req.params.username}\"`
    );
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("order deleted!");
});
/*  --------------END Delete--------------  */

/* -------END USER------- */

export default router;

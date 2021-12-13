import { Router } from "express";
import { isAuth } from "../middleware/auth.middleware.js";
import ProductModel from "../models/products.model.js";
import productValidation from "../validations/product.validate.js";
import winston from "winston";
const router = Router();

/* -------START PRODUCT------- */
/*--START insert --*/
router.post("/product", isAuth, async (req, res) => {
  try {
    await productValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  const product = new ProductModel(req.body);
  try {
    await product.save();
    winston.info(`Create product,  Name:\"${product.name}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }

  res.json({ message: "product created" });
});
/*  --------------END insert--------------  */

/*--START Search --*/
router.get("/product", async (req, res) => {
  const product = await ProductModel.find({});
  res.json(product);
});
/*  --------------END Search--------------  */

/*-- START Search By ID --*/
router.get("/product/:id", async (req, res) => {
  let product;
  try {
    product = await ProductModel.findById(req.params.id);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happned!");
  }
  res.json(product);
});
/*  --------------END search by ID--------------  */

/*  --------------START Update--------------  */
router.put("/product/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    winston.info(`Update product by ID,  id:\"${req.params.id}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happned!");
  }
  res.json("product updated!");
});
/*  --------------END Update--------------  */

/*  --------------START Delete--------------  */
router.delete("/product/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndRemove(req.params.id);
    winston.info(`Update product by ID ,  id:\"${req.params.id}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happned!");
  }
  res.json("product deleted!");
});
/*  --------------END Delete--------------  */

/* -------END PRODUCT------- */

export default router;

import { Router } from "express";
import CategoriesModel from "../models/categories.model.js";
import categoriesValidation from "../validations/categories.validate.js";
import { isAuth, isAdmin } from "../middleware/auth.middleware.js";
import winston from "winston";

const router = Router();

/* -------START CATEGORIES------- */
/*--START insert --*/
router.post("/categories", isAdmin, async (req, res) => {
  try {
    await categoriesValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  const categories = new CategoriesModel(req.body);
  try {
    await categories.save();
    winston.info(`Create category: CategoryName:\"${categories.category}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json({ message: "Category created" });
});
/*  --------------END insert--------------  */

/*--START Search --*/
router.get("/categories", async (req, res) => {
  const categories = await CategoriesModel.find({});
  res.json(categories);
});
/*  --------------END Search--------------  */

/*-- START Search By category --*/
router.get("/categories/:category", async (req, res) => {
  const categories = await CategoriesModel.findOne(req.params.category);
  res.json(categories);
});
/*  --------------END search by ID--------------  */

/*  --------------START Update--------------  */
router.put("/categories/:category", async (req, res) => {
  try {
    await categoriesValidation.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.message);
  }

  try {
    await CategoriesModel.findOneAndUpdate(req.params.category, req.body);
    winston.info(`Update category: CategoryName:\"${req.body.category}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("categories info updated!");
});
/*  --------------END Update--------------  */

/*  --------------START Delete--------------  */
router.delete("/categories/:category", async (req, res) => {
  try {
    await CategoriesModel.findOneAndDelete(req.params.category);
    winston.info(`Delete category: CategoryName:\"${req.params.category}\"`);
  } catch (error) {
    winston.error(error.message);
    return res.status(500).json("Unknown error happened!");
  }
  res.json("categories is deleted!");
});
/*  --------------END Delete--------------  */

/* -------END CATEGORIES------- */

export default router;

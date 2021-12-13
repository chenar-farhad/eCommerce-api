import Joi from "joi";

const productValidation = Joi.object({
  storeUsername: Joi.string().min(3).max(25).required(),
  productName: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow(""),
  category: Joi.string().min(3).max(15).required(),
  tags: Joi.array(),
  qty: Joi.number().min(0),
  price: Joi.number().min(0).required(),
  img: Joi.string(),
});

export default productValidation;

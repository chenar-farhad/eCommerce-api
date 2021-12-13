import Joi from "joi";

const orderValidation = Joi.object({
  storeId: Joi.string().required(),
  productId: Joi.string().required(),
  userId: Joi.string().min(3).max(15).required(),
  qty: Joi.number().min(0).required(),
  totalPrice: Joi.number().min(0).required(),
  dateTime: Joi.date().required(),
  statuses: Joi.string().required(),
});

export default orderValidation;

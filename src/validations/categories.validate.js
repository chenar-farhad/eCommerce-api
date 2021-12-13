import Joi from "joi";

const categoriesValidation = Joi.object({
  category: Joi.string().min(3).max(25).required(),
});

export default categoriesValidation;

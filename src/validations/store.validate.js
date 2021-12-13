import Joi from "joi";

const storeValidation = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  bio: Joi.string(),
  address: Joi.string(),
  username: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string(),
  phone: Joi.string().length(10).required(),
  phone2: Joi.string().length(10),
  verify: Joi.string(),
});

export default storeValidation;

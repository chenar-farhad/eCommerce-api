import Joi from "joi";

const userValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(25)
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "First name: Tanha alphabet bakar bena!",
    }),
  lastName: Joi.string()
    .min(3)
    .max(25)
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "Last name: Tanha alphabet bakar bena!",
    }),
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(25).required(),
  password: Joi.string().min(3).max(15).required(),
  role: Joi.string(),
  image:Joi.string(),
  address:Joi.string(),
  phone:Joi.string().length(10),
  phone2:Joi.string().length(10),


});

export default userValidation;

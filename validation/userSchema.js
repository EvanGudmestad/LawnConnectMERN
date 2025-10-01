import Joi from 'joi';

// Define a schema for user registration data (POST /api/users)
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('customer', 'provider').required(),
  profile: Joi.object().optional(),
  createdAt: Joi.date().required()
}).required();

const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  role: Joi.string().valid('customer', 'provider').optional(),
  profile: Joi.object().optional(),
  createdAt: Joi.date().optional()
}).min(1).required();

export { registerSchema, updateUserSchema };
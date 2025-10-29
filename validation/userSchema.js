import Joi from 'joi';

// Common fields present in all profiles
const commonProfileFields = {
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
  avatar: Joi.string().uri().optional()
};

// Customer-specific profile fields
const customerProfileSchema = Joi.object({
  ...commonProfileFields,
  address_history: Joi.array().items(
    Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      isDefault: Joi.boolean().default(false),
      addedAt: Joi.date().default(() => new Date())
    })
  ).default([]),
  preferences: Joi.object({
    notifications: Joi.boolean().default(true),
    newsletter: Joi.boolean().default(false)
  }).default({}),
  saved_providers: Joi.array().items(Joi.string()).default([])
}).optional();

// Provider-specific profile fields
const providerProfileSchema = Joi.object({
  ...commonProfileFields,
  company_name: Joi.string().required(),
  bio: Joi.string().allow('').optional(),
  stripe_connect_account_id: Joi.string().allow('', null).optional(),
  services: Joi.array().items(Joi.string()).default([]), // Array of service ObjectIds
  service_area: Joi.array().items(
    Joi.object({
      city: Joi.string().required(),
      state: Joi.string().required(),
      radius: Joi.number().default(25) // miles
    })
  ).default([]),
  rating: Joi.number().min(0).max(5).default(0),
  total_reviews: Joi.number().default(0),
  verified: Joi.boolean().default(false)
}).optional();

// Define a schema for user registration data (POST /api/users)
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('customer', 'provider').required(),
  // Polymorphic profile field - structure depends on role
  profile: Joi.when('role', {
    is: 'customer',
    then: customerProfileSchema,
    otherwise: Joi.when('role', {
      is: 'provider',
      then: providerProfileSchema.required(),
      otherwise: Joi.object().optional()
    })
  }),
  createdAt: Joi.date().optional()
}).required();

const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  role: Joi.string().valid('customer', 'provider').optional(),
  profile: Joi.object().optional(), // Allow any profile updates
  createdAt: Joi.date().optional()
}).min(1).required();

export { registerSchema, updateUserSchema };
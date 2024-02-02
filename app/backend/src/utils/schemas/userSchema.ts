import Joi = require('joi');

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'All fields must be filled',
  }),
});

export const xablau = '';
import Joi = require('joi');

const blankFieldsError = 'All fields must be filled';
const InvalidEmailOrPassword = 'Invalid email or password';

export const loginSchema = Joi.object({
  email: Joi.string().email().empty().required()
    .messages({
      'any.required': blankFieldsError,
      'string.empty': blankFieldsError,
      'string.email': InvalidEmailOrPassword,

    }),
  password: Joi.string().min(6).empty().required()
    .messages({
      'any.required': blankFieldsError,
      'string.empty': blankFieldsError,
      'string.min': InvalidEmailOrPassword,
    }),
});

export const xablau = '';

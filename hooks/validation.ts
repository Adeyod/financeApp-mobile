import Joi from 'joi';

export const joiRegisterValidationSchema = Joi.object({
  first_name: Joi.string().min(3).required().label('First Name'),
  user_name: Joi.string().required().label('User Name'),
  last_name: Joi.string().required().label('Last Name'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().min(8).max(32).required().label('Password'),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': 'Passwords do not match' }),
  phone_number: Joi.string().min(11).required().label('Phone Number'),
});

export const joiOtherBanksValidationSchema = Joi.object({
  amount: Joi.number().min(2).required(),
  narration: Joi.string().allow('').optional(),
});

export const joiReceivingAccountSchema = Joi.object({
  receiving_account: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .required(),
});

export const joiResetPasswordValidationSchema = Joi.object({
  password: Joi.string().required().min(8).max(32).label('Password'),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': 'Passwords do not match' }),
});

export const joiForgotPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
});

export const joiLoginValidationSchema = Joi.object({
  login_input: Joi.string()
    .required()
    .custom((value, helpers) => {
      const emailValidation = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(value);
      if (emailValidation.error) {
        const usernameRegexPattern = /^[a-zA-Z0-9_]{3,}$/;
        if (!usernameRegexPattern.test(value)) {
          return helpers.error('any.invalid', {
            custom: 'Invalid email or username',
          });
        }
      }
      return value;
    })
    .messages({
      'string.empty': 'Login input is required',
      'any.invalid': '{{#custom}}',
    }),

  password: Joi.string().min(8).max(32).required().label('Password'),
});

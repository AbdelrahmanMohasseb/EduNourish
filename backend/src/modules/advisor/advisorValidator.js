const { body,validationResult } = require('express-validator');

exports.validateAdvisor = [
  body('id')
    .isString().notEmpty().withMessage('Must string and not null'),
  body('userName')
  .isString().notEmpty().withMessage('Must string and not null'),
    body('email')
    .isEmail().notEmpty().withMessage('Must Email and not null '),
  body('password')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('phoneNumber')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('photo')
  .isString().withMessage('Must string '),
  body('address')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('age')
  .isInt().notEmpty().withMessage('Must string and not null'),
  body('gender')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('schoolName')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('careerHistory')
  .notEmpty().withMessage('Must string and not null'),
  async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();  }

];
const { body,validationResult } = require('express-validator');

exports.validateBus = [
  body('number')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('driverName')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('arrivalTime')
  .notEmpty().withMessage('Must not null'),
  body('departureTime')
  .notEmpty().withMessage('Must not null'),
  async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();  }

];
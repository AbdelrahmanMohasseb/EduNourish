const { body,validationResult } = require('express-validator');

exports.validateAttendance = [
  body('id')
    .isString().notEmpty().withMessage('Must string and not null'),
  body('date')
  .notEmpty().withMessage('Must not null'),
  body('status')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('remarks')
  .isString().notEmpty().withMessage('Must string and not null'),
  body('studentId')
  .isString().withMessage('Must string '),
  body('teacherID')
  .isString().withMessage('Must string '),
  
  async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();  }

];
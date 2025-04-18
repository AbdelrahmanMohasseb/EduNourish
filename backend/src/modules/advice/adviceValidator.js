const { body,validationResult } = require('express-validator');

exports.validateAdvice = [
  body('parentAdvice')
    .notEmpty().withMessage('Parent advice is required'),
  body('teacherAdvice')
    .notEmpty().withMessage('Teacher advice is required'),
  body('parentId')
    .isInt().withMessage('Valid parentId is required'),
  body('teacherId')
    .isInt().withMessage('Valid teacherId is required'),
  async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        next();  }

];
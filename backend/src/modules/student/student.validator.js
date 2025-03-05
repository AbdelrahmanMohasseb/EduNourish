// const {body}=require('express-validator');

// const singUpvalidation=[
//     body("userName").isString(),
//     body("email").isString().isEmail(),
//     body('password').isLength({ min: 5 }),
//     body('cPassword').custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error('Password confirmation does not match password');
//         }
    
//         // Indicates the success of this synchronous custom validator
//         return true;
//       }),
//       body("photo").isString()
// ]
// module.exports={singUpvalidation}


const { body, validationResult } = require("express-validator");

// التحقق من بيانات الطالب عند التسجيل
exports.validateStudentSignup = [
    body("userName")
        .notEmpty().withMessage("User name is required")
        .isLength({ min: 3, max: 50 }).withMessage("User name must be between 3 and 50 characters"),
    
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    
    body("classNumber")
        .notEmpty().withMessage("Class number is required")
        .isInt().withMessage("Class number must be a number"),

    // Middleware لمعالجة الأخطاء
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: "Validation error",
                errors: errors.array().map(err => err.msg) 
            });
        }
        next();
    }
];


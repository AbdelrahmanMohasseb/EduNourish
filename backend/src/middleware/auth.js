const jwt = require("jsonwebtoken");
const { Student, Parent, Teacher, Advisor, Organizer } = require("../../DB/models/index");

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, "SECRET_KEY"); 

        const admin = await Organizer.findByPk(decoded.id) || await Advisor.findByPk(decoded.id);

        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", " ");
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, "SECRET_KEY");

        const student = await Student.findByPk(decoded.id);

        if (!student) {
            return res.status(403).json({ message: "Access denied. Students only." });
        }

        req.user = student;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

exports.isParent = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "SECRET_KEY");

        const parent = await Parent.findByPk(decoded.id);
        if (!parent) {
            return res.status(403).json({ message: "Access denied. Parents only." });
        }

        req.parent = parent;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

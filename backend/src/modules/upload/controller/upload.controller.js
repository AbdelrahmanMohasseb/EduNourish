// const cloudinary = require("cloudinary").v2;
// const models = require("../../../../DB/models");

// // إعدادات Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadProfilePicture = async (req, res) => {
//     try {
//         const { userType, userId } = req.body;

       
//         if (!userType || !userId) {
//             return res.status(400).json({ error: "User type and ID are required" });
//         }

       
//         const allowedUserTypes = ["student", "teacher", "parent", "organizer", "advisor"];
//         if (!allowedUserTypes.includes(userType.toLowerCase())) {
//             return res.status(400).json({ error: `Invalid user type: ${userType}` });
//         }

       
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded" });
//         }

      
//         const folderName = `EduNourish/${userType}/${userId}`;
//         const result = await cloudinary.uploader.upload(req.file.path, { folder: folderName });

       
//         const Model = models[userType.toLowerCase()];
//         if (Model) {
//             await Model.update(
//                 { profilePicture: result.secure_url },
//                 { where: { id: userId } }
//             );
//         }

//         res.json({
//             message: "File uploaded successfully",
//             userType,
//             userId,
//             url: result.secure_url
//         });

//     } catch (error) {
//         res.status(500).json({ error: "Upload failed", details: error.message });
//     }
// };

// module.exports = { uploadProfilePicture };



const cloudinary = require("../../../../DB/config/cloudinary"); 
const models = require("../../../../DB/models"); 

const uploadProfilePicture = async (req, res) => {
    try {
        const { userType, userId } = req.body;

        
        if (!userType || !userId) {
            return res.status(400).json({ error: "User type and ID are required" });
        }

       
        const allowedUserTypes = ["student", "teacher", "parent", "organizer", "advisor"];
        if (!allowedUserTypes.includes(userType.toLowerCase())) {
            return res.status(400).json({ error: `Invalid user type: ${userType}` });
        }

        // التحقق من وجود ملف مرفوع
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        
        const folderName = `EduNourish/${userType}/${userId}`;
        const result = await cloudinary.uploader.upload(req.file.path, { folder: folderName });

        
        const Model = models[userType.toLowerCase()];
        if (Model) {
            await Model.update(
                { profilePicture: result.secure_url },
                { where: { id: userId } }
            );
        }

        
        res.json({
            message: "File uploaded successfully",
            userType,
            userId,
            url: result.secure_url
        });

    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
};

module.exports = { uploadProfilePicture };
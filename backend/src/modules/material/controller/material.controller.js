const { Material,subject } = require("../../../../DB/models/index");
const cloudinary = require("../../../../DB/config/cloudinary");
const fs = require("fs");

// exports.createMaterial = async (req, res) => {
//   try {
//     console.log("🔍 Received files:", req.files); // تحقق من الملفات المرفوعة
//     console.log("🔍 Received body:", req.body); // تحقق من البيانات المرسلة

//     const { title, description, externalLink } = req.body;

//     if (!title) {
//       return res.status(400).json({ success: false, error: "Title is required" });
//     }

//     let pdfUrl = "";
//     let imageUrl = "";

//     // رفع ملف PDF إذا موجود
//     if (req.files?.pdf) {
//       const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
//         folder: "materials/pdf",
//         resource_type: "raw"
//       });
//       pdfUrl = pdfResult.secure_url;
//       fs.unlinkSync(req.files.pdf[0].path); // حذف الملف المؤقت بعد الرفع
//     }

//     // رفع صورة إذا موجودة
//     if (req.files?.image) {
//       const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
//         folder: "materials/images"
//       });
//       imageUrl = imageResult.secure_url;
//       fs.unlinkSync(req.files.image[0].path); // حذف الملف المؤقت بعد الرفع
//     }

//     const newMaterial = await Material.create({
//       title,
//       description,
//       pdfUrl,
//       externalLink,
//       imageUrl,
//     });

//     res.status(201).json({ success: true, data: newMaterial });
//   } catch (error) {
//     console.error("❌ Error creating material:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getAllMaterials = async (req, res) => {
//   const materials = await Material.findAll();
//   res.status(200).json({ success: true, data: materials });
// };

// exports.getMaterialById = async (req, res) => {
//   const material = await Material.findByPk(req.params.id);
//   if (!material)
//     return res.status(404).json({ success: false, message: "Material not found" });
//   res.status(200).json({ success: true, data: material });
// };



// exports.updateMaterial = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { title, description, externalLink, SubjectID } = req.body;
  
//       // البحث عن المادة المطلوبة
//       const material = await Material.findByPk(id);
//       if (!material) {
//         return res.status(404).json({
//           success: false,
//           message: "Material not found"
//         });
//       }
  
//       // معالجة ملف PDF إذا تم رفعه
//       if (req.files?.pdf) {
//         try {
//           // حذف الملف القديم من Cloudinary إذا كان موجوداً
//           if (material.pdf) {
//             const publicId = material.pdf.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
//             await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
//           }
  
//           // رفع الملف الجديد
//           const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
//             folder: "materials/pdf",
//             resource_type: "raw"
//           });
//           material.pdf = pdfResult.secure_url;
//           await fs.promises.unlink(req.files.pdf[0].path); // حذف الملف المؤقت
//         } catch (uploadError) {
//           console.error("PDF Update Error:", uploadError);
//           return res.status(500).json({
//             success: false,
//             error: "Failed to update PDF file"
//           });
//         }
//       }
  
//       // معالجة الصورة إذا تم رفعها
//       if (req.files?.image) {
//         try {
//           // حذف الصورة القديمة من Cloudinary إذا كانت موجودة
//           if (material.image) {
//             const publicId = material.image.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
//             await cloudinary.uploader.destroy(publicId);
//           }
  
//           // رفع الصورة الجديدة
//           const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
//             folder: "materials/images"
//           });
//           material.image = imageResult.secure_url;
//           await fs.promises.unlink(req.files.image[0].path); // حذف الملف المؤقت
//         } catch (uploadError) {
//           console.error("Image Update Error:", uploadError);
//           return res.status(500).json({
//             success: false,
//             error: "Failed to update image file"
//           });
//         }
//       }
  
//       // تحديث الحقول النصية
//       if (title) material.title = title;
//       if (description) material.description = description;
//       if (externalLink) material.externalLink = externalLink;
//       if (SubjectID) material.SubjectID = SubjectID;
  
//       // حفظ التغييرات
//       await material.save();
  
//       res.status(200).json({
//         success: true,
//         data: material
//       });
//     } catch (error) {
//       console.error("❌ Error updating material:", error);
//       res.status(500).json({
//         success: false,
//         error: error.message || "Internal server error"
//       });
//     }
//   };

// exports.deleteMaterial = async (req, res) => {
//   const material = await Material.findByPk(req.params.id);
//   if (!material)
//     return res.status(404).json({ success: false, message: "Material not found" });
//   await material.destroy();
//   res.status(200).json({ success: true, message: "Material deleted" });
// };



//تجربه


exports.createMaterial = async (req, res) => {
    try {
      console.log("🔍 Received files:", req.files); // تحقق من الملفات المرفوعة
      console.log("🔍 Received body:", req.body); // تحقق من البيانات المرسلة
  
      const { title, description, externalLink, SubjectID } = req.body;
  
      if (!title) {
        return res.status(400).json({ success: false, error: "Title is required" });
      }
  
      let pdfUrl = "";
      let imageUrl = "";
  
      // رفع ملف PDF إذا موجود
      if (req.files?.pdf) {
        try {
          const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
            folder: "materials/pdf",
            resource_type: "raw"
          });
          pdfUrl = pdfResult.secure_url;
          fs.unlinkSync(req.files.pdf[0].path); // حذف الملف المؤقت بعد الرفع
        } catch (error) {
          console.error("Error uploading PDF:", error);
          return res.status(500).json({ success: false, error: "Error uploading PDF" });
        }
      }
  
      // رفع صورة إذا موجودة
      if (req.files?.image) {
        try {
          const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
            folder: "materials/images"
          });
          imageUrl = imageResult.secure_url;
          fs.unlinkSync(req.files.image[0].path); // حذف الملف المؤقت بعد الرفع
        } catch (error) {
          console.error("Error uploading image:", error);
          return res.status(500).json({ success: false, error: "Error uploading image" });
        }
      }
  
      const newMaterial = await Material.create({
        title,
        description,
        pdfUrl,
        externalLink,
        imageUrl,
        SubjectID
      });
  
      res.status(201).json({ success: true, data: newMaterial });
    } catch (error) {
      console.error("❌ Error creating material:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  
  exports.getAllMaterials = async (req, res) => {
    const materials = await Material.findAll();
    res.status(200).json({ success: true, data: materials });
  };
  
  exports.getMaterialById = async (req, res) => {
    const material = await Material.findByPk(req.params.id, {
      include: {
        model: subject, // العلاقة مع الـ Subject
        attributes: ['name'] // تحديد الحقول المطلوبة من الـ Subject
      }
    });
    if (!material)
      return res.status(404).json({ success: false, message: "Material not found" });
    res.status(200).json({ success: true, data: material });
  };
  
  
  
  exports.updateMaterial = async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description, externalLink, SubjectID } = req.body;
    
        // البحث عن المادة المطلوبة
        const material = await Material.findByPk(id);
        if (!material) {
          return res.status(404).json({
            success: false,
            message: "Material not found"
          });
        }
    
        // معالجة ملف PDF إذا تم رفعه
        if (req.files?.pdf) {
          try {
            // حذف الملف القديم من Cloudinary إذا كان موجوداً
            if (material.pdf) {
              const publicId = material.pdf.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
              await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
            }
    
            // رفع الملف الجديد
            const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
              folder: "materials/pdf",
              resource_type: "raw"
            });
            material.pdf = pdfResult.secure_url;
            await fs.promises.unlink(req.files.pdf[0].path); // حذف الملف المؤقت
          } catch (uploadError) {
            console.error("PDF Update Error:", uploadError);
            return res.status(500).json({
              success: false,
              error: "Failed to update PDF file"
            });
          }
        }
    
        // معالجة الصورة إذا تم رفعها
        if (req.files?.image) {
          try {
            // حذف الصورة القديمة من Cloudinary إذا كانت موجودة
            if (material.image) {
              const publicId = material.image.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
              await cloudinary.uploader.destroy(publicId);
            }
    
            // رفع الصورة الجديدة
            const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
              folder: "materials/images"
            });
            material.image = imageResult.secure_url;
            await fs.promises.unlink(req.files.image[0].path); // حذف الملف المؤقت
          } catch (uploadError) {
            console.error("Image Update Error:", uploadError);
            return res.status(500).json({
              success: false,
              error: "Failed to update image file"
            });
          }
        }
    
        // تحديث الحقول النصية
        if (title) material.title = title;
        if (description) material.description = description;
        if (externalLink) material.externalLink = externalLink;
        if (SubjectID) material.SubjectID = SubjectID;
    
        // حفظ التغييرات
        await material.save();
    
        res.status(200).json({
          success: true,
          data: material
        });
      } catch (error) {
        console.error("❌ Error updating material:", error);
        res.status(500).json({
          success: false,
          error: error.message || "Internal server error"
        });
      }
    };
  
  exports.deleteMaterial = async (req, res) => {
    const material = await Material.findByPk(req.params.id);
    if (!material)
      return res.status(404).json({ success: false, message: "Material not found" });
    await material.destroy();
    res.status(200).json({ success: true, message: "Material deleted" });
  };
  
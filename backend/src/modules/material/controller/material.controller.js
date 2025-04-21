const { Material, Subject } = require("../../../../DB/models");
const cloudinary = require("../../../../DB/config/cloudinary");
const fs = require("fs");

exports.createMaterial = async (req, res) => {
  try {
    console.log("🔍 Received files:", req.files);
    console.log("🔍 Received body:", req.body);

    const { title, description, externalLink, subjectId } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    let pdfUrl = "";
    let imageUrl = "";

    if (req.files?.pdf) {
      const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
        folder: "materials/pdf",
        resource_type: "raw"
      });
      pdfUrl = pdfResult.secure_url;
      fs.unlinkSync(req.files.pdf[0].path);
    }

    if (req.files?.image) {
      const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "materials/images"
      });
      imageUrl = imageResult.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    const newMaterial = await Material.create({
      title,
      description,
      pdfUrl,
      externalLink,
      imageUrl,
      subjectId
    });

    res.status(201).json({ success: true, data: newMaterial });
  } catch (error) {
    console.error("❌ Error creating material:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllMaterials = async (req, res) => {
  const materials = await Material.findAll({
    include: {
      model: Subject,
      attributes: ["SubjectID", "name", "code"]
    }
  });
  res.status(200).json({ success: true, data: materials });
};

exports.getMaterialById = async (req, res) => {
  const material = await Material.findByPk(req.params.id, {
    include: {
      model: Subject,
      attributes: ["SubjectID", "name", "code"]
    }
  });
  if (!material)
    return res.status(404).json({ success: false, message: "Material not found" });
  res.status(200).json({ success: true, data: material });
};

exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, externalLink, subjectId } = req.body;

    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found"
      });
    }

    if (req.files?.pdf) {
      if (material.pdfUrl) {
        const publicId = material.pdfUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      }

      const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
        folder: "materials/pdf",
        resource_type: "raw"
      });
      material.pdfUrl = pdfResult.secure_url;
      await fs.promises.unlink(req.files.pdf[0].path);
    }

    if (req.files?.image) {
      if (material.imageUrl) {
        const publicId = material.imageUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      }

      const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "materials/images"
      });
      material.imageUrl = imageResult.secure_url;
      await fs.promises.unlink(req.files.image[0].path);
    }

    if (title) material.title = title;
    if (description) material.description = description;
    if (externalLink) material.externalLink = externalLink;
    if (subjectId) material.subjectId = subjectId;

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
  try {
    const material = await Material.findByPk(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }

    if (material.pdfUrl) {
      const publicId = material.pdfUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    }

    if (material.imageUrl) {
      const publicId = material.imageUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }

    await material.destroy();
    res.status(200).json({ success: true, message: "Material deleted" });
  } catch (error) {
    console.error("❌ Error deleting material:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const { Parent ,Student,Advice,Menu,Bus,Attendance} = require("../../../../DB/models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../../../DB/config/cloudinary"); 


exports.createParent = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);              

    const parent = await Parent.create({ ...req.body, password: hashedPassword });

    res.status(201).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.findAll();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findOne({where: { id: req.user.id },
      include: [
        {
        model: Student,
        include: [{
            model: Attendance // This assumes you have an Attendance model and proper associations
        }]
      },
        {model: Advice},
        {model:Menu},
        {
          model: Bus,
          attributes: ['number', 'driverName', 'arrivalTime', 'departureTime']
        }
      ]});
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getParentByIdParam = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id,{
      include: [
        {model: Student},
        {model: Advice},
        {model:Menu},
        {
          model: Bus,
          attributes: ['number', 'driverName', 'arrivalTime', 'departureTime']
        }
      ]});
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id);
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    await parent.update(req.body);
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id);
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    await parent.destroy();
    res.status(200).json({ message: "Parent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.updateParenPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo} = req.body;

    const parent = await Parent.findOne({ where: { id } });
    if (!parent) return res.status(404).json({ message: "Parent not found!" });
    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: `EduNourish/parent/${parent.id}`
      });
      photo = cloudinaryResult.secure_url;
    };
    console.log("photo:",photo)

    await Parent.update(
      {  photo },
      { where: { id } }
    );

    res.status(200).json({ message: "parent updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating parent", error: error.message });
  }
};

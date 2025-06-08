const {Organizer} = require("../../../../DB/models/index");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../../../DB/config/cloudinary"); 


// ✅ Create an Organizer
exports.createOrganizer = async (req, res) => {
  try {
    const { id,userName, email, password, phoneNumber, photo, address, age, gender, jobTitle } = req.body;
    // Check if email already exists
    const existingOrganizer = await Organizer.findOne({ where: { email } });
    if (existingOrganizer) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const organizer = await Organizer.create({
      id,
      userName,  
      email,
      password: hashedPassword, // Store encrypted password
      phoneNumber,
      photo,
      address,
      age,
      gender,
      jobTitle,
    });

    res.status(201).json({ message: "Organizer created successfully!", organizer });
  } catch (error) {
    res.status(500).json({ message: "Error creating organizer", error: error.message });
  }
};

// ✅ Get All Organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.findAll();
    res.status(200).json(organizers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizers", error: error.message });
  }
};

// ✅ Get Organizer by ID
exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findOne({
      where: { id: req.user.id },})

    if (!organizer) return res.status(404).json({ message: "Organizer not found!" });

    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizer", error: error.message });
  }
};
exports.getOrganizerByIdParam = async (req, res) => {
  try {
     const { id } = req.params;
     const organizer = await Organizer.findOne({ where: { id } });

    if (!organizer) return res.status(404).json({ message: "Organizer not found!" });

    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizer", error: error.message });
  }
};
// ✅ Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, photo, address, age, gender, jobTitle } = req.body;

    const organizer = await Organizer.findOne({ where: { id } });
    if (!organizer) return res.status(404).json({ message: "Organizer not found!" });

    await Organizer.update(
      { userName, email, phoneNumber, photo, address, age, gender, jobTitle },
      { where: { id } }
    );

    res.status(200).json({ message: "Organizer updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating organizer", error: error.message });
  }
};
// ✅ Update Organizer
exports.updateOrganizerPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo} = req.body;

    const organizer = await Organizer.findOne({ where: { id } });
    if (!organizer) return res.status(404).json({ message: "Oraganizer not found!" });
    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: `EduNourish/organizer/${organizer.id}`
      });
      photo = cloudinaryResult.secure_url;
    };
    console.log("photo:",photo)

    await Organizer.update(
      {  photo },
      { where: { id } }
    );

    res.status(200).json({ message: "Organizer updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating organizer", error: error.message });
  }
};

// ✅ Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await Organizer.findOne({ where: { id } });

    if (!organizer) return res.status(404).json({ message: "Organizer not found!" });

    await Organizer.destroy({ where: { id } });

    res.status(200).json({ message: "Organizer deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting organizer", error: error.message });
  }
};

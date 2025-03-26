const{Advice,Parent,Student} = require("../../../../DB/models/index");



// ✅ Create Advice (Auto-associate parent’s child)
exports.createAdvice = async (req, res) => {
  try {
    const { senderId, senderName, senderPhoto, adviceMessage } = req.body;

    // Fetch child associated with the parent
    const parent = await Parent.findOne({ where: { id: senderId }, include: Student });
    if (!parent || parent.Student.length === 0) {
      return res.status(404).json({ message: "No associated child found for this parent" });
    }

    const studentId = parent.Student[0].id; // Assign first child automatically

    const newAdvice = await Advice.create({
      senderId,
      senderName,
      senderPhoto,
      adviceMessage,
      studentId,
    });

    res.status(201).json({ message: "Advice submitted successfully!", advice: newAdvice });
  } catch (error) {
    res.status(500).json({ message: "Error submitting advice", error: error.message });
  }
};

// ✅ Get All Advice
exports.getAllAdvice = async (req, res) => {
  try {
    const adviceList = await Advice.findAll();
    res.status(200).json(adviceList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching advice", error: error.message });
  }
};

// ✅ Get Advice by ID
exports.getAdviceById = async (req, res) => {
  try {
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: "Advice not found" });
    }
    res.status(200).json(advice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching advice", error: error.message });
  }
};

// ✅ Update Advice
exports.updateAdvice = async (req, res) => {
  try {
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: "Advice not found" });
    }

    await advice.update(req.body);
    res.status(200).json({ message: "Advice updated successfully", advice });
  } catch (error) {
    res.status(500).json({ message: "Error updating advice", error: error.message });
  }
};

// ✅ Delete Advice
exports.deleteAdvice = async (req, res) => {
  try {
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: "Advice not found" });
    }

    await advice.destroy();
    res.status(200).json({ message: "Advice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting advice", error: error.message });
  }
};

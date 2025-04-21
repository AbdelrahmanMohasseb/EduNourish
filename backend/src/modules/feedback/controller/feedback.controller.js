const{Feedback,Parent,Student} = require("../../../../DB/models/index");

// ✅ Create Feedback (Auto-associate parent’s child)
exports.createFeedback = async (req, res) => {
  try {
    const { senderId, senderName, senderPhoto, feedbackMessage, messageType } = req.body;

    // Fetch child associated with the parent
    const parent = await Parent.findOne({ where: { id: senderId }, include: Student });
    if (!parent || parent.Student.length === 0) {
      return res.status(404).json({ message: "No associated child found for this parent" });
    }

    const studentId = parent.Student[0].id; // Assign first child automatically

    const newFeedback = await Feedback.create({
      senderId,
      senderName,
      senderPhoto,
      feedbackMessage,
      messageType,
      studentId,
    });

    res.status(201).json({ message: "Feedback submitted successfully!", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error: error.message });
  }
};

// ✅ Get All Feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
};

// ✅ Get Feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};

// ✅ Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await feedback.update(req.body);
    res.status(200).json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error: error.message });
  }
};

// ✅ Delete Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await feedback.destroy();
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
};

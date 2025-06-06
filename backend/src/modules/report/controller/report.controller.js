const path = require("path");
const createPDF = require("../../../services/createPDF.js");
const sendEmail = require("../../../services/email.js");

const generateReportAndSend = async (req, res) => {
  try {
    const { email, studentName, academic_strengths, top_recommendations } = req.body;

    if (!email || !studentName || !academic_strengths || !top_recommendations) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = path.join(__dirname, "../temp", `report-${Date.now()}.pdf`);

    createPDF({ 
      studentName, 
      academic_strengths, 
      top_recommendations 
    }, filePath);
    
     sendEmail(email, "Your University Recommendation Report", "Please find your PDF attached.", filePath);

    res.status(200).json({ message: "PDF generated and email sent successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


module.exports = { generateReportAndSend };

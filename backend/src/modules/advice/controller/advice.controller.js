const{Advice} = require("../../../../DB/models/index");
// const axios = require('axios');



const createAdviceFromFlask = async (req, res) => {
  try {
    // Step 1: Fetch advice from Flask API (which already did the processing)
    // const { data } = await axios.get('http://localhost:5000/api/advice'); // Flask URL

    const {id, parentAdvice, teacherAdvice, parentId, teacherId } = req.body;

    // Step 2: Store in DB
    const newAdvice = await Advice.create({
      id,
      parentAdvice,
      teacherAdvice,
      parentId,
      teacherId
    });

    res.status(201).json({
      message: 'Advice created successfully',
      advice: newAdvice,
    });

  } catch (error) {
    console.error("Error creating advice:", error);
    res.status(500).json({
      message: 'Error creating advice',
      error: error.message,
    });
  }
};

const getAllAdvice = async (req, res) => {
  try {
    const allAdvice = await Advice.findAll();
    res.status(200).json(allAdvice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advice', error });
  }
};

module.exports = {
  createAdviceFromFlask,
  getAllAdvice,
};
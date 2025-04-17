const {InstructionAI} = require("../../../../DB/models/index");

exports.createInstruction = async (req, res) => {
  try {
    const { id, parentId,description } = req.body;
    const instruction = await InstructionAI.create({ id,parentId,description });
    res.status(201).json(instruction);
  } catch (error) {
    res.status(500).json({ message: "Error creating instruction", error: error.message || error });

  }
};
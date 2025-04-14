const { Parent } = require("../../../../DB/models/index");



exports.createParent = async (req, res) => {
  try {
    const parent = await Parent.create(req.body);
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
    const parent = await Parent.findByPk(req.params.id,{
      include: [{
        model: Student
        // ,as: 'students' // Optional: Specify the alias for the association
      }]});
      
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
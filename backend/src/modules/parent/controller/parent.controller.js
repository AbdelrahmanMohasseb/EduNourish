const { Parent ,Student,Advice,Menu,Bus} = require("../../../../DB/models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
    const parent = await Parent.findByPk(req.params.id,{
      include: [
        {model: Student},
        {model: Advice},
        {model:Menu},
        {
          model: Bus,
          attributes: ['number', 'driverName', 'arrivalTime', 'departureTime']
        }
        // ,as: 'students' // Optional: Specify the alias for the association
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


exports.signin = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log("Attempting signin with:", email, password);

      const parent = await Parent.findOne({ where: { email } });
      console.log("Parent found:", parent);

      if (!parent) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const match = await bcrypt.compare(password, parent.password);
      console.log("Password match:", match);

      if (!match) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: parent.id, isLoggedIn: true }, process.env.SECRETKEY || "default_secret_key", { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      console.error("Signin Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }

};

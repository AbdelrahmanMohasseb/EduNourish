const { Bus } = require('../../../../DB/models/index');


exports.createBus = async (req, res) => {
    try {
      const { number,driverName, arrivalTime, departureTime } = req.body;
  
      const bus = await Bus.create({
        number,
        driverName,
        arrivalTime,
        departureTime,
      });
  
      res.status(201).json({ message: "Bus created successfully", bus });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.findAll();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusById = async (req, res) => {
    try {
        const bus = await Bus.findByPk(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBus = async (req, res) => {
    try {
        const bus = await Bus.findByPk(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        await bus.update(req.body);
        res.status(200).json({ message: "Bus updated successfully", bus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findByPk(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        await bus.destroy();
        res.status(200).json({ message: "Bus deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
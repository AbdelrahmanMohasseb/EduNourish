const { Bus } = require('../../../../DB/models/index');


exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.findAll();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createBus = async (req, res) => {
    try {
        const { number, driverName, arrivalTime, departureTime } = req.body;
        const bus = await Bus.create({ number, driverName, arrivalTime, departureTime });
        res.status(201).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateBus = async (req, res) => {
    try {
        const { id } = req.params;
        const { number, driverName, arrivalTime, departureTime } = req.body;
        const bus = await Bus.findByPk(id);

        if (!bus) {
            return res.status(404).json({ message: "Bus not found" });
        }

        bus.number = number || bus.number;
        bus.driverName = driverName || bus.driverName;
        bus.arrivalTime = arrivalTime || bus.arrivalTime;
        bus.departureTime = departureTime || bus.departureTime;

        await bus.save();
        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteBus = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.findByPk(id);

        if (!bus) {
            return res.status(404).json({ message: "Bus not found" });
        }

        await bus.destroy();
        res.status(204).json({ message: "Bus deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const {Alarm} = require("../../../../DB/models/index");


exports.createAlarm = async (req, res) => {
    try {
        const { senderType, senderId, receiverType, receiverId, message } = req.body;

        const newAlarm = await Alarm.create({
            senderType,
            senderId,
            receiverType,
            receiverId,
            message
        });

        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ error: "Error creating alarm", details: error.message });
    }
};


exports.getAllAlarms = async (req, res) => {
    try {
        const alarms = await Alarm.findAll();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching alarms", details: error.message });
    }
};


exports.getAlarmsByReceiver = async (req, res) => {
    try {
        const { receiverType, receiverId } = req.params;
        const alarms = await Alarm.findAll({
            where: {
                receiverType,
                receiverId: receiverId !== "all" ? receiverId : null
            }
        });

        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: "Error fetching alarms", details: error.message });
    }
};


exports.markAlarmAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const alarm = await Alarm.findByPk(id);
        if (!alarm) {
            return res.status(404).json({ error: "Alarm not found" });
        }

        alarm.status = "read";
        await alarm.save();

        res.status(200).json(alarm);
    } catch (error) {
        res.status(500).json({ error: "Error updating alarm status", details: error.message });
    }
};


exports.deleteAlarm = async (req, res) => {
    try {
        const { id } = req.params;
        const alarm = await Alarm.findByPk(id);

        if (!alarm) {
            return res.status(404).json({ error: "Alarm not found" });
        }

        await alarm.destroy();
        res.status(200).json({ message: "Alarm deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting alarm", details: error.message });
    }
};

const { Menu } = require("../../../../DB/models/index");

exports.addMenuItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const newItem = await Menu.create({ name, description, price });

        res.status(201).json({ message: "Menu item added", menu: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.findAll();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.update({ name, description, price });

        res.status(200).json({ message: "Menu item updated", menu: menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.destroy();

        res.status(200).json({ message: "Menu item deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

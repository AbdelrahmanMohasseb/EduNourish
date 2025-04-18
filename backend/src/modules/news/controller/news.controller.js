const{ News} = require("../../../../DB/models/index");

// ✅ Create News
exports.createNews = async (req, res) => {
  try {
    const { title, content, type, photo } = req.body; // Accept photo URL

    const newNews = await News.create({ title, content, type, photo });

    res.status(201).json({ message: "News created successfully!", news: newNews });
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error: error.message });
  }
};

// ✅ Get All News
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.findAll();
    res.status(200).json({ news: newsList });
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};

// ✅ Get News by ID
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found!" });
    }

    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};

// ✅ Update News
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, photo } = req.body; // Accept photo URL

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found!" });
    }

    await news.update({ title, content, type, photo });

    res.status(200).json({ message: "News updated successfully!", news });
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error: error.message });
  }
};

// ✅ Delete News
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found!" });
    }

    await news.destroy();
    res.status(200).json({ message: "News deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};

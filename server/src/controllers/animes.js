import Anime from "../model/anime.model.js";
import Saved from "../model/saved.model.js";

// get random anime
const getAnime = async (req, res) => {
  try {
    // Lấy tất cả số lượng anime từ database
    const count = await Anime.countDocuments();
    let randomNumber = Math.floor(Math.random() * count) + 1;

    // Lấy một anime ngẫu nhiên từ database
    let animeData = await Anime.findOne({ id: randomNumber }).lean();
    if (!animeData) {
      // Nếu không tìm thấy, trả về lỗi
      return res.status(404).json({ message: "Anime not found" });
    }

    // Tìm trong database với animeId
    const result = await Saved.findOne({ animeId: animeData.id });
    animeData = { ...animeData, isSaved: result !== null };

    return res.status(200).json(animeData);
  } catch (error) {
    console.error("Error in getAnime:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllSavedAnimes = async (req, res) => {
  try {
    // Lấy danh sách anime đã lưu từ database
    const savedAnime = await Saved.find();
    const result = await Anime.find({
      id: { $in: savedAnime.map((item) => item.animeId) },
    }).lean();

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllSavedAnimes:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const saveAnime = async (req, res) => {
  try {
    const data = req.body;
    delete data.isSaved;

    // Tìm anime, nếu chưa có thì tạo mới
    let animeData = await Anime.findOne({ id: data.id });

    // Kiểm tra xem đã lưu hay chưa
    const existingSaved = await Saved.findOne({ animeId: animeData.id });
    if (!existingSaved) {
      const savedAnime = new Saved({ animeId: animeData.id });
      await savedAnime.save();
    } else {
      return res.status(200).json({ message: "Anime already saved" });
    }

    return res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.error("Error at saveAnime:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const unsavedAnime = async (req, res) => {
  try {
    const { id } = req.body;

    await Saved.deleteOne({ animeId: id });

    return res.status(200).json({ message: "Unsaved successfully" });
  } catch (error) {
    console.error("Error at unsavedAnime:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Search animes by title
const searchAnimes = async (req, res) => {
  try {
    const {
      keyword = "",
      type = "prefix",
      page = 0,
      pageSize = 10,
    } = req.query;

    if (!keyword.trim()) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const pageNum = parseInt(page);
    const size = parseInt(pageSize);

    const startTime = Date.now();

    let query = {};
    let sort = {};

    if (type === "text") {
      // Full-text search
      query = { $text: { $search: keyword } };
      sort = { score: { $meta: "textScore" } };
    } else {
      // Autocomplete (prefix search)
      const regex = new RegExp(`^${keyword}`, "i");
      query = { title: { $regex: regex } };
    }

    const [results, total] = await Promise.all([
      Anime.find(
        query,
        type === "text" ? { score: { $meta: "textScore" } } : {}
      )
        .sort(sort)
        .skip(pageNum * size)
        .limit(size)
        .lean(),
      Anime.countDocuments(query),
    ]);

    const duration = Date.now() - startTime;

    // Check if the results contain saved status
    const savedAnimes = await Saved.find({
      animeId: { $in: results.map((anime) => anime.id) },
    });
    const savedIds = new Set(savedAnimes.map((item) => item.animeId));
    results.forEach((anime) => {
      anime.isSaved = savedIds.has(anime.id);
    });

    return res.status(200).json({
      results,
      total,
      page: pageNum,
      pageSize: size,
      totalPages: Math.ceil(total / size),
      duration,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAnime, saveAnime, unsavedAnime, getAllSavedAnimes, searchAnimes };

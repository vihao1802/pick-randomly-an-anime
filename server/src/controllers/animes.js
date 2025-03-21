import fs from "fs";
import path from "path";
import Anime from "../model/anime.model.js";
import Saved from "../model/saved.model.js";

const filePath = path.resolve("./src/data/animes.json");
const animes = JSON.parse(fs.readFileSync(filePath, "utf8"));

// get random anime
const getAnime = async (req, res) => {
  try {
    let randomNumber = Math.floor(Math.random() * animes.length) + 1;
    let animeData = animes.find((item) => item.id === randomNumber);

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
    const result = await Anime.find();
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
    if (!animeData) {
      animeData = new Anime(data);
      await animeData.save();
    }

    // Kiểm tra xem đã lưu hay chưa
    const existingSaved = await Saved.findOne({ animeId: animeData.id });
    if (!existingSaved) {
      const savedAnime = new Saved({ animeId: animeData.id });
      await savedAnime.save();
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

    await Anime.deleteOne({ id: id });
    await Saved.deleteOne({ animeId: id });

    return res.status(200).json({ message: "Unsaved successfully" });
  } catch (error) {
    console.error("Error at unsavedAnime:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAnime, saveAnime, unsavedAnime, getAllSavedAnimes };

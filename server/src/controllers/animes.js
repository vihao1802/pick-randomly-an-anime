import fs from "fs";
import path from "path";
import anime from "../model/anime.model.js";
import saved from "../model/saved.model.js";

const filePath = path.resolve("./src/data/animes.json");

const animes = JSON.parse(fs.readFileSync(filePath, "utf8"));

const getAnime = async (req, res) => {
  try {
    let randomNumber = Math.floor(Math.random() * animes.length) + 1; // random from 1 to length
    let animeData = animes.find((item) => item.id === randomNumber);

    // find saved by anime id in database
    const result = await saved.findOne({ where: { animeId: animeData.id } });
    if (result === null) {
      animeData = { ...animeData, isSaved: false };
    } else {
      animeData = { ...animeData, isSaved: true };
    }

    return res.status(200).json(animeData);
  } catch (error) {
    return res.status(500);
  }
};
const getAllSavedAnimes = async (req, res) => {
  try {
    // find saved anime in database
    const result = await anime.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

const saveAnime = async (req, res) => {
  try {
    const data = req.body;
    delete data.isSaved;
    const [animeData, animeDataCreated] = await anime.findOrCreate({
      where: { id: data.id },
      defaults: data,
    });
    if (animeDataCreated) {
      const savedAnime = await saved.create({
        animeId: data.id,
      });
      await savedAnime.save();
    }
    return res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.log("Error at saveAnime: " + error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const unsavedAnime = async (req, res) => {
  try {
    const data = req.body;

    await anime.destroy({
      where: {
        id: data.id,
      },
    });

    await saved.destroy({
      where: {
        animeId: data.id,
      },
    });

    return res.status(200).json({ message: "Unsaved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAnime, saveAnime, unsavedAnime, getAllSavedAnimes };

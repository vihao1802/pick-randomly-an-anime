import express from "express";
import {
  getAnime,
  saveAnime,
  unsavedAnime,
  getAllSavedAnimes,
  searchAnimes,
} from "../controllers/animes.js";

const router = express.Router();

router.get("/get-one-random-anime", getAnime);

router.post("/save", saveAnime);
router.delete("/unsaved", unsavedAnime);
router.get("/get-all-saved-animes", getAllSavedAnimes);
router.get("/search", searchAnimes);

export default router;

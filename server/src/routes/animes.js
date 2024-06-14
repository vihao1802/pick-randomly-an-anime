import express from "express";
import { getAnime } from "../controllers/animes.js";

const router = express.Router();

router.get("/get-one-random-anime", getAnime);

export default router;

import express from "express";
import { addSong, getSongs, updateSong, deleteSong } from "../controllers/songController.js";

const router = express.Router();

router.post("/add", addSong);
router.get("/", getSongs);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;

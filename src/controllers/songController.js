import Song from "../models/songModel.js";

// Add new song
export const addSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ message: "Song added", song });
  } catch (error) {
    res.status(400).json({ message: "Failed to add song", error: error.message });
  }
};

// Get all songs (with optional filters)
export const getSongs = async (req, res) => {
  try {
    const filters = {};
    if (req.query.genre) filters.genre = req.query.genre;
    if (req.query.artist) filters.artist = req.query.artist;

    const songs = await Song.find(filters);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch songs", error: error.message });
  }
};

// Update song by ID
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song updated", song });
  } catch (error) {
    res.status(400).json({ message: "Failed to update song", error: error.message });
  }
};

// Delete song by ID
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete song", error: error.message });
  }
};

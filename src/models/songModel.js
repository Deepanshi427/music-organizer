import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: String,
  genre: String,
  duration: Number
}, { timestamps: true });

const Song = mongoose.model("Song", songSchema);

export default Song;

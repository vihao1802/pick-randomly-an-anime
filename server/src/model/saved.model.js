import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    animeId: {
      type: Number,
      ref: "Anime",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Saved", savedSchema);

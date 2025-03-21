import mongoose from "mongoose";

/* 
{
        "id": 1,
        "url": "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
        "title": "Sousou no Frieren",
        "image": "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
        "Synonyms": "Frieren at the Funeral",
        "Japanese": "\u846c\u9001\u306e\u30d5\u30ea\u30fc\u30ec\u30f3",
        "English": "Frieren: Beyond Journey's End",
        "Type": "TV",
        "Episodes": "28",
        "Status": "Finished Airing",
        "Aired": "Sep 29, 2023 to Mar 22, 2024",
        "Premiered": "Fall 2023",
        "Broadcast": "Fridays at 23:00 (JST)",
        "Producers": "Aniplex,       Dentsu,       Shogakukan-Shueisha Productions,       Nippon Television Network,       TOHO animation,       Shogakukan",
        "Licensors": "None found, add some",
        "Studios": "Madhouse",
        "Source": "Manga",
        "Genres": "AdventureAdventure,         DramaDrama,         FantasyFantasy",
        "Demographic": "ShounenShounen",
        "Duration": "24 min. per ep.",
        "Rating": "PG-13 - Teens 13 or older",
        "Score": "9.361 (scored by 422899422,899 users)\n      \n\n\n1\n          indicates a weighted score.",
        "Ranked": "#12\n\n2\n    based on the top anime page. Please note that 'Not yet aired' and 'R18+' titles are excluded.",
        "Popularity": "#252",
        "Members": "768,985",
        "Favorites": "44,184"
    }, */

const animeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true }, // ID kiểu integer
    url: { type: String },
    title: { type: String },
    image: { type: String },
    Synonyms: { type: String },
    Japanese: { type: String },
    English: { type: String },
    Type: { type: String },
    Episodes: { type: String },
    Status: { type: String },
    Aired: { type: String },
    Premiered: { type: String },
    Broadcast: { type: String },
    Producers: { type: String },
    Licensors: { type: String },
    Studios: { type: String },
    Source: { type: String },
    Genres: { type: String },
    Demographic: { type: String },
    Duration: { type: String },
    Rating: { type: String },
    Score: { type: String },
    Ranked: { type: String },
    Popularity: { type: String },
    Members: { type: String },
    Theme: { type: String, default: "" },
    Favorites: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Anime", animeSchema);

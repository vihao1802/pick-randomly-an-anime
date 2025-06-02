/* eslint-disable react/prop-types */

import { useState } from "react";
import useSaveAnime from "../hooks/useSaveAnime";
import useUnsaveAnime from "../hooks/useUnSaveAnime";
import toast from "react-hot-toast";

const SearchResultItem = ({ anime }) => {
  const [isSaved, setIsSaved] = useState(anime.isSaved);

  const { saveAnime, loading: saving } = useSaveAnime();
  const { unSaveAnime, loading: unsaving } = useUnsaveAnime();
  const loading = saving || unsaving;

  const handleToggleSave = async () => {
    const { success } = isSaved
      ? await unSaveAnime(anime.id)
      : await saveAnime(anime);

    if (success) {
      setIsSaved((prev) => !prev);
      if (!isSaved) {
        toast.success(`Anime saved successfully`);
      } else {
        toast("Anime unsaved successfully", {
          icon: "🗑️",
        });
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <li
      key={anime.id}
      className="bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors border border-gray-700 rounded-xl p-4 mb-4 shadow-md flex flex-col sm:flex-row gap-4"
    >
      {/* Image */}
      <div className="w-full sm:w-36 h-48 rounded overflow-hidden">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Anime Info */}
      <div className="flex-1 text-white space-y-1">
        <h3 className="text-xl font-bold text-green-400">
          <a
            className="line-clamp-1"
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {anime.title}
          </a>
        </h3>

        <p>
          <span className="text-gray-400 font-semibold">Studios:</span>{" "}
          {anime.Studios || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Genres:</span>{" "}
          {anime.Genres || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Theme:</span>{" "}
          {anime.Theme || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Demographic:</span>{" "}
          {anime.Demographic || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Rating:</span>{" "}
          {anime.Rating || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Score:</span>{" "}
          {anime.Score || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Ranked:</span>{" "}
          {anime.Ranked || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Popularity:</span>{" "}
          {anime.Popularity || "N/A"}
        </p>
        <p>
          <span className="text-gray-400 font-semibold">Favorites:</span>{" "}
          {anime.Favorites || "N/A"}
        </p>

        {/* Save or Unsave Button */}
        {/* <button
          onClick={() => {}}
          className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold"
        >
          Save
        </button> */}
        <button
          onClick={handleToggleSave}
          className={`mt-2 px-4 py-1 ${
            isSaved ? "bg-red-500" : "bg-green-500"
          } text-white rounded hover:bg-opacity-90 text-sm font-semibold flex items-center gap-2`}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2m-4-8a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
            </span>
          ) : isSaved ? (
            "Unsave"
          ) : (
            "Save"
          )}
        </button>
      </div>
    </li>
  );
};

export default SearchResultItem;

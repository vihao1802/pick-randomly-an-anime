import AnimeCard from "../components/AnimeCard";
import useGetAllSavedAnimes from "../hooks/useGetAllSaved";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import useUnsaveAnime from "../hooks/useUnSaveAnime";
import { useEffect, useState } from "react";
const Saved = () => {
  const { animes, loading } = useGetAllSavedAnimes();
  const { unSaveAnime, loading: unSaving } = useUnsaveAnime();
  const [savedAnimes, setSavedAnimes] = useState([]);

  useEffect(() => {
    if (animes && animes.length) {
      setSavedAnimes(animes);
    }
  }, [animes]);

  const handleRemove = (id) => {
    setSavedAnimes((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading || !animes)
    return (
      <div className="flex-grow h-screen w-full flex justify-center items-center bg-black text-white text-xl">
        <div className="animate-spin">
          <AutoModeIcon className="text-green-500" style={{ fontSize: 40 }} />
        </div>
        <p className="ml-4">Loading</p>
      </div>
    );

  return (
    <div className="relative w-full h-full px-2 py-12 sm:px-8">
      <h1 className="text-white text-2xl font-bold mx-auto max-w-[1300px]">
        Saved anime
      </h1>

      {savedAnimes.length === 0 ? (
        <div className="w-full max-w-[1300px] mx-auto mt-16 flex flex-col items-center justify-center text-center text-white">
          <img
            src="/empty-folder.svg" // use your own image or leave this out
            alt="No saved anime"
            className="w-40 h-40 mb-4 opacity-70"
          />
          <p className="text-lg font-semibold">No saved anime yet</p>
          <p className="text-gray-400 mt-1">
            Start adding anime to your favorites!
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[1300px] mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {savedAnimes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              unSaveAnime={unSaveAnime}
              unSaving={unSaving}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;

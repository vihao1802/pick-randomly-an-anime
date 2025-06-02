/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import toast from "react-hot-toast";

const AnimeCard = ({ anime, unSaveAnime, unSaving, onRemove }) => {
  const handleUnSave = async (animeId) => {
    const { success } = await unSaveAnime(animeId);
    if (success) {
      toast.success("Anime removed from saved successfully");
      if (onRemove) onRemove(animeId);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full grid grid-cols-5 sm:grid-cols-4  lg:grid-cols-3 gap-3 h-[300px] bg-white rounded-lg sm:rounded-none relative">
      <button
        onClick={() => handleUnSave(anime.id)}
        className="absolute top-0 left-0 z-10 p-1  bg-red-500 text-white hover:bg-red-600 transition-all rounded-br-lg h-7 w-7 flex justify-center items-center"
        disabled={unSaving}
        title="Remove from saved"
        aria-label="Remove from saved"
      >
        <RemoveCircleOutlineSharpIcon className="text-white" fontSize="small" />
      </button>
      <a
        href={anime.url}
        target="_blank"
        className="h-full w-full basis-1/2 transition-all duration-400 ease-linear hover:opacity-80 col-span-2 sm:col-span-1"
      >
        <img src={anime.image} alt="Test" className="h-[300px]" />
      </a>
      <div className="h-full w-full flex flex-col col-span-3 lg:col-span-2">
        <Typography
          id="modal-modal-title"
          sx={{
            color: "black",
            fontSize: "24px",
          }}
          component={"span"}
          className="group"
        >
          <a
            className="line-clamp-1"
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {anime.title}
          </a>
          <div className="transition-all duration-300 ease-linear h-1 bg-green-500 group-hover:w-full"></div>
        </Typography>
        <div className="mt-2 flex flex-wrap gap-y-2 gap-x-6">
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">English:</span>
            <span className="text-black">{anime.English || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">Japanese:</span>
            <span className="text-black">{anime.Japanese}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">Type:</span>
            <span className="text-black">{anime.Type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">Studios:</span>
            <span className="text-black">{anime.Studios}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">Duration:</span>
            <span className="text-black">{anime.Duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 font-medium">Producers:</span>
            <span className="text-black">{anime.Producers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;

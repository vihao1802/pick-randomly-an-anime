/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";

const AnimeCard = ({ anime }) => {
  return (
    <div className="w-full grid grid-cols-4  lg:grid-cols-3 gap-3 h-[300px] bg-white">
      <a
        href={anime.url}
        target="_blank"
        className="h-full w-full basis-1/2 transition-all duration-400 ease-linear hover:opacity-80 col-span-1"
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
        <div>
          <div className="mt-2 flex flex-row flex-wrap h-[252px]">
            <div>
              <span className="text-gray-600">English </span>
              <span className="text-black">
                {anime.English ? anime.English : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Japanese </span>
              <span className="text-black">{anime.Japanese}</span>
            </div>
            <div>
              <span className="text-gray-600">Type </span>
              <span className="text-black">{anime.Type}</span>
            </div>
            <div>
              <span className="text-gray-600">Studios </span>
              <span className="text-black">{anime.Studios}</span>
            </div>
            <div>
              <span className="text-gray-600">Duration </span>
              <span className="text-black">{anime.Duration}</span>
            </div>
            <div>
              <span className="text-gray-600">Producers </span>
              <span className="text-black">{anime.Producers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;

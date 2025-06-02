/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import useSaveAnime from "../hooks/useSaveAnime";
import useUnsaveAnime from "../hooks/useUnSaveAnime";
import CachedIcon from "@mui/icons-material/Cached";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";

const ModalAnimeDetail = ({
  anime,
  handleClose,
  open,
  fetchOneAnime,
  loadingPick,
}) => {
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            maxWidth: "800px",
            width: "100%",
            bgcolor: "#131313",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            display: "flex",
            alignItems: "center",
          }}
          className="h-screen md:h-[400px] px-[25px] md:px-[35px] py-[30px] overflow-auto md:overflow-hidden"
        >
          <div className="w-full h-full flex justify-content-center items-center flex-col md:flex-row gap-6">
            <div className="sm:absolute top-2 right-6 flex flex-row gap-2 justify-end">
              <div
                className={`text-white font-bold cursor-pointer z-10 h-[24px] ${
                  loadingPick
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-green-500"
                }`}
                onClick={!loadingPick ? fetchOneAnime : undefined}
                title="Pick another anime"
              >
                {loadingPick ? (
                  <div className="animate-spin">
                    <CachedIcon />
                  </div>
                ) : (
                  <HelpCenterOutlinedIcon />
                )}
              </div>

              <div
                className={`text-white font-bold cursor-pointer z-10 ${
                  loading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-green-500"
                }`}
                onClick={!loading ? handleToggleSave : undefined}
                title="Save or unsave anime"
              >
                {loading ? (
                  <div className="animate-spin">
                    <CachedIcon />
                  </div>
                ) : isSaved ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </div>

              <div
                className="text-white font-bold cursor-pointer hover:text-green-500 z-10"
                onClick={handleClose}
                title="Close"
              >
                <CloseIcon />
              </div>
            </div>

            <a
              href={anime.url}
              target="_blank"
              className="h-full w-full basis-1/2 transition-all duration-400 ease-linear hover:opacity-80"
            >
              <img
                src={anime.image}
                alt="Test"
                className="w-auto mx-auto md:mx-0 md:h-full md:w-full"
              />
            </a>
            <div className="h-full w-full flex-grow flex flex-col">
              <Typography
                id="modal-modal-title"
                sx={{
                  color: "white",
                  fontSize: "24px",
                }}
                component={"span"}
                className="group"
              >
                <a href={anime.url} target="_blank" rel="noopener noreferrer">
                  {anime.title}
                </a>
                <div className="transition-all duration-300 ease-linear w-[50%] h-1 bg-green-500 group-hover:w-full"></div>
              </Typography>
              <div className=" overflow-hidden flex-grow pb-4">
                <div className="mt-2 flex flex-row flex-wrap gap-5 h-full overflow-y-scroll mr-[-17px]">
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">English</span>
                    <span className="text-white">
                      {anime.English ? anime.English : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Japanese</span>
                    <span className="text-white">{anime.Japanese}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="text-white">{anime.Type}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Studios</span>
                    <span className="text-white">{anime.Studios}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Genres</span>
                    <span className="text-white">{anime.Genres}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-white">{anime.Duration}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="text-white">{anime.Rating}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Premiered</span>
                    <span className="text-white">{anime.Premiered}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Producers</span>
                    <span className="text-white">{anime.Producers}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Aired</span>
                    <span className="text-white">{anime.Aired}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Score</span>
                    <span className="text-white">{anime.Score}</span>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-between">
                    <span className="text-gray-600">Ranked</span>
                    <span className="text-white">{anime.Ranked}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAnimeDetail;

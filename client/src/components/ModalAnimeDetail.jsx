/* eslint-disable react/prop-types */
import { Box, Modal, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

const ModalAnimeDetail = ({ anime, handleClose, open }) => {
  const [isSaved, setIsSaved] = useState(anime.isSaved);

  const saveAnime = async () => {
    try {
      console.log(
        JSON.stringify({
          id: anime.id,
        })
      );
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/v1/animes/save",
        {
          method: "POST",
          body: JSON.stringify(anime),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("Saved");
        setIsSaved((prev) => !prev);
        toast.success("Your anime is saved");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error at " + error.message);
    }
  };

  const unSaveAnime = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/v1/animes/unsaved",
        {
          method: "DELETE",
          body: JSON.stringify({
            id: anime.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Unsaved");
        setIsSaved((prev) => !prev);
        toast.success("Your anime is unsaved");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error at " + error.message);
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
          className="h-screen md:h-[400px] px-[25px] md:px-[35px] py-[40px] md:py-[30px] overflow-auto md:overflow-hidden"
        >
          <div className="w-full h-full flex flex-col md:flex-row gap-6">
            <div
              className="absolute top-2 right-6 text-right text-white font-bold cursor-pointer hover:text-green-500 z-10"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
            <div className="absolute top-2 right-16 text-right text-white font-bold cursor-pointer hover:text-green-500 z-10">
              {isSaved ? (
                <div onClick={unSaveAnime}>
                  <BookmarkIcon />
                </div>
              ) : (
                <div onClick={saveAnime}>
                  <BookmarkBorderIcon />
                </div>
              )}
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

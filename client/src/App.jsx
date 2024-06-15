import { useState } from "react";
import "./App.css";
import { Box, Modal, Typography } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setAnime(null);
  };
  const handleOpen = () => {
    setOpen(true);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/animes/get-one-random-anime`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setAnime(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        "w-full h-screen flex flex-col justify-center items-center gap-4 bg-[#131313] px-2 sm:px-4 lg:px-0"
      }
    >
      {anime && (
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
            <div className="w-full h-full flex flex-col md:flex-row gap-6">
              <div
                className="absolute top-2 right-6 text-right text-white font-bold text-lg px-1 cursor-pointer hover:text-green-500"
                onClick={handleClose}
              >
                X
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
      )}

      <div className="bg-white w-full max-w-[1000px] max-h-[350px] h-auto rounded-2xl">
        <img
          src="banner.png"
          alt="Banner"
          className="w-full h-full rounded-2xl"
        />
      </div>
      <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-center font-bold text-white">
        You don&apos;t know what <span className="text-green-500">anime</span>{" "}
        to watch next? Let me pick you one!
      </h1>
      <button
        onClick={handleOpen}
        className="w-full md:w-[20%] hover:bg-green-400 cursor-pointer bg-green-500 text-sm sm:text-lg md:text-xl font-bold px-2 py-1 sm:py-2 rounded-xl text-center border-none outline-none disabled:cursor-default disabled:bg-green-700"
        disabled={loading}
      >
        {loading ? "Picking..." : "Pick"}
      </button>
    </div>
  );
}

export default App;

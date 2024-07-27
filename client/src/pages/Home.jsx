import { useState } from "react";

import ModalAnimeDetail from "../components/ModalAnimeDetail";

function Home() {
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
        "relative w-full h-screen flex flex-col justify-center items-center gap-4 bg-[#131313] p-2 sm:p-4 "
      }
    >
      <div className="bg-white w-full max-w-[650px] aspect-video rounded-2xl">
        <img
          src="banner.png"
          alt="Banner"
          className="w-full h-full rounded-lg"
        />
        {anime && (
          <ModalAnimeDetail
            open={open}
            handleClose={handleClose}
            anime={anime}
          />
        )}
      </div>
      <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-center font-bold text-white">
        You don&apos;t know what <span className="text-green-500">anime</span>{" "}
        to watch next?
        <p>Let me pick you one!</p>
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

export default Home;

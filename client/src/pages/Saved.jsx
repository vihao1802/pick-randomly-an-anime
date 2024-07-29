import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AnimeCard from "../components/AnimeCard";

const Saved = () => {
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/v1/animes/get-all-saved-animes",
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
          setAnimes(data);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !animes)
    return (
      <div className="h-screen w-full flex justify-center items-center bg-black text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div className={"relative w-full h-full bg-[#131313] px-2 py-12 sm:px-8"}>
      <h1 className="text-white text-2xl font-bold mx-auto max-w-[1300px]">
        Saved anime
      </h1>
      <div className="w-full max-w-[1300px] mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {animes.map((anime, index) => (
          <AnimeCard anime={anime} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Saved;

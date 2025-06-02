import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import animeApis from "../apis/anime";

const useGetAllSavedAnimes = () => {
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(animeApis.getAllSavedAnimes(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch saved animes");

        const data = await res.json();
        setAnimes(data);
      } catch (error) {
        console.error(error.message);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { animes, loading };
};

export default useGetAllSavedAnimes;

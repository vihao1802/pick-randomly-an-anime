import { useState } from "react";
import animeApis from "../apis/anime.js";

const useGetOneRandomAnime = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(animeApis.getOneRandomAnime());
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching random anime:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    fetchData,
    setData,
  };
};

export default useGetOneRandomAnime;

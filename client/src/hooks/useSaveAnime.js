import { useState } from "react";
import animeApis from "../apis/anime.js";

const useSaveAnime = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveAnime = async (anime) => {
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(animeApis.saveAnime(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anime),
      });

      if (!res.ok) throw new Error("Failed to save anime");

      const result = await res.json();
      setData(result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error saving anime:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, saveAnime, setData };
};

export default useSaveAnime;

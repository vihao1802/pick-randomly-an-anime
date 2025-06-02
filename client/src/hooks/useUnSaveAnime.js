import { useState } from "react";
import animeApis from "../apis/anime";

const useUnsaveAnime = () => {
  const [loading, setLoading] = useState(false);

  const unSaveAnime = async (animeId) => {
    setLoading(true);

    try {
      const res = await fetch(animeApis.unsavedAnime(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: animeId }),
      });

      if (!res.ok) throw new Error("Failed to unsave anime");

      return { success: true };
    } catch (error) {
      console.error("Error unsaving anime:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { unSaveAnime, loading };
};

export default useUnsaveAnime;

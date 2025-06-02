import { useState, useEffect, useRef } from "react";

const useAnimeSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeResponse, setTimeResponse] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const debounceRef = useRef(null);

  // Fetch prefix-based autocomplete suggestions
  useEffect(() => {
    if (keyword.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/animes/search?keyword=${encodeURIComponent(keyword)}&type=prefix`
        );
        if (!res.ok) throw new Error("Failed to fetch suggestions");

        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 300);
  }, [keyword]);

  const handleSearch = async (pageNum = 1) => {
    setLoading(true);
    setSuggestions([]);

    try {
      console.log(`Searching for "${keyword}" on page ${pageNum}...`);

      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/animes/search?keyword=${encodeURIComponent(keyword)}&type=text&page=${
          pageNum - 1
        }&size=${pageSize}`
      );
      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      setResults(data.results || []);
      setTimeResponse(data.duration || 0);
      setPage(data.page + 1); // Convert back to 1-based index
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (title) => {
    setKeyword(title);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return {
    keyword,
    setKeyword,
    suggestions,
    handleSelectSuggestion,
    handleSearch,
    handleKeyDown,
    results,
    setResults,
    loading,
    timeResponse,
    page,
    setPage,
    totalPages,
  };
};

export default useAnimeSearch;

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SearchResultItem from "../components/SearchResultItem";
import useAnimeSearch from "../hooks/useAnimeSearch";

const Search = () => {
  const {
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
  } = useAnimeSearch();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch(newPage); // Fetch that page
  };

  return (
    <div className="flex-grow px-2 py-12 sm:px-8 max-w-6xl w-full mx-auto">
      <h1 className="text-white text-2xl font-bold mb-4">
        Search Anime by Title
      </h1>

      <div className="relative w-full flex items-center ">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type anime title..."
          className="flex-grow p-2 rounded-tl-md rounded-bl-md outline-none"
          autoComplete="off"
        />

        <button
          onClick={() => {
            setKeyword("");
            setResults([]);
          }}
          className="h-10 p-2 bg-white text-gray-500 hover:text-gray-600 flex items-center"
          disabled={loading}
        >
          <ClearIcon />
        </button>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="h-10 p-2 bg-white text-green-500 rounded-tr-md rounded-br-md hover:bg-green-500 hover:text-white flex items-center"
        >
          {loading ? "..." : <SearchIcon />}
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectSuggestion(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* show how fast the response is */}
      <div className="mt-2 text-gray-500">
        {timeResponse > 0 && (
          <p>
            About {results.length} results found in{" "}
            <span className="font-semibold">
              {(timeResponse / 1000).toFixed(2)} seconds
            </span>
          </p>
        )}
      </div>

      {/* Search Results */}
      <div className="mt-6">
        {loading && <p>Loading results...</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-500">No results found</p>
        )}

        <ul>
          {results.map((anime) => (
            <SearchResultItem key={anime.id} anime={anime} />
          ))}
        </ul>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  page === pageNum
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;

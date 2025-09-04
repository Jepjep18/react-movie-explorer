import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("query"); // fixed key
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // ✅ new state
  const [error, setError] = useState(null); // ✅ optional error handling

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);  // start loading
      setError(null);    // clear previous errors
      try {
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error searching movies:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchMovies();
  }, [query, page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          <span className="ml-3 text-blue-600 font-semibold">Searching...</span>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && movies.length > 0 ? (
        <MovieList
          movies={movies}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : (
        !loading && !error && <p>No results found.</p>
      )}
    </div>
  );
}

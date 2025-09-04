import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("query");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error searching movies:", err);
      }
    };

    fetchMovies();
  }, [query, page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h2>

      {movies.length > 0 ? (
        <MovieList
          movies={movies}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

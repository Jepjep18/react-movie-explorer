import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const query = useQuery().get("query");

  useEffect(() => {
    async function fetchData() {
      if (query) {
        try {
          const data = await searchMovies(query);
          setMovies(data);
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      }
    }
    fetchData();
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">🔍 Results for "{query}"</h2>
      <MovieList movies={movies} />
    </div>
  );
}

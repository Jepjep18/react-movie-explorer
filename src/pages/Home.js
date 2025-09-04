import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">🔥 Trending Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
}

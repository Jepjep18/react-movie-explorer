import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchData();
  }, [id]);

  if (!movie) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image wrapper so it doesn’t stretch */}
        <div className="flex-shrink-0">
          <img
            src={
              movie.poster_path
                ? IMG_BASE + movie.poster_path
                : "https://via.placeholder.com/500x750"
            }
            alt={movie.title}
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Movie details */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-gray-600 italic mb-4">"{movie.tagline}"</p>
          )}
          <p className="mb-4">{movie.overview}</p>
          <p className="mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10
          </p>
          <p className="mb-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
        </div>
      </div>
    </div>
  );
}

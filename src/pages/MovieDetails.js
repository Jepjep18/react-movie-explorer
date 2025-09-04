import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={
              movie.poster_path
                ? IMG_BASE + movie.poster_path
                : "https://via.placeholder.com/500x750"
            }
            alt={movie.title}
            className="w-48 sm:w-64 md:w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Movie info */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-gray-600 italic mb-4">"{movie.tagline}"</p>
          )}
          <p className="mb-4 text-sm sm:text-base">{movie.overview}</p>
          <p className="mb-2 text-sm sm:text-base">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mb-2 text-sm sm:text-base">
            <strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10
          </p>
          <p className="mb-2 text-sm sm:text-base">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="mb-4 text-sm sm:text-base">
            <strong>Runtime:</strong> {movie.runtime} min
          </p>

          {/* Trailer button */}
          <Link
            to={`/movie/${id}/play`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ▶ Watch Trailer
          </Link>
        </div>
      </div>
    </div>
  );
}

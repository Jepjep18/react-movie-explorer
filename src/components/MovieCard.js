import React, { useState } from "react";
import { Link } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-80 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <img
            src={
              movie.poster_path
                ? IMG_BASE + movie.poster_path
                : "https://via.placeholder.com/500x750"
            }
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full bg-white p-3 rounded-lg shadow-md backface-hidden rotate-y-180 overflow-auto">
          <h3 className="font-bold text-lg">{movie.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Release: {movie.release_date || "N/A"}
          </p>
          <p className="text-sm line-clamp-6">
            {movie.overview || "No description."}
          </p>
          <p className="mt-2 text-yellow-500 font-semibold">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>

          <Link
            to={`/movie/${movie.id}`}
            className="mt-4 inline-block bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}

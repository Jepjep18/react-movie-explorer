import React from "react";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
      <img
        src={
          movie.poster_path
            ? IMG_BASE + movie.poster_path
            : "https://via.placeholder.com/500x750"
        }
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
    </div>
  );
}

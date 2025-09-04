import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieVideos } from "../api/tmdb";

export default function MoviePlayer() {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getMovieVideos(id);
        const trailer = data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setVideoKey(trailer ? trailer.key : data.results[0]?.key || null);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div className="p-4 flex flex-col items-center">
      <Link to="/" className="mb-4 text-blue-600 hover:underline">
        ← Back to Home
      </Link>

      {loading ? (
        <p>Loading trailer...</p>
      ) : videoKey ? (
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      ) : (
        <p>No trailer available.</p>
      )}
    </div>
  );
}

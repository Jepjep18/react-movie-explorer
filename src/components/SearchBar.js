import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 px-3 py-2 rounded border w-full sm:w-64 text-black"
      />
      <button
        type="submit"
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}

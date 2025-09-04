// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SearchBar from "./components/SearchBar";
import MoviePlayer from "./pages/MoviePlayer";
import MovieDetails from "./pages/MovieDetails";  // ✅ Add this import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🎬 Movie Explorer
          </Link>
          <SearchBar />
        </header>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />   {/* ✅ Works now */}
            <Route path="/movie/:id/play" element={<MoviePlayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

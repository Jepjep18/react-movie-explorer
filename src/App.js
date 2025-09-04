import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./pages/MovieDetails";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">🎬 Movie Explorer</Link>
          <SearchBar />
        </header>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

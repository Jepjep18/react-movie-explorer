import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const getTrendingMovies = async () => {
  const res = await tmdb.get("/trending/movie/week");
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await tmdb.get("/search/movie", { params: { query } });
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await tmdb.get(`/movie/${id}`);
  return res.data;
};

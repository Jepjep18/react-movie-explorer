import axios from "axios";

const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

// Fetch trending movies
export const getTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/week");
  return response.data.results;
};

// Search movies by query
export const searchMovies = async (query) => {
  const response = await axiosInstance.get(`/search/movie?query=${query}`);
  return response.data.results;
};

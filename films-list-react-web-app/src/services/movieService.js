import axios from "axios";

// TODO: CONFIG AS ENVIRONMENT VARIABLE
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_API_BASE = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${TMDB_API_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
    throw error;
  }
};

export const searchMovies = async () => {
  try {
    // TODO
  } catch (error) {
    console.error("Error searching movies: ", error);
    throw error;
  }
};

import axios from "axios";

const TMDB_API_KEY = "5ac81a2ce92faf23d97d05cc5b79db77";
console.log("api key: ", TMDB_API_KEY);
const TMDB_API_BASE = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    console.log(`${TMDB_API_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}`);
    const response = await axios.get(
      `${TMDB_API_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
    throw error;
  }
};

// TODO: MOVE TO ANOTHER FILE?
export const searchMovies = async () => {
  try {
    // TODO
  } catch (error) {
    console.error("Error searching movies: ", error);
    throw error;
  }
};

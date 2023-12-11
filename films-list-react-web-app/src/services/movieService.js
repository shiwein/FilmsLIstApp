import axios from "axios";
import { filterEmptyParams } from "../utils/utils";

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

const getKeywordIds = async (keyword) => {
  try {
    const response = await axios.get(`${TMDB_API_BASE}/search/keyword`, {
      params: { api_key: TMDB_API_KEY, query: keyword },
    });

    if (response.data.results.length > 0) {
      return response.data.results.map((kw) => kw.id);
    }
    return [];
  } catch (error) {
    console.error("Error fetching keyword IDs:", error);
    throw error;
  }
};

export const searchMovies = async (searchParams) => {
  try {
    let keywordIds = [];

    if (searchParams.with_keywords) {
      keywordIds = await getKeywordIds(searchParams.with_keywords);
      if (keywordIds.length === 0) {
        // If no keyword IDs found, return empty list
        return [];
      }
    }

    const params = filterEmptyParams({
      api_key: TMDB_API_KEY,
      ...searchParams,
      with_keywords: keywordIds.join("|"),
    });

    const response = await axios.get(`${TMDB_API_BASE}/discover/movie`, {
      params,
    });

    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

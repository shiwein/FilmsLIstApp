import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

// const API_BASE = "http://localhost:4000";
const API_BASE = process.env.REACT_APP_API_BASE;

export const updateUserById = async (userId, user) => {
  try {
    const response = await request.put(`${API_BASE}/api/users/${userId}`, user);
    return response.data;
  } catch (error) {
    console.error("Error while updating user: ", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await request.post(`${API_BASE}/api/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (invalid credentials)
      throw new Error("Invalid credentials");
    } else {
      // Handle other kinds of errors (network issues, server errors, etc.)
      throw new Error("Login failed");
    }
  }
};

export const register = async (credentials) => {
  try {
    const response = await request.post(
      `${API_BASE}/api/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (username already exists)
      throw new Error("Username already exists");
    } else {
      // Handle other kinds of errors
      throw new Error("Registration failed");
    }
  }
};

export const logout = async () => {
  const response = await request.post(`${API_BASE}/api/logout`);
  return response.data;
};

export const findReviewsByAuthor = async (authorId) => {
  const response = await fetch(`${API_BASE}/api/users/${authorId}/reviews`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getMovieDetailsById = async (movieId) => {
  const response = await fetch(`${API_BASE}/api/movie/${movieId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addFavoriteMovie = async (userId, movieId) => {
  try {
    const response = await request.post(
      `${API_BASE}/api/users/${userId}/favoriteMovies`,
      { movieId: movieId }
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding movie to favorites: ", error);
    throw error;
  }
};

export const deleteFavoriteMovie = async (userId, movieId) => {
  try {
    const response = await request.delete(
      `${API_BASE}/api/users/${userId}/favoriteMovies`,
      { data: { movieId: movieId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error while deleting movie to favorites: ", error);
    throw error;
  }
};

export const findUserById = async (userId) => {
  const response = await fetch(`${API_BASE}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

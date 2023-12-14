import React, { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/movieService";
import MovieGrid from "../movies/MovieGrid";
import { useSelector } from "react-redux";
import { getMovieDetailsById } from "../../services/movieService";

const Home = () => {
  // TODO: FETCH CURRENT USER
  const { currentUser } = useSelector((state) => state.user);

  const getTrendingMovies = async () => {
    try {
      const results = await fetchTrendingMovies();
      setTrendingMovies(results);
    } catch (error) {
      // TODO: ERROR HANDLING
    }
  };

  // TODO: FETCH FAVORITE MOVIES
  const getFavoriteMovies = async (user) => {
    try {
      const favoriteMovieDetails = await Promise.all(
        user.favoriteMovies.map((movieId) => getMovieDetailsById(movieId))
      );
      setFavoriteMovies(favoriteMovieDetails);
    } catch (error) {
      // TODO: ERROR HANDLING
    }
  };

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies();

    if (currentUser) {
      getFavoriteMovies(currentUser);
    }
  }, [currentUser]);

  const favoritesFallback = (
    <div className="d-flex justify-content-center font-color-secondary">
      You haven't added any favorite movies ¯\_(ツ)_/¯
    </div>
  );

  return (
    <>
      {currentUser && (
        <div className="mt-5">
          <MovieGrid
            title={"My Favorites"}
            movies={favoriteMovies}
            fallbackContent={favoritesFallback}
          />
        </div>
      )}
      <div className="mt-5">
        {<MovieGrid title={"Trending This Week"} movies={trendingMovies} />}
      </div>
    </>
  );
};

export default Home;

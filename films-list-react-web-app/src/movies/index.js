import React, { useState, useEffect } from "react";
import { fetchTrendingMovies } from "./moviesClient";
import MovieGrid from "../common/MovieGrid";

const Movies = () => {
  // TODO: FETCH CURRENT USER
  const currentUser = undefined;

  const getTrendingMovies = async () => {
    try {
      const results = await fetchTrendingMovies();
      setTrendingMovies(results);
      console.log(results);
    } catch (error) {
      // TODO: ERROR HANDLING
    }
  };

  // TODO: FETCH FAVORITE MOVIES
  const getFavoriteMovies = async (user) => {};

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

export default Movies;

import React from "react";
import MovieTile from "./MovieTile";
import { TMDB_POSTER_URL_PREFIX, formatDate } from "../../utils/utils";

const MovieGrid = ({
  title,
  movies,
  fallbackContent,
  colsPerRow = 2,
  colsPerRowMd = 5,
}) => {
  return (
    <>
      {title && <div className="movie-grid-title mb-3">{title}</div>}
      {movies.length > 0 && (
        <div
          className={`row row-cols-${colsPerRow} row-cols-md-${colsPerRowMd} g-4`}
        >
          {movies.map((movie) => (
            <div className="col">
              <MovieTile
                id={movie.id}
                title={movie.title}
                posterUrl={`${TMDB_POSTER_URL_PREFIX}/${movie.poster_path}`}
                releaseDate={formatDate(movie.release_date)}
              />
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && fallbackContent}
    </>
  );
};

export default MovieGrid;

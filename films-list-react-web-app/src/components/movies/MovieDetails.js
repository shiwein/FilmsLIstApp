import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "../../styles/movieDetails.css";
import { formatDate, formateRuntime } from "../../utils/utils";
import { getMovieDetailsById } from "../../services/movieService";
import MovieReviews from "./MovieReviews";
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
} from "../../services/userService";
import { useSelector } from "react-redux";

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const detail = await getMovieDetailsById(movieId);
        setMovieDetail(detail);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  useEffect(() => {
    if (currentUser && currentUser.favoriteMovies) {
      const isMovieInFavorites = currentUser.favoriteMovies.includes(movieId);
      setIsFavorite(isMovieInFavorites);
    }
  }, [currentUser, movieId]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (isFavorite) {
      await deleteFavoriteMovie(currentUser._id, movieId);
    } else {
      await addFavoriteMovie(currentUser._id, movieId);
    }
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  if (!movieDetail) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row movie-detail">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8 mt-5">
          <h2 className="movie-detail-title">
            {movieDetail.title} (
            {new Date(movieDetail.release_date).getFullYear()})
          </h2>
          <div className="mb-5">
            {formatDate(movieDetail.release_date)} |{" "}
            {movieDetail.genres.join(", ")} |{" "}
            {formateRuntime(movieDetail.runtime)}
          </div>
          <div className="mb-2 movie-detail-tagline">{movieDetail.tagline}</div>
          <div className="mb-2">
            <h4 className="mb-2">Overview</h4>
            <p>{movieDetail.overview}</p>
          </div>
          <p className="mb-2">Rating: {movieDetail.vote_average}/10</p>
          <div>
            <span
              className={`heart-icon ${isFavorite ? "favorited" : ""}`}
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? <HeartFill color="red" /> : <Heart />}
            </span>
          </div>
        </div>
        <MovieReviews movieId={movieDetail.id} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;

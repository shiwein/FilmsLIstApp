import React, { useEffect, useState } from "react";
import {
  getReviewsByMovie,
  postMovieReview,
} from "../../services/movieService";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MovieReviews = ({ movieId }) => {
  const navigate = useNavigate();
  const [movieReviews, setMovieReviews] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [newReview, setNewReview] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const reviews = await getReviewsByMovie(movieId);
        setMovieReviews(reviews);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  const handleInputChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newReview || isSubmitting) {
      return;
    }

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSubmitting(true);

    try {
      // Make API call to post the new review
      await postMovieReview({
        newReview,
        movieId,
        userId: currentUser._id,
      });

      const updatedData = await getReviewsByMovie(movieId);
      setMovieReviews(updatedData);
      setNewReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5);
  };

  return (
    <div className="mt-5">
      <h3>Movie Reviews</h3>
      <div className="list-group">
        {movieReviews.slice(0, visibleReviews).map((review) => (
          <li
            key={review._id}
            className="mb-3 list-group-item list-group-item-dark"
          >
            <p>
              <Link to={`/Profile/${review.author._id}`}>
                <strong>{review.author.username}</strong>
              </Link>{" "}
              says:
            </p>
            <p>{review.review}</p>
          </li>
        ))}
      </div>
      {visibleReviews < movieReviews.length && (
        <button
          type="button"
          className="btn btn-dark mt-0"
          onClick={loadMoreReviews}
        >
          Load More Reviews
        </button>
      )}
      <div>
        <textarea
          className="form-control mb-2 mt-2"
          placeholder="Write your review here..."
          value={newReview}
          onChange={handleInputChange}
        ></textarea>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default MovieReviews;

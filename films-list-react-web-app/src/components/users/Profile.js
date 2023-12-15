import React, { useState, useEffect } from "react";
import {
  findReviewsByAuthor,
  getMovieDetailsById,
  findUserById,
} from "../../services/userService";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await findUserById(userId);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserById();
  }, [userId]);

  useEffect(() => {
    const fetchReviewsAndMovieDetails = async () => {
      if (currentUser._id) {
        try {
          // 获取用户评论
          const userReviews = await findReviewsByAuthor(currentUser._id);
          // 更新评论状态
          setReviews(userReviews);
          // 基于评论获取电影详情
          const movieDetailsPromises = userReviews.map((review) =>
            getMovieDetailsById(review.movieId)
          );
          const movieDetails = await Promise.all(movieDetailsPromises);
          // 更新电影详情状态
          setMovies(movieDetails);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchReviewsAndMovieDetails();
  }, [currentUser._id]);

  return (
    currentUser && (
      <div className="font-color-secondary">
        <div className="col-12 col-md-8 mt-5">
          {/* 展示用户信息 */}
          <h2>User Profile</h2>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.role}</p>

          {/* 展示电影详情用户评论 */}
          <h2>User Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                {review.review}
                {movies[index] && (
                  <span>
                    {" "}
                    -{" "}
                    <Link to={`/details/${movies[index].id}`}>
                      {movies[index].title}
                    </Link>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Profile;

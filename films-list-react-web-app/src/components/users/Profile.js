import React, { useState, useEffect } from "react";
import {
  findReviewsByAuthor,
  getMovieDetailsById,
  findUserById,
  updateUserById,
} from "../../services/userService";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState();
  const [originalUserInfo, setOriginalUserInfo] = useState();
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await findUserById(userId);
        setUserInfo(user);
        setOriginalUserInfo(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserById();
  }, [userId]);

  useEffect(() => {
    const fetchReviewsAndMovieDetails = async () => {
      if (userId) {
        try {
          // 获取用户评论
          const userReviews = await findReviewsByAuthor(userId);
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
  }, [userId]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserById(userId, userInfo);
      setIsEditMode(false);
      setOriginalUserInfo(userInfo);
    } catch (error) {
      console.error("Error while updating user: ", error);
    }
  };

  const handleCancelClick = () => {
    setUserInfo(originalUserInfo);
    setIsEditMode(false);
  };

  return (
    userInfo && (
      <div className="font-color-secondary">
        <div className="col-12 col-md-8 mt-5">
          {/* 展示用户信息 */}
          {currentUser._id === userId && isEditMode ? (
            <>
              <label>Username:</label>
              <input
                className="form-control mb-2 w-25"
                type="text"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              />
              <label>Email:</label>
              <input
                className="form-control mb-2 w-25"
                type="text"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
              <label>Role:</label>
              <select
                className="form-control mb-2 w-25"
                type="text"
                value={userInfo.role}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, role: e.target.value })
                }
              >
                <option value="FAN">FAN</option>
                <option value="PRODUCER">PRODUCER</option>
                {currentUser.role === "ADMIN" && (
                  <option value="ADMIN">ADMIN</option>
                )}
              </select>

              {/* Save and Cancel buttons */}
              <button onClick={handleSaveClick} className="btn btn-success">
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="btn btn-danger mx-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>User Profile</h2>
              <p>Username: {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
              <p>Role: {userInfo.role}</p>

              {currentUser._id === userId && !isEditMode && (
                <button onClick={handleEditClick} className="btn btn-primary">
                  Edit
                </button>
              )}
            </>
          )}

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

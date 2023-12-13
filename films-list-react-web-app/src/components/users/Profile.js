import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findReviewsByAuthor,
  getMovieDetailsById,
} from "../../services/userService";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    role: currentUser.role,
  });

  // 更新用户信息
//   const dispatch = useDispatch();
//   useEffect(() => {
//     setUser({
//       username: currentUser.username,
//       email: currentUser.email,
//       role: currentUser.role,
//     });
//   }, [currentUser]);

//   const handleUpdateUser = async () => {
//     try {
//       const updatedUser = await updatedUser(user._id, user);
//       dispatch(updateUserAction(updatedUser));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);

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

  const updateProfileForm = (
    <div className="card search-form ps-3 pe-3 pt-3 pb-3">
      <div>
        <label htmlFor="username" className="search-field mb-1">
          Username
        </label>
        <input
          id="username"
          className="form-control form-control-sm"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="email" className="search-field mb-1">
          Email
        </label>
        <input
          id="email"
          className="form-control form-control-sm"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="role" className="search-field mb-1">
          Role
        </label>
        <select
          id="role"
          className="form-select form-select-sm"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="FAN">Fan</option>
          <option value="ADMIN">Admin</option>
          <option value="PRODUCER">Producer</option>
        </select>
      </div>

      <div className="mt-4">
        <button
        //   onClick={handleUpdateUser}
          className="btn btn-sm btn-danger mt-2"
        >
          Update Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-color-secondary">
      {/* <div className="col-12 col-md-4 mt-5">{updateProfileForm}</div> */}
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
              {movies[index] && <span> - {movies[index].title}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

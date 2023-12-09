import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/users/userThunks";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, currentUser, error } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // TODO: VALIDATE THE PASSWORD AND USERNAME
    // TODO: ERROR HANDLING
    dispatch(loginThunk(credentials));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/Home");
    }
  }, [currentUser, navigate]);

  // TODO: DISPLAY THE ERROR MESSAGE
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6">
        <div className="card login-form">
          <div className="login-form-title"> Log In</div>
          <div className="mt-4">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="form-control"
              id="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-danger btn-sm mt-5" onClick={handleLogin}>
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

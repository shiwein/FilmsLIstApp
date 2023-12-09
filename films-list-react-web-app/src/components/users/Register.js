import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../redux/users/userThunks";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // TODO: VALIDATE CREDENTIALS
    // TODO: HANDLE ERROR
    setIsClicked(true);
    dispatch(registerThunk(credentials));
  };

  useEffect(() => {
    if (isClicked && !error && !loading) {
      navigate("/Login");
    }
  }, [loading, isClicked, error, navigate]);

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6">
        <div className="card login-form">
          <div className="login-form-title"> Create Your Account</div>
          <div className="mt-4">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="form-control"
              id="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  username: e.target.value,
                })
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
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="confirm-password">
              CONFIRM PASSWORD
            </label>
            <input
              className="form-control"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-danger btn-sm mt-5"
            onClick={handleRegister}
          >
            {!loading && "REGISTER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

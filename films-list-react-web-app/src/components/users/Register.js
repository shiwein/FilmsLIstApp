import React from "react";

const Register = () => {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6">
        <div className="card login-form">
          <div className="login-form-title"> Create Your Account</div>
          <div className="mt-4">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input className="form-control" id="username" />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input className="form-control" id="password" type="password" />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="confirm-password">
              CONFIRM PASSWORD
            </label>
            <input
              className="form-control"
              id="confirm-password"
              type="password"
            />
          </div>
          <button className="btn btn-danger btn-sm mt-5">REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || email === null) {
      setError((prev) => {
        return { ...prev, email: "email is required" };
      });
    }
    if (password === "" || password === null) {
      setError((prev) => {
        return { ...prev, password: "password is required" };
      });
    }
    if (email === "" || password === "") {
      return;
    }
    dispatch(login(email, password));
    navigation("/admin");
  };

  return (
    <form className="container col-lg-5 col-md-8 col-sm-10">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError({ ...error, email: "" });
          }}
        />
        {error && error.email && (
          <small id="emailHelp" className="form-text text-danger">
            email is required
          </small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError({ ...error, password: "" });
          }}
        />
        {error && error.password && (
          <small id="emailHelp" className="form-text text-danger">
            password is required
          </small>
        )}
      </div>
      <div className="mb-3">
        <div className="mb-3">
          Not an admin? <Link to={"/login"}>Login</Link>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default AdminLogin;

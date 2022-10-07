import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [limit, setlimit] = useState(2000);
  const [error, setError] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setError((prev) => {
        return { ...prev, username: "username is required" };
      });
    }
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
    if (username === "" || email === "" || password === "") {
      return;
    }
    dispatch(register(username, email, password));
    navigation("/");
  };

  return (
    <form className="container col-lg-5 col-md-8 col-sm-10">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError({ ...error, username: "" });
          }}
        />
        {error && error.username && (
          <small id="emailHelp" className="form-text text-danger">
            username is required
          </small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
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
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Register;

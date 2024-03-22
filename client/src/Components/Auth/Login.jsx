import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Main/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  function handleSubmitForm(e) {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

    // Empty fields
    // setUsername("");
    // setEmail("");
    // setPassword("");
  }

  return (
    <div className="sign-up-container">
      <Link to="/" className="middle">
        <Logo />
      </Link>
      <form action="sign-up-form" onSubmit={handleSubmitForm}>
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword" className="forgot-password">
          Forgot Password?
        </Link>
        <p className="have-account">
          Don't have an Account?
          <Link to="/signup" className="sign-up">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
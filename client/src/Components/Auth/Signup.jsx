import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Main/Logo";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmitForm(e) {
    e.preventDefault();

    // Prevent when user not enter
    if (!username || !email || !password) return;

    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          navigate("/login");
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
        <h2>Sign up</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>
        <p>
          Have an Account?
          <Link to="/login" className="sign-up">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

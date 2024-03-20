import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
          navigate("/home");
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
        <p>
          Don't have an Account?
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

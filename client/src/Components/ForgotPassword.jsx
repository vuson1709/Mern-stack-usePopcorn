import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  function handleSubmitForm(e) {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/forgot-password", {
      email,
    })
      .then((res) => {
        if (res.data.status) {
          alert("check your email for reset password link");
          navigate("/login");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="sign-up-container">
      <form action="sign-up-form" onSubmit={handleSubmitForm}>
        <h2>Forgot Password</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

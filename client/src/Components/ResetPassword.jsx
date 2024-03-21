import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(1);
    Axios.post("http://localhost:3000/auth/reset-password/" + token, {
      password,
    })
      .then((res) => {
        if (res.data.status) {
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

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

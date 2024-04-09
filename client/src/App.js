import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import DashBoard from "./Components/Auth/DashBoard";
import Logout from "./Components/Auth/Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

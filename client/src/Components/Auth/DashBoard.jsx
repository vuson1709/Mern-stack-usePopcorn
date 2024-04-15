import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://mern-stack-usepopcorn.onrender.com/auth/verify")
      .then((res) => {
        if (res.data.status) {
        } else {
          navigate("/");
        }

        console.log(res);
      });
  }, [navigate]);
  return <div>DashBoard</div>;
}

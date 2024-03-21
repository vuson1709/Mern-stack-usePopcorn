import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/auth/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  return <div>DashBoard</div>;
}

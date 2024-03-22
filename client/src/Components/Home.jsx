import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  function handleLogout() {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      Home
      <button>
        <Link to="/dashboard">Dashboard</Link> <br /> <br />
      </button>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

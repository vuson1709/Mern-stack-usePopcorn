import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  function handleLogout() {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          // navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

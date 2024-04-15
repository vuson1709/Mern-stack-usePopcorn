import axios from "axios";

export default function Logout() {
  axios.defaults.withCredentials = true;
  function handleLogout() {
    axios
      .get("https://mern-stack-usepopcorn.onrender.com/auth/logout")
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          localStorage.removeItem("user");
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

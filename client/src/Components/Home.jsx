import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <button>
        <Link to="/dashboard">Dashboard</Link> <br /> <br />
      </button>
      <button>Logout</button>
    </div>
  );
}

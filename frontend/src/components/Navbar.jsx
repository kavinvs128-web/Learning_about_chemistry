import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("chemIQ_token");
    localStorage.removeItem("chemIQ_user_fullName");

    navigate("/signin");
  }

  return (
    <header>
      <h2>⚗️ ChemIQ</h2>

      <nav>
        <a href="/home">Home</a>
        <a href="#">Lessons</a>
        <a href="#">Quiz</a>
        <a href="#">Progress</a>
      </nav>

      <div>
        <button>🔔</button>

        <button>👤 Student</button>

        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;

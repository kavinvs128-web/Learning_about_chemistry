import { useState } from "react";
import { signin } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function login(e) {
  e.preventDefault();

  try {
    const data = await signin({
      email,
      password,
    });

    console.log("Response:", data);

    if (data.token) {


  localStorage.setItem(
    "chemIQ_token",
    data.token
  );


  localStorage.setItem(
    "user",
    JSON.stringify({

      name: data.user.fullName,

      email: data.user.email,

      role: "Student"

    })
  );


  navigate("/home");

}
     else {
      alert(data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
}

  return (
    <div className="signin-page">
      <div className="signin-panel">
        <form onSubmit={login}>
          <h1>
            Begin your <span>chemistry</span> journey
          </h1>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Sign in</button>

          <p onClick={() => navigate("/create-account")}>
            Create new account
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;

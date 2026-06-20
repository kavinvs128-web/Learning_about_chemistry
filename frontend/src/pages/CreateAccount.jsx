import { useState } from "react";
import { createAccount } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    const res = await createAccount(form);

    if (res.ok) {
      alert("Account created");

      navigate("/signin");
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-panel">
        <form onSubmit={submit}>
          <h1>
            Create <span>account</span>
          </h1>

          <input name="fullName" placeholder="Full name" onChange={change} />

          <input name="username" placeholder="Username" onChange={change} />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={change}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={change}
          />

          <input name="phone" placeholder="Phone" onChange={change} />

          <input name="email" placeholder="Email" onChange={change} />

          <button>Create Account</button>

          <p onClick={() => navigate("/signin")}>Already have an account</p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;

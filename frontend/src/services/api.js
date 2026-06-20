const API = "http://localhost:5000/api/auth";

// CREATE ACCOUNT
export async function createAccount(data) {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// SIGN IN
export async function signin(data) {
  const res = await fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}
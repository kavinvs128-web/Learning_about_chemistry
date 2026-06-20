// PrivateRoute.jsx
// Wraps a protected page element. If there's no chemIQ_token in localStorage,
// redirects to /signin instead of rendering the protected content.
//
// Usage in App.jsx:
//   <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("chemIQ_token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default PrivateRoute;

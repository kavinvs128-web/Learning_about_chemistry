import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/start.jsx";
import Signin from "./pages/Signin";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

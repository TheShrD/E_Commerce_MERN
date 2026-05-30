import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    Boolean(localStorage.getItem("admin-auth-token"))
  );
  const handleAdminLogout = () => setIsAdminLoggedIn(false);

  return (
    <main className="bg-primary text-tertiary">
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={() => setIsAdminLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            isAdminLoggedIn ? (
              <>
                <Navbar onLogout={handleAdminLogout} />
                <Admin />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </main>
  );
}
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/home");
    }
  };

  const handleSignupSuccess = () => {
    // After signup, redirect directly to /home
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      }`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDarkMode ? "text-white" : "text-gray-800"}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Default route - redirect to home if logged in, otherwise to signup */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <Navigate to="/signup" replace />}
      />

      {/* Login route */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )
        }
      />

      {/* Signup route */}
      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Signup
              onSignupSuccess={handleSignupSuccess}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )
        }
      />

      {/* Protected Home route */}
      <Route
        path="/home"
        element={
          user ? (
            <Home
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              onLogout={handleLogout}
              user={user}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ImageCaptioner from "./pages/ImageCaptioner";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
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
      navigate("/image-by-captions");
    }
  };

  const handleSignupSuccess = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      navigate("/image-by-captions");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#14f1d9] border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-xl shadow-[#14f1d9]/20"></div>
          <p className="text-[#14f1d9] font-black text-xl tracking-tighter uppercase italic animate-pulse">
            System Initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Default route redirects to /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Home Landing Page at /home */}
      <Route path="/home" element={<Home />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/image-by-captions" replace />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to="/image-by-captions" replace />
          ) : (
            <Signup onSignupSuccess={handleSignupSuccess} />
          )
        }
      />

      {/* Protected Image Captioner UI at /image-by-captions */}
      <Route
        path="/image-by-captions"
        element={
          user ? (
            <ImageCaptioner
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

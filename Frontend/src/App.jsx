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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafafa", fontFamily: "'Inter', sans-serif" }}>
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-8">
            <div className="absolute inset-0 border-4 rounded-full" style={{ borderColor: "#e8e0d5" }}></div>
            <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin" style={{ borderTopColor: "transparent", borderColor: "#c4956a #c4956a #c4956a transparent" }}></div>
          </div>
          <div className="flex items-center gap-2.5 justify-center">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "#1a1a1a" }}>
              <svg className="w-4 h-4 fill-current" style={{ color: "#c4956a" }} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <span className="font-black text-xl tracking-tight" style={{ color: "#1a1a1a" }}>
              Snap<span style={{ color: "#c4956a" }}>Script</span>
            </span>
          </div>
          <p className="text-sm font-medium mt-3 uppercase tracking-widest" style={{ color: "#9a9a9a" }}>Initializing...</p>
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

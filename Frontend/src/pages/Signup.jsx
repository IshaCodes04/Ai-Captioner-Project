import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignupSuccess, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Store user data in localStorage
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccess("Account created successfully! 🎉");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onSignupSuccess();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      } flex items-center justify-center px-4`}
    >
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div
          className={`backdrop-blur-md rounded-2xl p-8 shadow-2xl border transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-600"
              : "bg-white/50 border-purple-200"
          }`}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">🖼️</span>
                <h1
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  AI Captioner
                </h1>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-yellow-400"
                    : "hover:bg-purple-100 text-purple-600"
                }`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Create your account to get started
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-500 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Username */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500"
                    : "bg-white border-purple-300 text-gray-800 placeholder-gray-400"
                }`}
                placeholder="Choose your username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-purple-300 text-gray-800 placeholder-gray-400"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-2.5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-purple-300 text-gray-800 placeholder-gray-400"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-2.5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 mt-6 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 shadow-lg hover:shadow-xl"
              } bg-gradient-to-r from-purple-500 to-pink-500 text-white`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div
            className={`mt-6 text-center text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-500 hover:text-purple-600 font-semibold transition-colors"
            >
              Login here
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className={`text-center text-sm mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Made with 💻✨ by <span className="font-semibold">Isha</span> |
          Powered by AI
        </p>
      </div>
    </div>
  );
};

export default Signup;

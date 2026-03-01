import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Sparkles, Zap, Image, BarChart3, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Store user info
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      } flex items-center justify-center`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-purple-600" : "bg-purple-400"
        } animate-pulse`}></div>
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-blue-600" : "bg-blue-400"
        } animate-pulse`}></div>
      </div>

      {/* Main Container */}
      <div className="w-full h-screen flex relative z-10">
        {/* LEFT SIDE - Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start px-12">
          {/* Logo */}
          <div className="mb-12 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${
                isDarkMode ? "bg-purple-600/30" : "bg-purple-100"
              }`}>
                <Sparkles className={`w-8 h-8 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`} />
              </div>
              <div>
                <h1 className={`text-4xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>AI Captioner</h1>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>Transform Images with Intelligence</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8 mb-12">
            <div className="flex gap-4 animate-slideIn" style={{animationDelay: "0.1s"}}>
              <div className={`p-3 rounded-xl h-fit ${
                isDarkMode ? "bg-purple-600/20" : "bg-purple-100"
              }`}>
                <Image className={`w-6 h-6 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Smart Image Analysis</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Upload any image and get intelligent, contextual captions instantly
                </p>
              </div>
            </div>

            <div className="flex gap-4 animate-slideIn" style={{animationDelay: "0.2s"}}>
              <div className={`p-3 rounded-xl h-fit ${
                isDarkMode ? "bg-pink-600/20" : "bg-pink-100"
              }`}>
                <Zap className={`w-6 h-6 ${
                  isDarkMode ? "text-pink-400" : "text-pink-600"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Lightning Fast</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Get results in seconds with our optimized AI models
                </p>
              </div>
            </div>

            <div className="flex gap-4 animate-slideIn" style={{animationDelay: "0.3s"}}>
              <div className={`p-3 rounded-xl h-fit ${
                isDarkMode ? "bg-blue-600/20" : "bg-blue-100"
              }`}>
                <BarChart3 className={`w-6 h-6 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Track Your Work</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Keep history of all your captioned images in one place
                </p>
              </div>
            </div>

            <div className="flex gap-4 animate-slideIn" style={{animationDelay: "0.4s"}}>
              <div className={`p-3 rounded-xl h-fit ${
                isDarkMode ? "bg-green-600/20" : "bg-green-100"
              }`}>
                <Shield className={`w-6 h-6 ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Secure & Private</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Your data is encrypted and never shared with third parties
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-auto mb-8 animate-fadeIn" style={{animationDelay: "0.5s"}}>
            <div>
              <p className={`text-3xl font-bold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>10K+</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Images Processed</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>99%</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Accuracy Rate</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>24/7</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Available</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 lg:px-12">
          {/* Top Navigation for Mobile */}
          <div className="lg:hidden w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${
                isDarkMode ? "bg-purple-600/20" : "bg-purple-100"
              }`}>
                <Sparkles className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`} />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>AI Captioner</h1>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all ${
                isDarkMode
                  ? "hover:bg-gray-700/50 text-yellow-400"
                  : "hover:bg-purple-100 text-purple-600"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Login Card */}
          <div
            className={`w-full max-w-md backdrop-blur-xl rounded-3xl p-8 shadow-2xl border transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/70 border-gray-600/50"
                : "bg-white/80 border-white/60"
            }`}
          >
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Welcome Back</h2>
                <p className={`text-base ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>Access your AI captions</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`hidden lg:block p-3 rounded-xl transition-all ${
                  isDarkMode
                    ? "hover:bg-gray-700/50 text-yellow-400"
                    : "hover:bg-purple-100 text-purple-600"
                }`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl backdrop-blur-sm animate-shake">
                <p className={`text-sm font-medium ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Username
                </label>
                <div className="relative group">
                  <div className={`absolute left-3 top-3.5 transition-colors ${
                    isDarkMode ? "text-gray-600 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-500"
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-700/80"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white"
                    }`}
                    placeholder="your_username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative group">
                  <div className={`absolute left-3 top-3.5 transition-colors ${
                    isDarkMode ? "text-gray-600 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-500"
                  }`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-700/80"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white"
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-3.5 transition-colors ${
                      isDarkMode ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mt-8 ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-[1.02] active:scale-95"
                } bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Signup */}
            <div className={`mt-8 pt-6 border-t ${
              isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
            } text-center text-sm`}>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold hover:opacity-80 transition-opacity"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className={`text-center text-xs mt-8 ${
            isDarkMode ? "text-gray-500" : "text-gray-600"
          }`}>
            Made with 💻✨ by Isha | Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

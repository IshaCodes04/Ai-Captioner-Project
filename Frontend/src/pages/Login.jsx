import React, { useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Sparkles,
  Shield,
  ScanSearch,
  Upload,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setEmail("");
      setPassword("");

      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-['Inter'] selection:bg-[#14f1d9]/30">
      {/* LEFT SIDE - Features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-16 py-12 relative overflow-hidden">
        {/* Subtle background glows */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#14f1d9]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <p className="text-[#14f1d9] text-[11px] font-extrabold tracking-[0.25em] mb-12 uppercase opacity-90">
            AI POWERED TOOL
          </p>

          <h1 className="text-[64px] font-[850] text-white leading-[1.05] mb-8 tracking-[-0.03em]">
            Generate Perfect<br />
            Captions from Any<br />
            Image Using <span className="text-[#14f1d9]">AI</span>
          </h1>

          <p className="text-slate-400 text-[17px] leading-relaxed mb-14 max-w-lg font-medium opacity-80">
            Upload any image and our AI will analyze it to generate smart,
            engaging, and context-aware captions instantly. Built for creators,
            developers, and social media enthusiasts.
          </p>

          <div className="space-y-10">
            {/* Feature 1 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-[#14f1d9]/10 border border-[#14f1d9]/20 group-hover:bg-[#14f1d9]/20 transition-all duration-300">
                <ScanSearch className="w-6 h-6 text-[#14f1d9]" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white font-bold text-[17px] mb-1 group-hover:text-[#14f1d9] transition-colors duration-300">
                  Smart Image Analysis
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  AI understands objects, scenes, and context from your images.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-[#14f1d9]/10 border border-[#14f1d9]/20 group-hover:bg-[#14f1d9]/20 transition-all duration-300">
                <Zap className="w-6 h-6 text-[#14f1d9]" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white font-bold text-[17px] mb-1 group-hover:text-[#14f1d9] transition-colors duration-300">
                  Instant Caption Generation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Get captions within seconds with advanced AI processing.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-[#14f1d9]/10 border border-[#14f1d9]/20 group-hover:bg-[#14f1d9]/20 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-[#14f1d9]" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white font-bold text-[17px] mb-1 group-hover:text-[#14f1d9] transition-colors duration-300">
                  Creative & Accurate Results
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Captions that actually match the image content.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-[#14f1d9]/10 border border-[#14f1d9]/20 group-hover:bg-[#14f1d9]/20 transition-all duration-300">
                <Shield className="w-6 h-6 text-[#14f1d9]" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white font-bold text-[17px] mb-1 group-hover:text-[#14f1d9] transition-colors duration-300">
                  Fast & Secure Platform
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Your data stays safe with a smooth experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Process Steps */}
        <div className="flex items-center gap-5 mt-auto pt-10 border-t border-slate-800/40 relative z-10">
          <div className="flex items-center gap-3 py-2 px-5 rounded-full bg-slate-900/40 border border-slate-800 transition-all hover:bg-slate-900 group">
            <Upload className="w-[18px] h-[18px] text-slate-500 group-hover:text-[#14f1d9] transition-colors" />
            <span className="text-slate-500 text-[11px] font-[800] uppercase tracking-wider group-hover:text-[#14f1d9] transition-colors">Upload</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-700 font-bold" />
          <div className="flex items-center gap-3 py-2 px-5 rounded-full bg-slate-900/40 border border-slate-800 transition-all hover:bg-slate-900 group">
            <ScanSearch className="w-[18px] h-[18px] text-slate-500 group-hover:text-[#14f1d9] transition-colors" />
            <span className="text-slate-500 text-[11px] font-[800] uppercase tracking-wider group-hover:text-[#14f1d9] transition-colors">AI Analysis</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-700 font-bold" />
          <div className="flex items-center gap-3 py-2 px-5 rounded-full bg-[#14f1d9]/10 border border-[#14f1d9]/30">
            <CheckCircle2 className="w-[18px] h-[18px] text-[#14f1d9]" />
            <span className="text-[#14f1d9] text-[11px] font-[800] uppercase tracking-wider">Perfect Caption</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#14f1d9]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-lg bg-[#0f172a]/70 backdrop-blur-2xl border border-slate-800/80 p-12 rounded-[32px] shadow-2xl relative z-10 overflow-hidden group transition-all duration-500 hover:border-[#14f1d9]/20">
          {/* Subtle highlight border effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#14f1d9]/20 to-transparent"></div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[34px] font-[800] text-white mb-3 tracking-[-0.02em]">
              Welcome Back
            </h2>
            <p className="text-slate-400/90 text-[15px] font-medium leading-relaxed">
              Login to continue generating AI captions.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-fadeIn">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <p className="text-sm text-red-100 font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-2.5">
              <label className="text-[14px] font-[700] text-slate-300/90 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-6 py-4 rounded-xl bg-[#0f172a]/80 border border-slate-800 text-white placeholder-slate-600 outline-none transition-all focus:border-[#14f1d9]/50 focus:ring-1 focus:ring-[#14f1d9]/20 font-medium"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[14px] font-[700] text-slate-300/90 ml-1">
                Password
              </label>
              <div className="relative group/input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-xl bg-[#0f172a]/80 border border-slate-800 text-white placeholder-slate-600 outline-none transition-all focus:border-[#14f1d9]/50 focus:ring-1 focus:ring-[#14f1d9]/20 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#14f1d9] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[18px] rounded-2xl bg-[#14f1d9] hover:bg-[#0ee7ce] text-[#020617] font-extrabold text-[17px] flex items-center justify-center gap-3 mt-4 shadow-2xl shadow-[#14f1d9]/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
            >
              {loading ? (
                <div className="w-6 h-6 border-[3px] border-[#020617] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="mb-0.5">Login</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-[15px] font-medium mt-10">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#14f1d9] hover:text-[#0ee7ce] font-extrabold transition-all ml-1 underline-offset-[6px] hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

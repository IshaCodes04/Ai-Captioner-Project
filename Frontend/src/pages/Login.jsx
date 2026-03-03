import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, Zap, ChevronLeft, Mail, Lock, Sparkles, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const T = {
  bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
  mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
  accentHover: "#b5845a", border: "#e8e0d5"
};

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/Image-Captioner");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[#fafafa]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-[45%] relative flex-col justify-center p-20 overflow-hidden">
        {/* Abstract Glow (No sharp line) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(circle at 0% 0%, rgba(196,149,106,0.15) 0%, transparent 70%)` }}></div>

        <div className="relative z-10 max-w-sm">
          <div className="mb-12 animate-fadeIn">
            <Logo textVisible={false} size={54} />
          </div>

          <div className="space-y-6 animate-fadeUp">
            <h1 className="text-6xl font-black leading-[1.05] tracking-tight text-[#1a1a1a]">
              Sign in to <span className="block" style={{ color: T.accent }}>SnapScript</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-[#4a4a4a] opacity-80">
              Turn your images into viral content with the most powerful AI caption engine ever built.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            {[
              { icon: <Sparkles />, l: "Neural Vision 3.0" },
              { icon: <Zap />, l: "Real-time Processing" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-[#e8e0d5] transition-transform group-hover:scale-110" style={{ color: T.accent }}>
                  {React.cloneElement(f.icon, { className: "w-5 h-5" })}
                </div>
                <span className="font-bold text-sm tracking-tight" style={{ color: T.dark }}>{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 relative">
        <button onClick={() => navigate("/home")}
          className="absolute top-10 left-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: T.dark }}>
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="w-full max-w-[480px] animate-fadeUp">
          <div className="bg-white rounded-[48px] p-12 border border-[#e8e0d5] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black tracking-tight mb-2" style={{ color: T.dark }}>Welcome Back</h2>
              <p className="font-medium text-sm text-[#9a9a9a]">Access your intelligent studio space.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.15em] ml-1 text-[#9a9a9a]">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors group-focus-within:text-[#c4956a]" style={{ color: T.muted }} />
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4.5 rounded-2xl border-2 outline-none transition-all font-bold text-[15px]"
                    style={{ background: "#fff", borderColor: T.border }}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = T.accent}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1 pr-1">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#9a9a9a]">Password</label>
                  <button type="button" className="text-[11px] font-black uppercase tracking-[0.15em]" style={{ color: T.accent }}>Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors group-focus-within:text-[#c4956a]" style={{ color: T.muted }} />
                  <input
                    required
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4.5 rounded-2xl border-2 outline-none transition-all font-bold text-[15px]"
                    style={{ background: "#fff", borderColor: T.border }}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    onFocus={e => e.target.style.borderColor = T.accent}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity">
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button disabled={loading} type="submit"
                className="w-full h-15 rounded-2xl font-black text-lg text-white shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
                style={{ background: T.dark }}>
                {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-5 h-5" /> Access Dashboard</>}
              </button>
            </form>

            <p className="mt-10 text-center text-sm font-medium text-[#9a9a9a]">
              Don't have an account?{" "}
              <button onClick={() => navigate("/signup")} className="font-black" style={{ color: T.accent }}>Join the Hub</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

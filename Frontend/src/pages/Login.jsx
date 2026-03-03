import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, Zap, ChevronLeft, Mail, Lock, Upload, Wand2, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const T = {
  bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
  mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
  accentHover: "#b5845a", border: "#e8e0d5",
};

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
    if (!email || !password) { setError("Please enter both email and password"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address"); return; }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true });
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => onLoginSuccess(), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: T.bg, fontFamily: "'Outfit', sans-serif" }}>

      {/* Subtle ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-60"
        style={{ background: `radial-gradient(circle, rgba(196,149,106,0.1) 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-60"
        style={{ background: `radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)` }} />

      {/* Back */}
      <button onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm font-semibold transition-colors group"
        style={{ color: T.muted }}
        onMouseEnter={e => e.currentTarget.style.color = T.dark}
        onMouseLeave={e => e.currentTarget.style.color = T.muted}>
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Home
      </button>

      {/* Two-column layout — full viewport height aligned */}
      <div className="w-full max-w-5xl px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT — Brand storytelling */}
        <div className="hidden lg:block">
          {/* Logo */}
          <Logo textVisible={false} size={44} />

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6"
            style={{ background: `rgba(196,149,106,0.1)`, color: T.accent, border: `1px solid rgba(196,149,106,0.2)` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
            AI Engine Active
          </div>

          {/* Headline */}
          <h1 className="text-[52px] font-black leading-[0.94] tracking-[-0.035em] mb-5"
            style={{ color: T.dark }}>
            Welcome<br />Back to<br /><span style={{ color: T.accent }}>SnapScript</span>
          </h1>

          <p className="text-[15px] leading-relaxed font-medium mb-8 max-w-[320px]" style={{ color: T.mid }}>
            Pick up where you left off. Upload an image — our AI reads the scene, emotion, and context to craft captions that convert.
          </p>

          {/* Feature rows */}
          <div className="space-y-3 mb-8">
            {[
              { icon: <Upload className="w-3.5 h-3.5" />, text: "Upload any image — JPG, PNG, WebP" },
              { icon: <Wand2 className="w-3.5 h-3.5" />, text: "Gemini Vision AI reads the full scene" },
              { icon: <Sparkles className="w-3.5 h-3.5" />, text: "Captions generated in under 0.3 seconds" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(196,149,106,0.12)`, color: T.accent }}>
                  {f.icon}
                </div>
                <span className="text-sm font-medium" style={{ color: T.mid }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial / social proof */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl w-fit"
            style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex -space-x-2">
              {["#c4956a", "#a07850", "#d4a574"].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border" style={{ background: c, borderColor: T.surface }} />
              ))}
            </div>
            <p className="text-[13px] font-semibold" style={{ color: T.mid }}>
              Loved by <span className="font-black" style={{ color: T.dark }}>12,000+</span> creators worldwide
            </p>
          </div>
        </div>

        {/* RIGHT — Login form card */}
        <div className="w-full flex flex-col items-center lg:items-end">
          <div className="w-full max-w-md bg-white rounded-[28px] p-8 shadow-[0_4px_40px_rgba(196,149,106,0.1)]"
            style={{ border: `1px solid ${T.border}` }}>

            {/* Card header */}
            <div className="mb-7">
              <h2 className="text-2xl font-black mb-1 tracking-tight" style={{ color: T.dark }}>Sign In</h2>
              <p className="text-[13px] font-medium" style={{ color: T.muted }}>
                Access your caption studio. Fast &amp; secure.
              </p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl flex items-center gap-2.5"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-[13px] font-semibold text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                  style={{ color: T.muted }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                    style={{ background: T.surface, border: `1.5px solid ${T.border}`, color: T.dark }}
                    onFocus={e => { e.target.style.borderColor = T.accent; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.background = T.surface; }} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                  style={{ color: T.muted }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                    style={{ background: T.surface, border: `1.5px solid ${T.border}`, color: T.dark }}
                    onFocus={e => { e.target.style.borderColor = T.accent; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.background = T.surface; }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: T.muted }}
                    onMouseEnter={e => e.currentTarget.style.color = T.accent}
                    onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-black text-[15px] flex items-center justify-center gap-2.5 text-white shadow active:scale-[0.98] transition-all mt-1"
                style={{ background: T.dark }}
                onMouseEnter={e => e.currentTarget.style.background = T.accent}
                onMouseLeave={e => e.currentTarget.style.background = T.dark}>
                {loading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><ArrowRight className="w-4 h-4" /> Sign In to SnapScript</>}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: T.border }} />
              <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.muted }}>or</span>
              <div className="flex-1 h-px" style={{ background: T.border }} />
            </div>

            <p className="text-center text-[13px] font-medium" style={{ color: T.muted }}>
              New to SnapScript?{" "}
              <button onClick={() => navigate("/signup")} className="font-black transition-colors"
                style={{ color: T.accent }}
                onMouseEnter={e => e.target.style.color = T.accentHover}
                onMouseLeave={e => e.target.style.color = T.accent}>
                Create a free account →
              </button>
            </p>
          </div>

          {/* Below card — trust note */}
          <p className="text-center text-[12px] font-medium mt-4 lg:w-full lg:max-w-md" style={{ color: T.muted }}>
            🔒 Secure login · No data stored · Privacy guaranteed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

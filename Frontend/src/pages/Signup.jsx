import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowRight, Zap, ChevronLeft, Mail, Lock, User, Sparkles, CheckCircle2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const T = {
  bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
  mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
  accentHover: "#b5845a", border: "#e8e0d5",
};

const Signup = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!fullName || !email || !password || !confirmPassword) { setError("All fields are required"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address"); return; }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", { fullName, email, password }, { withCredentials: true });
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess("🎉 Account created! Redirecting to your workspace...");
      setTimeout(() => onSignupSuccess(), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally { setLoading(false); }
  };

  const iStyle = { background: T.surface, border: `1.5px solid ${T.border}`, color: T.dark };
  const iFocus = (e) => { e.target.style.borderColor = T.accent; e.target.style.background = "white"; };
  const iBlur = (e) => { e.target.style.borderColor = T.border; e.target.style.background = T.surface; };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: T.bg, fontFamily: "'Outfit', sans-serif" }}>

      {/* Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-60"
        style={{ background: `radial-gradient(circle, rgba(196,149,106,0.1) 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-60"
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

      {/* Grid layout — Swapped to match Login logic (Content Left, Card Right) */}
      <div className="w-full max-w-5xl px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT — Brand benefits panel */}
        <div className="hidden lg:block">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-7">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: T.dark }}>
              <Zap className="w-4 h-4 fill-current" style={{ color: T.accent }} />
            </div>
            <span className="text-xl font-black tracking-tight" style={{ color: T.dark }}>
              Caption<span style={{ color: T.accent }}>AI</span>
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-5"
            style={{ background: `rgba(196,149,106,0.1)`, color: T.accent, border: `1px solid rgba(196,149,106,0.2)` }}>
            <Sparkles className="w-3 h-3" /> Free to Get Started
          </div>

          {/* Headline */}
          <h2 className="text-[48px] font-black leading-[0.94] tracking-[-0.035em] mb-5"
            style={{ color: T.dark }}>
            Start Your<br /><span style={{ color: T.accent }}>Caption</span><br />Journey
          </h2>

          <p className="text-[15px] leading-relaxed font-medium mb-7 max-w-[300px]" style={{ color: T.mid }}>
            Join thousands of creators who use CaptionAI to write smarter captions — faster, and with zero effort.
          </p>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              "100 free caption generations per month",
              "5 tone styles: Casual, Funny, Pro, Poetic, Hashtags",
              "Caption history saved to your account",
              "Supports 40+ languages out of the box",
              "No credit card — ever. Truly free to start."
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `rgba(196,149,106,0.12)`, color: T.accent }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium leading-snug" style={{ color: T.mid }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Signup form card */}
        <div className="w-full flex flex-col items-center lg:items-end">
          <div className="w-full max-w-md bg-white rounded-[28px] p-8 shadow-[0_4px_40px_rgba(196,149,106,0.1)]"
            style={{ border: `1px solid ${T.border}` }}>

            <div className="mb-6">
              <h2 className="text-2xl font-black mb-1 tracking-tight" style={{ color: T.dark }}>Create Account</h2>
              <p className="text-[13px] font-medium" style={{ color: T.muted }}>
                Start generating captions today — free, no card required.
              </p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2.5"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-[13px] font-semibold text-red-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2.5"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <p className="text-[13px] font-semibold text-emerald-700">{success}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                  style={{ color: T.muted }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Isha Singh"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                    style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                  style={{ color: T.muted }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                    style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                    style={{ color: T.muted }}>Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 chars"
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                      style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: T.muted }}
                      onMouseEnter={e => e.currentTarget.style.color = T.accent}
                      onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                    style={{ color: T.muted }}>Confirm</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat"
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                      style={iStyle} onFocus={iFocus} onBlur={iBlur} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: T.muted }}
                      onMouseEnter={e => e.currentTarget.style.color = T.accent}
                      onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-black text-[15px] flex items-center justify-center gap-2.5 text-white shadow active:scale-[0.98] transition-all mt-1"
                style={{ background: T.dark }}
                onMouseEnter={e => e.currentTarget.style.background = T.accent}
                onMouseLeave={e => e.currentTarget.style.background = T.dark}>
                {loading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><ArrowRight className="w-4 h-4" /> Create Free Account</>}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: T.border }} />
              <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.muted }}>or</span>
              <div className="flex-1 h-px" style={{ background: T.border }} />
            </div>

            <p className="text-center text-[13px] font-medium" style={{ color: T.muted }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="font-black transition-colors"
                style={{ color: T.accent }}
                onMouseEnter={e => e.target.style.color = T.accentHover}
                onMouseLeave={e => e.target.style.color = T.accent}>
                Sign In →
              </button>
            </p>
          </div>

          <p className="text-center text-[12px] font-medium mt-4 lg:w-full lg:max-w-md" style={{ color: T.muted }}>
            🔒 Secure signup · Your images are never stored permanently
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

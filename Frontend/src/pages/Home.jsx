import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Zap, Upload, Image, Copy, Wand2, Globe, Shield, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const T = {
  bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
  mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
  accentHover: "#b5845a", border: "#e8e0d5"
};

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen text-[#1a1a1a] overflow-x-hidden bg-[#fafafa]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════ */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#e8e0d5]" : ""}`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/home")}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-9">
            {[["Features", "#features"], ["How It Works", "#how"], ["Pricing", "#pricing"]].map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-bold transition-colors" style={{ color: T.mid }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = T.mid}>{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="text-sm font-bold transition-colors" style={{ color: T.mid }}>Sign In</button>
            <button onClick={() => navigate("/signup")} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95" style={{ background: T.dark }}>
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative pt-44 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none opacity-40" style={{ background: `radial-gradient(ellipse at center, rgba(196,149,106,0.2) 0%, transparent 70%)` }}></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-widest bg-white shadow-sm border border-[#e8e0d5]" style={{ color: T.accent }}>
              Powered by Gemini Vision AI
            </div>
            <h1 className="text-[72px] font-black leading-[0.95] tracking-tight mb-8" style={{ color: T.dark }}>
              Turn Any Image<br />Into a <span style={{ color: T.accent }}>Viral Script</span>
            </h1>
            <p className="text-xl font-medium leading-relaxed mb-12 max-w-lg" style={{ color: T.mid }}>
              The intelligent vision engine for creators. Generate captions that stop the scroll using high-end AI research.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate("/signup")} className="px-8 py-4.5 rounded-2xl font-black text-white shadow-xl flex items-center gap-2 bg-[#1a1a1a]">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product mockup card */}
          <div className="relative animate-float hidden lg:block">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border bg-white" style={{ borderColor: T.border }}>
              {/* Chrome bar */}
              <div className="h-11 flex items-center gap-2 px-6 border-b" style={{ background: T.surface, borderColor: T.border }}>
                <div className="flex gap-1.5">
                  {["#f87171", "#fbbf24", "#34d399"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c + "40" }}></div>)}
                </div>
                <div className="mx-auto h-4 w-56 rounded-md" style={{ background: T.border }}></div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-2 gap-6 items-start">
                  {/* Upload Area */}
                  <div className="rounded-2xl border-2 border-dashed p-8 flex flex-col items-center gap-4 cursor-pointer" style={{ borderColor: T.border, background: T.surface }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/50">
                      <Image className="w-7 h-7" style={{ color: T.accent }} />
                    </div>
                    <p className="font-bold text-sm text-center" style={{ color: T.dark }}>Drop image here</p>
                    <div className="px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-tight" style={{ background: T.dark }}>Browse Files</div>
                  </div>

                  {/* AI Output Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: T.accent }} />
                      <span className="font-black text-xs uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${T.accent}20`, color: T.accent }}>Gemini AI</span>
                    </div>
                    <div className="rounded-2xl p-4 text-xs leading-relaxed italic font-medium" style={{ background: T.surface, color: T.mid }}>
                      "Golden hour hits different 🌅 Breathe it in. #GoldenHour #VibeCheck"
                    </div>
                    <div className="w-full py-3 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg" style={{ background: T.accent }}>
                      <Copy className="w-3.5 h-3.5" /> Copy Caption
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Speed Badge */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-2xl border" style={{ borderColor: T.border }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1a1a1a] text-white">
                  <Zap className="w-5 h-5 fill-current text-[#c4956a]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Latency</p>
                  <p className="text-sm font-black text-[#1a1a1a]">0.28s ✨</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════ */}
      <section id="features" className="py-32 px-8 border-t bg-white" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: T.accent }}>Why SnapScript?</p>
            <h2 className="text-5xl font-black tracking-tight text-[#1a1a1a]">Everything creators need.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Wand2 />, title: "Vision Analysis", desc: "Reads objects, mood, and context with pixel-perfect precision." },
              { icon: <Sparkles />, title: "Style Tuning", desc: "Casual, Pro, or Poetic — choose the tone that fits your brand." },
              { icon: <Globe />, title: "40+ Languages", desc: "Native captions for global audiences, including Hindi and Spanish." },
              { icon: <Shield />, title: "Privacy First", desc: "Your images are processed securely and never stored permanently." },
              { icon: <Zap />, title: "Turbo Speed", desc: "Powered by Gemini for sub-second caption generation." },
              { icon: <Copy />, title: "One-Click Copy", desc: "Save time and post instantly to your social platforms." }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-[32px] border transition-all hover:bg-[#f5f0eb]" style={{ borderColor: T.border }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white bg-[#1a1a1a]">
                  {React.cloneElement(f.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-xl font-black mb-3">{f.title}</h3>
                <p className="font-medium text-[15px] text-[#4a4a4a] opacity-70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section id="how" className="py-32 px-8 border-t" style={{ borderColor: T.border, background: T.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: T.accent }}>The Process</p>
            <h2 className="text-6xl font-black tracking-tight">3 Simple Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", icon: <Upload />, title: "Upload Image", desc: "Drop any JPG or PNG." },
              { step: "02", icon: <Wand2 />, title: "Analyze Scene", desc: "AI reads the context." },
              { step: "03", icon: <Copy />, title: "Get Caption", desc: "Copy & post instantly." }
            ].map((s, i) => (
              <div key={i} className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white border shadow-xl flex items-center justify-center text-[#1a1a1a]" style={{ borderColor: T.border }}>
                  {React.cloneElement(s.icon, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-2xl font-black">{s.title}</h3>
                <p className="font-medium text-[#4a4a4a] max-w-xs mx-auto opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING (UNLIMITED) ══════════════════════════════════ */}
      <section id="pricing" className="py-32 px-8 border-t bg-white" style={{ borderColor: T.border }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[40px] p-20 text-center relative overflow-hidden bg-[#1a1a1a] text-white">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${T.accent} 0%, transparent 70%)` }}></div>

            <p className="text-xs font-black uppercase tracking-[0.3em] mb-6" style={{ color: T.accent }}>Join the Unlimited Era</p>
            <h2 className="text-6xl font-black leading-tight mb-8">
              Unlimited Captions.<br />
              <span style={{ color: T.accent }}>Unlimited Potential.</span>
            </h2>
            <p className="text-lg font-medium opacity-50 mb-12 max-w-lg mx-auto">
              Experience SnapScript without boundaries. Start your professional creator path today for free.
            </p>
            <button onClick={() => navigate("/signup")} className="px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95 bg-[#c4956a]">
              Start Creating Free
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="py-20 px-8 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size={32} />
          <p className="text-sm font-bold opacity-30">© 2026 SnapScript by Isha Singh</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
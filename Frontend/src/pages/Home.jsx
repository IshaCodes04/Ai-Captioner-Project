import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Zap, Upload, Image, Copy, Wand2, Globe, Shield, CheckCircle2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

/* ── Brand tokens ─────────────────────────────── */
const T = {
  bg: "#fafafa",
  surface: "#f5f0eb",
  dark: "#1a1a1a",
  mid: "#4a4a4a",
  muted: "#9a9a9a",
  accent: "#c4956a",
  accentHover: "#b5845a",
  border: "#e8e0d5",
};

const Btn = ({ children, onClick, variant = "primary", className = "" }) => {
  const base = "inline-flex items-center justify-center gap-2.5 font-bold transition-all active:scale-95 cursor-pointer";
  const variants = {
    primary: `bg-[${T.dark}] text-white hover:bg-[${T.accent}] px-7 py-3.5 rounded-xl shadow-md`,
    accent: `bg-[${T.accent}] text-white hover:bg-[${T.accentHover}] px-7 py-3.5 rounded-xl shadow-lg`,
    outline: `border-2 border-[${T.border}] text-[${T.mid}] hover:border-[${T.accent}] hover:text-[${T.accent}] px-7 py-3.5 rounded-xl`,
    ghost: `text-[${T.mid}] hover:text-[${T.dark}] px-4 py-2`,
  };
  return <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
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
    <div className="min-h-screen text-[#1a1a1a] overflow-x-hidden" style={{ background: T.bg, fontFamily: "'Outfit', sans-serif" }}>

      {/* ══ NAVBAR ══════════════════════════════════════════════ */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#e8e0d5]" : ""}`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate("/home")}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-9">
            {[["Features", "#features"], ["How It Works", "#how"], ["Pricing", "#pricing"]].map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-semibold transition-colors" style={{ color: T.mid }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = T.mid}>{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="text-sm font-semibold transition-colors" style={{ color: T.mid }} onMouseEnter={e => e.target.style.color = T.dark} onMouseLeave={e => e.target.style.color = T.mid}>Sign In</button>
            <button onClick={() => navigate("/signup")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:shadow-xl active:scale-95" style={{ background: T.dark }} onMouseEnter={e => e.currentTarget.style.background = T.accent} onMouseLeave={e => e.currentTarget.style.background = T.dark}>
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative pt-44 pb-32 px-8 overflow-hidden">
        {/* Warm glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none" style={{ background: `radial-gradient(ellipse at center, rgba(196,149,106,0.12) 0%, transparent 70%)` }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div className="animate-fadeUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-widest" style={{ background: `rgba(196,149,106,0.12)`, color: T.accent, border: `1px solid rgba(196,149,106,0.25)` }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.accent }}></div>
                Powered by Google Gemini Vision AI
              </div>

              <h1 className="text-[76px] font-black leading-[0.9] tracking-[-0.04em] mb-8" style={{ color: T.dark }}>
                Turn Any Image<br />Into a <span style={{ color: T.accent }}>Viral Caption</span>
              </h1>

              <p className="text-xl font-medium leading-relaxed mb-12 max-w-lg" style={{ color: T.mid }}>
                Upload your photo. Our AI reads the scene, mood, colors, and context — then crafts captions that stop the scroll. In seconds.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <button onClick={() => navigate("/signup")} className="group flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all hover:scale-[1.03] active:scale-95" style={{ background: T.dark }} onMouseEnter={e => e.currentTarget.style.background = T.accent} onMouseLeave={e => e.currentTarget.style.background = T.dark}>
                  <Upload className="w-5 h-5" /> Start Captioning Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center gap-3 px-7 py-5 rounded-2xl font-bold text-base border-2 transition-all" style={{ border: `2px solid ${T.border}`, color: T.mid }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.mid; }}>
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: T.border }}>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  See Demo
                </button>
              </div>

              {/* Stats */}
              <div className="mt-16 flex flex-wrap gap-12" style={{ borderTop: `1px solid ${T.border}`, paddingTop: "24px" }}>
                {[["12K+", "Creators"], ["99.2%", "Accuracy"], ["0.3s", "Speed"], ["40+", "Languages"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-black" style={{ color: T.accent }}>{val}</p>
                    <p className="text-xs font-bold uppercase tracking-widest mt-0.5" style={{ color: T.muted }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product mockup card */}
            <div className="relative animate-float hidden lg:block">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border" style={{ background: "white", borderColor: T.border }}>
                {/* Chrome bar */}
                <div className="h-11 flex items-center gap-2 px-6 border-b" style={{ background: T.surface, borderColor: T.border }}>
                  <div className="flex gap-1.5">
                    {["#f87171", "#fbbf24", "#34d399"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c + "80" }}></div>)}
                  </div>
                  <div className="mx-auto h-4 w-56 rounded-md" style={{ background: T.border }}></div>
                </div>

                <div className="p-10">
                  <div className="grid grid-cols-2 gap-6 items-start">
                    {/* Upload */}
                    <div className="rounded-2xl border-2 border-dashed p-8 flex flex-col items-center gap-4 cursor-pointer" style={{ borderColor: T.border, background: T.surface }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `rgba(196,149,106,0.12)` }}>
                        <Image className="w-7 h-7" style={{ color: T.accent }} />
                      </div>
                      <p className="font-black text-sm text-center" style={{ color: T.dark }}>Drop your image here</p>
                      <div className="px-4 py-2 rounded-xl text-white text-xs font-bold" style={{ background: T.dark }}>Browse Files</div>
                    </div>

                    {/* Caption output */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: T.accent }} />
                        <span className="font-black text-sm" style={{ color: T.dark }}>AI Caption</span>
                        <div className="ml-auto flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#10b981", border: "1px solid rgba(52,211,153,0.25)" }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> LIVE
                        </div>
                      </div>
                      <div className="rounded-2xl p-4 text-sm leading-relaxed italic font-medium" style={{ background: T.surface, color: T.mid }}>
                        "Golden hour hits different 🌅 Breathe it in. #GoldenHour #VibeCheck"
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Casual", "Pro", "Funny"].map(s => (
                          <div key={s} className="px-3 py-1 rounded-lg text-[11px] font-bold border" style={{ borderColor: T.border, color: T.mid }}>{s}</div>
                        ))}
                      </div>
                      <div className="w-full py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2" style={{ background: T.accent }}>
                        <Copy className="w-4 h-4" /> Copy Caption
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-2xl border" style={{ borderColor: T.border }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(196,149,106,0.12)` }}>
                    <Zap className="w-5 h-5" style={{ color: T.accent }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: T.muted }}>Generated in</p>
                    <p className="text-base font-black" style={{ color: T.dark }}>0.28s ⚡</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════ */}
      <section id="features" className="py-32 px-8 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color: T.accent }}>Why SnapScript?</p>
            <h2 className="text-5xl font-black tracking-tight mb-6" style={{ color: T.dark }}>
              Everything creators need,<br /><span style={{ color: T.accent }}>nothing they don't</span>
            </h2>
            <p className="text-xl font-medium max-w-xl mx-auto leading-relaxed" style={{ color: T.mid }}>
              Built with enterprise-grade AI models — now available to every creator on the planet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Wand2 />, num: "01", title: "Neural Vision Analysis", desc: "Google Gemini Vision reads every pixel — objects, expressions, lighting — and extracts complete scene meaning from your image." },
              { icon: <Sparkles />, num: "02", title: "Style-Tuned Generation", desc: "Choose from Casual, Funny, Professional, Poetic, or Hashtag-optimized modes. Your brand voice, always on point." },
              { icon: <Globe />, num: "03", title: "40+ Languages", desc: "Generate native-quality captions in Hindi, Spanish, French, and 37+ more languages with full cultural nuance." },
              { icon: <Shield />, num: "04", title: "Private & Secure", desc: "Your images are processed securely and never stored permanently. Complete data privacy, guaranteed." },
              { icon: <Zap />, num: "05", title: "Under 1 Second", desc: "Caption generation completes in under 0.3 seconds on average, powered by optimized cloud inference." },
              { icon: <Copy />, num: "06", title: "One-Click Copy", desc: "Instantly copy your caption to clipboard. Paste directly into Instagram, Twitter, or any platform." }
            ].map((f, i) => (
              <div key={i} className="p-9 rounded-[32px] border group hover:-translate-y-2 transition-all cursor-default" style={{ background: T.surface, borderColor: T.border }}>
                <div className="flex items-start justify-between mb-7">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `rgba(196,149,106,0.15)`, color: T.accent }}>
                    {React.cloneElement(f.icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-3xl font-black" style={{ color: `rgba(196,149,106,0.2)` }}>{f.num}</span>
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight" style={{ color: T.dark }}>{f.title}</h3>
                <p className="leading-relaxed font-medium text-sm" style={{ color: T.mid }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section id="how" className="py-32 px-8 border-t" style={{ borderColor: T.border, background: T.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color: T.accent }}>The Process</p>
            <h2 className="text-5xl font-black tracking-tight" style={{ color: T.dark }}>
              From upload to caption<br /><span style={{ color: T.accent }}>in 3 simple steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: "01", icon: <Upload />, title: "Upload Your Image", desc: "Drag & drop or click to upload any image from your device. Supports JPG, PNG, and WebP up to 10MB." },
              { step: "02", icon: <Wand2 />, title: "AI Analyzes the Scene", desc: "Our Gemini Vision model scans every element — objects, mood, context, colors — to deeply understand your image." },
              { step: "03", icon: <Copy />, title: "Copy & Post Instantly", desc: "Receive platform-ready captions with your chosen tone. Copy with one click and post to any social media." }
            ].map((s, i) => (
              <div key={i} className="group cursor-default">
                <div className="p-10 rounded-[32px] border bg-white hover:shadow-xl transition-all group-hover:-translate-y-2" style={{ borderColor: T.border }}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform" style={{ background: T.dark }}>
                      {React.cloneElement(s.icon, { className: "w-7 h-7" })}
                    </div>
                    <span className="text-6xl font-black group-hover:text-[#c4956a] transition-colors" style={{ color: `rgba(196,149,106,0.15)` }}>{s.step}</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight" style={{ color: T.dark }}>{s.title}</h3>
                  <p className="leading-relaxed font-medium" style={{ color: T.mid }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING CTA ═════════════════════════════════════════ */}
      <section id="pricing" className="py-32 px-8 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[48px] p-16 md:p-24 overflow-hidden relative" style={{ background: T.dark }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 30%, rgba(196,149,106,0.1) 0%, transparent 60%)` }}></div>
            <div className="relative z-10 text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] mb-6" style={{ color: T.accent }}>Get Started Today</p>
              <h2 className="text-6xl font-black tracking-tight mb-8 text-white">
                Free to start.<br /><span style={{ color: T.accent }}>Unlimited potential.</span>
              </h2>
              <p className="text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                No credit card required. Start generating AI captions from your images in under 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
                <button onClick={() => navigate("/signup")} className="group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-white shadow-2xl transition-all hover:scale-[1.03] active:scale-95" style={{ background: T.accent }} onMouseEnter={e => e.currentTarget.style.background = T.accentHover} onMouseLeave={e => e.currentTarget.style.background = T.accent}>
                  Create Free Account <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate("/login")} className="px-10 py-5 rounded-2xl font-bold text-xl border transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                  Sign In Instead
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {["✅ Free forever tier", "✅ No credit card needed", "✅ Instant setup", "✅ 100 captions/month free"].map(f => (
                  <span key={f} className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="py-14 px-8 border-t" style={{ borderColor: T.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size={32} />
          <div className="flex gap-8">
            {["Privacy", "Terms", "Twitter", "GitHub", "Contact"].map(l => (
              <a key={l} href="#" className="text-sm font-medium transition-colors" style={{ color: T.muted }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = T.muted}>{l}</a>
            ))}
          </div>
          <p className="text-sm font-medium" style={{ color: T.muted }}>Built by <span style={{ color: T.mid }}>Isha Singh</span> © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Zap, Upload, Image, Copy, Wand2, Globe, Shield, Play, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

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
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative pt-44 pb-32 px-8 overflow-hidden bg-[#fafafa]">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none" style={{ background: T.accent }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 animate-pulse-slow pointer-events-none" style={{ background: T.accent }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${T.dark} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl mb-10 text-[11px] font-black uppercase tracking-[0.2em] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e0d5] transform hover:scale-105 transition-transform" style={{ color: T.accent }}>
              <Sparkles className="w-4 h-4 fill-current" />
              Next-Gen Vision AI
            </div>

            <h1 className="text-[84px] md:text-[96px] font-black leading-[0.9] tracking-[-0.04em] mb-10" style={{ color: T.dark }}>
              Turn Any Image<br />
              <span className="relative inline-block">
                Into a <span style={{ color: T.accent }}>Viral Script</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 rounded-full opacity-20" style={{ background: T.accent }}></span>
              </span>
            </h1>

            <div className="pl-6 border-l-[4px] mb-12 max-w-xl transition-all hover:pl-8" style={{ borderColor: T.accent }}>
              <p className="text-xl md:text-[22px] font-medium leading-[1.6]" style={{ color: T.mid }}>
                The world's most <span className="font-black" style={{ color: T.dark }}>intelligent vision engine</span> for creators. Generate captions that <span className="italic font-bold" style={{ color: T.accent }}>stop the scroll</span> and drive 10x engagement.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="group relative px-10 py-5 rounded-3xl font-black text-lg text-white flex items-center gap-3 overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(26,26,26,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(26,26,26,0.4)]"
                style={{ background: T.dark }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 opacity-40">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-sm" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }}></div>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest">Trusted by 2,000+ top creators</p>
            </div>
          </div>

          {/* Product mockup card */}
          <div className="relative hidden lg:block perspective-1000">
            <div className="animate-float-slow rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border bg-white relative z-10" style={{ borderColor: T.border }}>
              {/* Chrome bar */}
              <div className="h-14 flex items-center gap-4 px-8 border-b bg-[#fcfbf9]/80 backdrop-blur-md" style={{ borderColor: T.border }}>
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner"></div>
                </div>
                <div className="flex-grow flex justify-center">
                  <div className="h-6 w-full max-w-[280px] rounded-full flex items-center px-4 text-[10px] font-bold opacity-30 tracking-tight" style={{ background: T.border }}>
                    snapscript.ai/workspace
                  </div>
                </div>
                <div className="w-10"></div>
              </div>

              <div className="p-12">
                <div className="grid grid-cols-[1fr_280px] gap-8 items-start">
                  {/* Upload Area */}
                  <div className="aspect-square rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center gap-6 group cursor-pointer transition-all hover:bg-[#fff9f4]" style={{ borderColor: T.border, background: T.surface }}>
                    <div className="w-20 h-20 rounded-[28px] flex items-center justify-center bg-white shadow-xl group-hover:scale-110 transition-transform">
                      <Image className="w-10 h-10" style={{ color: T.accent }} />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-base mb-1" style={{ color: T.dark }}>Drop image here</p>
                      <p className="text-xs font-medium opacity-40">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  {/* AI Output Preview */}
                  <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-black">
                        <Zap className="w-4 h-4 fill-current text-[#c4956a]" />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-[0.2em]" style={{ color: T.dark }}>Gemini Engine</span>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-3 top-4 w-1 h-12 rounded-full" style={{ background: T.accent }}></div>
                      <div className="rounded-[28px] p-6 text-[13px] leading-relaxed italic font-medium shadow-sm border border-[#e8e0d5] bg-[#fffcf9]" style={{ color: T.mid }}>
                        "Golden hour hits different 🌅 Breathe it in. #GoldenHour #VibeCheck #Aesthetic"
                      </div>
                    </div>

                    <div className="w-full py-4 rounded-2xl text-white font-black text-xs flex items-center justify-center gap-3 shadow-[0_15px_30px_-10px_rgba(196,149,106,0.6)] transform hover:-translate-y-1 transition-all active:scale-95 cursor-pointer" style={{ background: T.accent }}>
                      <Copy className="w-4 h-4" /> Copy Viral Script
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Speed Badge */}
            <div className="absolute -top-10 -right-10 bg-white rounded-3xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border animate-bounce-slow z-20" style={{ borderColor: T.border }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black text-white shadow-lg">
                  <Zap className="w-6 h-6 fill-current text-[#c4956a]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-0.5">Latency</p>
                  <p className="text-lg font-black text-[#1a1a1a]">0.28s <span className="text-xs opacity-50">⚡</span></p>
                </div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ background: T.accent }}></div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════ */}
      <section id="features" className="py-40 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5f0eb] rounded-full blur-[120px] opacity-30 -z-10"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#1a1a1a] text-white">The Toolkit</div>
              <h2 className="text-[64px] font-black leading-[0.95] tracking-tight text-[#1a1a1a]">Everything creators<br />actually need.</h2>
            </div>
            <p className="text-lg font-medium opacity-50 max-w-sm mb-4">No fluff. Just the most powerful AI primitives for digital distribution.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Wand2 />, title: "Vision Analysis", desc: "Reads objects, mood, and context with sub-pixel precision." },
              { icon: <Sparkles />, title: "Style Overlays", desc: "Switch between 5+ professional tones with a single click." },
              { icon: <Globe />, title: "Global Reach", desc: "Native support for Hindi, Hinglish, Spanish and beyond." },
              { icon: <Shield />, title: "Encrypted Cloud", desc: "Your images are processed in a secure sandbox & never stored." },
              { icon: <Zap />, title: "Millisecond Sync", desc: "Powered by Gemini 1.5 Flash for near-instant execution." },
              { icon: <Copy />, title: "Multi-Platform Export", desc: "Optimized formatting for Instagram, X, and LinkedIn." }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[40px] border border-[#e8e0d5] bg-white transition-all hover:border-[#1a1a1a] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg bg-[#1a1a1a] text-white">
                  {React.cloneElement(f.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                <p className="font-medium text-[15px] opacity-40 leading-relaxed group-hover:opacity-100 transition-opacity">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section id="how" className="py-40 px-8 relative overflow-hidden" style={{ background: T.surface }}>
        <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-[#d8d0c5] -translate-y-1/2 hidden md:block"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-white border border-[#e8e0d5] text-[#c4956a] mb-6">The Process</div>
            <h2 className="text-[64px] font-black tracking-tight leading-none">3 Steps to Virality</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
            {[
              { step: "01", icon: <Upload />, title: "Upload", desc: "Select any visual asset from your device." },
              { step: "02", icon: <Wand2 />, title: "Analyze", desc: "Gemini Vision reads the context & mood." },
              { step: "03", icon: <Copy />, title: "Deploy", desc: "Copy & post with one-click formatting." }
            ].map((s, i) => (
              <div key={i} className="relative group text-center md:text-left">
                <div className="w-24 h-24 rounded-[32px] bg-white border border-[#e8e0d5] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1a1a1a] mb-10 transition-all group-hover:scale-110 group-hover:-rotate-3 relative z-10 mx-auto md:mx-0">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1a1a1a] text-white text-[10px] font-black flex items-center justify-center border-4 border-[#f5f0eb]">{s.step}</div>
                  {React.cloneElement(s.icon, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-3xl font-black mb-4">{s.title}</h3>
                <p className="font-medium text-[#4a4a4a] opacity-50 text-lg leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING (UNLIMITED) ══════════════════════════════════ */}
      <section id="pricing" className="py-48 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[64px] p-24 text-center relative overflow-hidden bg-[#1a1a1a] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 0%, ${T.accent} 0%, transparent 50%), radial-gradient(circle at 0% 100%, ${T.accent} 0%, transparent 50%)` }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.4em] mb-10" style={{ color: T.accent }}>Pricing Simplified</p>
              <h2 className="text-[72px] font-black leading-[0.9] mb-10 tracking-tight">
                Unlimited for <br /> everyone, <span style={{ color: T.accent }}>forever.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-10 mb-16 opacity-40">
                {["No Credit Card", "Unlimited Generations", "All Style Tones", "Privacy Guaranteed"].map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
};

export default Home;
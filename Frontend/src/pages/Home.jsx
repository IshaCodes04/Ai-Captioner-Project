import React from "react";
import { ArrowRight, Zap, Sparkles, Wand2, Shield, Globe, Layers, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] font-['Inter'] selection:bg-[#14f1d9]/30 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#020617]/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 group cursor-pointer transition-all hover:scale-105">
            <div className="w-10 h-10 bg-[#14f1d9] rounded-xl flex items-center justify-center text-[#020617] shadow-lg shadow-[#14f1d9]/20">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">AI Captioner</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-slate-400">
            <a href="#features" className="hover:text-[#14f1d9] transition-colors">Features</a>
            <a href="#steps" className="hover:text-[#14f1d9] transition-colors">How it works</a>
            <a href="#about" className="hover:text-[#14f1d9] transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-full text-white hover:text-[#14f1d9] transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 bg-white text-[#020617] rounded-full hover:bg-[#14f1d9] transition-all shadow-xl shadow-white/5 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#14f1d9]/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-[#14f1d9] text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 fill-current" />
            Empowering 10k+ Creators with AI
          </div>

          <h1 className="text-7xl md:text-[92px] font-[900] leading-[0.95] tracking-[-0.04em] mb-10 animate-slideUp">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14f1d9] via-cyan-400 to-emerald-400">
              Visual Storytelling
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-xl font-medium leading-relaxed mb-12 animate-fadeIn opacity-80">
            Transform your images into viral narratives instantly. AI Captioner understands the context, soul, and vibes of your visuals better than ever before.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-slideUp">
            <button
              onClick={() => navigate("/signup")}
              className="group relative px-10 py-5 bg-[#14f1d9] text-[#020617] font-black text-xl rounded-2xl shadow-2xl shadow-[#14f1d9]/20 hover:scale-[1.05] active:scale-95 transition-all overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 group-hover:h-full transition-all"></div>
              <div className="relative flex items-center gap-3">
                Start Creating Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            <button className="px-10 py-5 border border-slate-800 rounded-2xl font-black text-xl text-slate-300 hover:bg-white hover:text-[#020617] transition-all">
              Watch Demo
            </button>
          </div>

          {/* Social Proof Dashboard Mockup */}
          <div className="mt-24 relative max-w-5xl mx-auto rounded-[40px] border border-white/10 bg-slate-900/50 p-4 backdrop-blur-3xl group shadow-2xl hover:border-slate-700 transition-all duration-700">
            <div className="rounded-[30px] overflow-hidden border border-white/5 bg-[#020617]">
              <div className="h-10 bg-slate-900/80 flex items-center gap-2 px-6 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <div className="p-10 font-black text-4xl text-slate-800 flex items-center justify-center min-h-[400px] uppercase italic tracking-tighter opacity-20">
                Interactive Tool Preview
              </div>
            </div>

            {/* Floating UI elements */}
            <div className="absolute top-20 -right-20 p-6 bg-[#0f172a] border border-slate-800 rounded-3xl shadow-2xl animate-float">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="w-32 h-2 bg-slate-800 rounded-full mb-2"></div>
              <div className="w-20 h-2 bg-slate-800/50 rounded-full"></div>
            </div>

            <div className="absolute -bottom-10 -left-10 p-6 bg-[#0f172a] border border-slate-800 rounded-3xl shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#14f1d9] rounded-full flex items-center justify-center text-[#020617]">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="w-24 h-2 bg-slate-800 rounded-full mb-1"></div>
                  <div className="w-16 h-1.5 bg-[#14f1d9]/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 tracking-tight uppercase italic">Everything You Need</h2>
            <p className="text-slate-400 text-lg font-medium">Built with the world's most advanced AI models for professional results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-900 shadow-xl hover:bg-slate-800/80 transition-all border border-slate-800 group">
              <div className="w-16 h-16 bg-[#14f1d9]/10 rounded-2xl flex items-center justify-center text-[#14f1d9] mb-8 group-hover:scale-110 transition-transform">
                <Wand2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">Neural Analysis</h3>
              <p className="text-slate-400 leading-relaxed">Deep learning models that recognize over 50k unique objects and scenes instantly.</p>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-900 shadow-xl hover:bg-slate-800/80 transition-all border border-slate-800 group">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">Multi-Lingual</h3>
              <p className="text-slate-400 leading-relaxed">Generate perfect captions in 40+ languages including Hindi, Spanish, and French.</p>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-900 shadow-xl hover:bg-slate-800/80 transition-all border border-slate-800 group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">Unlimited Styles</h3>
              <p className="text-slate-400 leading-relaxed">From sarcastic and funny to professional and poetic - we've got you covered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Stats */}
      <section className="py-32 px-6 bg-slate-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl font-black tracking-tight uppercase italic mb-8">Ready to <br /><span className="text-[#14f1d9]">Level Up?</span></h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
                Start for free and upgrade as you grow. No hidden fees, just pure AI power at your fingertips.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#14f1d9]/20 flex items-center justify-center text-[#14f1d9]">✓</div>
                  <span className="text-lg font-bold text-slate-300">100 Free Captions / Month</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#14f1d9]/20 flex items-center justify-center text-[#14f1d9]">✓</div>
                  <span className="text-lg font-bold text-slate-300">Advanced Scene Recognition</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#14f1d9]/20 flex items-center justify-center text-[#14f1d9]">✓</div>
                  <span className="text-lg font-bold text-slate-300">Save to Cloud History</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#14f1d9]/20 to-purple-500/20 blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-12 rounded-[48px] bg-slate-900 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h4 className="text-2xl font-black mb-2">PRO PLAN</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Power User Tier</p>
                  </div>
                  <div className="text-4xl font-black text-[#14f1d9] tracking-tighter">$9.99<span className="text-sm text-slate-600 font-bold">/mo</span></div>
                </div>

                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-5 bg-white text-[#020617] rounded-3xl font-black text-xl hover:bg-[#14f1d9] transition-all shadow-xl active:scale-95 mb-8"
                >
                  Upgrade Now
                </button>

                <p className="text-center text-slate-600 text-sm font-bold tracking-tight">7-Day Free Trial Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="steps" className="py-32 px-6 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-6 text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14f1d9]/10 text-[#14f1d9] text-[10px] font-black uppercase tracking-widest mb-6">Expertise</div>
              <h2 className="text-6xl font-black tracking-tight uppercase italic mb-8">Simple 3-Step <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14f1d9] to-cyan-400">Process</span></h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">From raw pixel data to engagement-ready copy in seconds. No complex prompt engineering required.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-20 relative">
            <div className="hidden md:block absolute top-[28%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent -z-10"></div>

            <div className="relative group text-left">
              <div className="w-16 h-16 rounded-[24px] bg-slate-800 flex items-center justify-center text-2xl font-black mb-10 group-hover:bg-[#14f1d9] group-hover:text-[#020617] group-hover:scale-110 transition-all border border-white/5 shadow-2xl">01</div>
              <h4 className="text-2xl font-black mb-4">Upload Visuals</h4>
              <p className="text-slate-500 font-medium leading-relaxed">Securely upload any format (JPG/PNG) using our high-speed global cloud engine.</p>
            </div>

            <div className="relative group text-left">
              <div className="w-16 h-16 rounded-[24px] bg-slate-800 flex items-center justify-center text-2xl font-black mb-10 group-hover:bg-[#14f1d9] group-hover:text-[#020617] group-hover:scale-110 transition-all border border-white/5 shadow-2xl">02</div>
              <h4 className="text-2xl font-black mb-4">AI Scan</h4>
              <p className="text-slate-500 font-medium leading-relaxed">Our advanced neural network analyzes the mood, colors, and vibes of your image instantly.</p>
            </div>

            <div className="relative group text-left">
              <div className="w-16 h-16 rounded-[24px] bg-slate-800 flex items-center justify-center text-2xl font-black mb-10 group-hover:bg-[#14f1d9] group-hover:text-[#020617] group-hover:scale-110 transition-all border border-white/5 shadow-2xl">03</div>
              <h4 className="text-2xl font-black mb-4">Get Captions</h4>
              <p className="text-slate-500 font-medium leading-relaxed">Receive multiple caption variants tailored to your brand's unique social voice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative bg-[#020617]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#14f1d9]/20 rounded-xl flex items-center justify-center text-[#14f1d9]">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">AI Captioner</span>
          </div>

          <div className="flex gap-8 text-sm font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-sm font-bold text-slate-600">Created by Isha Singh © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

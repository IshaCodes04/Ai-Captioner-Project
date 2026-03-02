import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Upload, Copy, Sparkles, Zap, LogOut, RefreshCw,
    History, Image as ImageIcon, Smile, Laugh, Briefcase,
    Theater, Hash, CheckCircle2, ChevronDown, Trash2
} from "lucide-react";

const T = {
    bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
    mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
    accentHover: "#b5845a", border: "#e8e0d5",
};

const ImageCaptioner = ({ onLogout, user }) => {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [caption, setCaption] = useState("");
    const [captionStyle, setCaptionStyle] = useState("casual");
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [dragOver, setDragOver] = useState(false);
    const [captionHistory, setCaptionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef(null);

    const captionStyles = [
        { id: "casual", label: "Casual", icon: <Smile className="w-4 h-4" /> },
        { id: "funny", label: "Funny", icon: <Laugh className="w-4 h-4" /> },
        { id: "professional", label: "Professional", icon: <Briefcase className="w-4 h-4" /> },
        { id: "poetic", label: "Poetic", icon: <Theater className="w-4 h-4" /> },
        { id: "hashtags", label: "Hashtags", icon: <Hash className="w-4 h-4" /> },
    ];

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const handleFile = async (file) => {
        if (!file || !file.type.startsWith("image/")) { showToast("Please upload a valid image file", "error"); return; }
        if (file.size > 10 * 1024 * 1024) { showToast("File must be under 10MB", "error"); return; }
        setPreviewUrl(URL.createObjectURL(file));
        setCaption("");
        setIsGenerating(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await axios.post("http://localhost:3000/api/posts", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            const gen = res.data?.post?.caption || "";
            setCaption(gen);
            showToast("Caption generated! ✨");
            if (gen) setCaptionHistory(prev => [{ id: Date.now(), caption: gen, style: "auto", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...prev.slice(0, 9)]);
        } catch (err) {
            showToast(err.response?.data?.message || "Upload failed. Try again.", "error");
            setPreviewUrl(null);
        } finally { setIsGenerating(false); }
    };

    const generateCaption = () => {
        if (!previewUrl) return;
        setIsGenerating(true);
        setCaption("");
        const samples = {
            casual: "Just another golden hour 🌅 Some moments are too good to keep to yourself. #VibeCheck",
            funny: "Me: 'I won't take many photos today.' Also me: 📸📸📸 IYKYK 😅 #Relatable",
            professional: "Capturing excellence in every frame. Visual storytelling at its finest. #ContentCreation",
            poetic: "In quiet spaces between light and shadow, time holds its breath. ✨ #NaturePoetry",
            hashtags: "Living my best life ✨ #Photography #Aesthetic #Vibes #ContentCreator #Trending #Explore",
        };
        setTimeout(() => {
            const gen = samples[captionStyle];
            setCaption(gen);
            setIsGenerating(false);
            showToast(`${captionStyles.find(s => s.id === captionStyle)?.label} caption ready!`);
            setCaptionHistory(prev => [{ id: Date.now(), caption: gen, style: captionStyle, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...prev.slice(0, 9)]);
        }, 1800);
    };

    const copyCaption = async () => {
        if (!caption) return;
        try { await navigator.clipboard.writeText(caption); setCopied(true); showToast("Copied! 🎉"); setTimeout(() => setCopied(false), 2500); }
        catch { showToast("Failed to copy", "error"); }
    };

    return (
        <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'Outfit', sans-serif", color: T.dark }}>

            {/* TOAST */}
            {toast.show && (
                <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl border animate-fadeUp`}
                    style={toast.type === "error"
                        ? { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#dc2626" }
                        : { background: "rgba(196,149,106,0.1)", border: `1px solid rgba(196,149,106,0.25)`, color: T.accent }
                    }>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: toast.type === "error" ? "#dc2626" : T.accent }}></div>
                    {toast.message}
                </div>
            )}

            {/* NAVBAR */}
            <nav className="sticky top-0 z-[100] border-b" style={{ background: "white", borderColor: T.border }}>
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/home")}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow" style={{ background: T.dark }}>
                            <Zap className="w-5 h-5 fill-current" style={{ color: T.accent }} />
                        </div>
                        <span className="text-lg font-black tracking-tight" style={{ color: T.dark }}>Caption<span style={{ color: T.accent }}>AI</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#059669" }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            AI Online
                        </div>

                        {user && (
                            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl border" style={{ background: T.surface, borderColor: T.border }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: T.accent }}>
                                    {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <span className="text-sm font-semibold" style={{ color: T.mid }}>{user.fullName?.split(" ")[0]}</span>
                            </div>
                        )}

                        <button onClick={onLogout} className="flex items-center gap-2 font-semibold text-sm transition-colors group" style={{ color: T.muted }} onMouseEnter={e => e.currentTarget.style.color = "#dc2626"} onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MAIN */}
            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: T.dark }}>
                        AI Caption <span style={{ color: T.accent }}>Studio</span>
                    </h1>
                    <p className="font-medium" style={{ color: T.muted }}>Upload an image → AI reads the scene → Get your perfect caption</p>
                </div>

                <div className="grid lg:grid-cols-[1fr_420px] gap-10">

                    {/* UPLOAD */}
                    <div className="space-y-8">
                        <div
                            className="relative border-2 border-dashed rounded-[32px] transition-all cursor-pointer overflow-hidden group"
                            style={{ borderColor: dragOver ? T.accent : T.border, background: dragOver ? `rgba(196,149,106,0.05)` : T.surface }}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                            onClick={() => !previewUrl && fileInputRef.current?.click()}
                        >
                            {previewUrl ? (
                                <div className="relative">
                                    <img src={previewUrl} alt="Preview" className="w-full max-h-[520px] object-cover rounded-[30px]" />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all rounded-[30px] flex items-center justify-center gap-5" style={{ background: "rgba(26,26,26,0.6)", backdropFilter: "blur(4px)" }}>
                                        <button onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setCaption(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                            className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all" style={{ background: "rgba(239,68,68,0.8)" }}>
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                            className="flex items-center gap-2 text-white px-5 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all" style={{ background: "rgba(255,255,255,0.2)" }}>
                                            <Upload className="w-4 h-4" /> Replace
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-5 py-24 px-8 text-center">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center border-2 group-hover:scale-110 transition-all" style={{ background: "white", borderColor: T.border }}>
                                        <ImageIcon className="w-10 h-10 transition-colors" style={{ color: T.muted }} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black mb-2" style={{ color: T.dark }}>Drop your image here</p>
                                        <p className="font-medium text-sm" style={{ color: T.muted }}>or click to browse files</p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {["JPG", "PNG", "WebP", "Max 10MB"].map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border" style={{ background: "white", borderColor: T.border, color: T.muted }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                        </div>

                        {/* Style Selector */}
                        {previewUrl && (
                            <div className="rounded-3xl p-6 border" style={{ background: "white", borderColor: T.border }}>
                                <div className="flex items-center gap-2.5 mb-5">
                                    <Sparkles className="w-4 h-4" style={{ color: T.accent }} />
                                    <p className="font-black text-sm" style={{ color: T.dark }}>Choose Caption Tone</p>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {captionStyles.map(style => (
                                        <button key={style.id} onClick={() => setCaptionStyle(style.id)}
                                            className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95"
                                            style={captionStyle === style.id
                                                ? { background: T.dark, borderColor: T.dark, color: "white" }
                                                : { background: T.surface, borderColor: T.border, color: T.muted }
                                            }
                                            onMouseEnter={e => { if (captionStyle !== style.id) { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; } }}
                                            onMouseLeave={e => { if (captionStyle !== style.id) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; } }}
                                        >
                                            {React.cloneElement(style.icon, { className: "w-5 h-5" })}
                                            {style.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* OUTPUT */}
                    <div className="flex flex-col gap-6">
                        <div className="flex-grow rounded-3xl p-8 border flex flex-col min-h-[420px]" style={{ background: "white", borderColor: T.border }}>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(196,149,106,0.12)` }}>
                                        <Sparkles className="w-5 h-5" style={{ color: T.accent }} />
                                    </div>
                                    <p className="font-black" style={{ color: T.dark }}>AI Output</p>
                                </div>
                                {caption && (
                                    <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: "rgba(52,211,153,0.1)", color: "#059669", border: "1px solid rgba(52,211,153,0.2)" }}>Ready</div>
                                )}
                            </div>

                            <div className="flex-grow flex flex-col justify-center">
                                {isGenerating ? (
                                    <div className="flex flex-col items-center gap-6 py-12 text-center">
                                        <div className="relative w-16 h-16">
                                            <div className="absolute inset-0 border-4 rounded-full" style={{ borderColor: `rgba(196,149,106,0.15)` }}></div>
                                            <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${T.accent} transparent transparent transparent` }}></div>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black mb-2" style={{ color: T.dark }}>Analyzing image...</p>
                                            <p className="font-medium text-sm" style={{ color: T.muted }}>AI is reading the scene, mood & context</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: T.accent, animationDelay: `${i * 0.15}s` }}></div>)}
                                        </div>
                                    </div>
                                ) : caption ? (
                                    <div className="animate-fadeUp">
                                        <div className="rounded-2xl p-6 mb-6 border" style={{ background: T.surface, borderColor: T.border }}>
                                            <p className="leading-relaxed font-medium italic" style={{ color: T.mid }}>"{caption}"</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={copyCaption}
                                                className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                                                style={copied ? { background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#059669" } : { background: T.dark, color: "white" }}
                                                onMouseEnter={e => { if (!copied) e.currentTarget.style.background = T.accent; }}
                                                onMouseLeave={e => { if (!copied) e.currentTarget.style.background = T.dark; }}
                                            >
                                                {copied ? <><CheckCircle2 className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Caption</>}
                                            </button>
                                            <button onClick={generateCaption} className="w-16 h-16 flex items-center justify-center rounded-2xl border transition-all group/re"
                                                style={{ background: T.surface, borderColor: T.border, color: T.muted }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
                                                <RefreshCw className="w-5 h-5 group-hover/re:rotate-180 transition-transform duration-500" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 py-12 text-center opacity-40">
                                        <Sparkles className="w-16 h-16 animate-float" style={{ color: T.border }} />
                                        <div>
                                            <p className="text-lg font-black mb-1" style={{ color: T.muted }}>No caption yet</p>
                                            <p className="font-medium text-sm" style={{ color: T.border }}>Upload an image to get started</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {previewUrl && !isGenerating && (
                                <button onClick={generateCaption}
                                    className="mt-6 w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 text-white shadow-lg active:scale-[0.98] transition-all"
                                    style={{ background: T.dark }}
                                    onMouseEnter={e => e.currentTarget.style.background = T.accent}
                                    onMouseLeave={e => e.currentTarget.style.background = T.dark}
                                >
                                    <Sparkles className="w-5 h-5" />
                                    {caption ? `Regenerate (${captionStyles.find(s => s.id === captionStyle)?.label})` : "Generate Caption"}
                                </button>
                            )}
                        </div>

                        {/* History */}
                        {captionHistory.length > 0 && (
                            <div className="rounded-3xl overflow-hidden border" style={{ background: "white", borderColor: T.border }}>
                                <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between px-7 py-5 transition-all"
                                    style={{ color: T.muted }} onMouseEnter={e => e.currentTarget.style.background = T.surface} onMouseLeave={e => e.currentTarget.style.background = "white"}>
                                    <div className="flex items-center gap-3">
                                        <History className="w-4 h-4" />
                                        <span className="font-black text-sm">Recent Captions</span>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black" style={{ background: `rgba(196,149,106,0.12)`, color: T.accent }}>{captionHistory.length}</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showHistory ? "rotate-180" : ""}`} style={{ color: T.muted }} />
                                </button>

                                {showHistory && (
                                    <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto" style={{ borderTop: `1px solid ${T.border}`, paddingTop: "12px" }}>
                                        {captionHistory.map(item => (
                                            <button key={item.id} onClick={() => setCaption(item.caption)}
                                                className="w-full text-left p-4 rounded-2xl border transition-all hover:-translate-x-1 group"
                                                style={{ background: T.surface, borderColor: T.border }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}>
                                                <p className="text-xs font-medium line-clamp-2 mb-2 transition-colors" style={{ color: T.mid }}>"{item.caption}"</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: T.accent }}>{item.style}</span>
                                                    <span className="text-[10px]" style={{ color: T.muted }}>{item.timestamp}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ImageCaptioner;

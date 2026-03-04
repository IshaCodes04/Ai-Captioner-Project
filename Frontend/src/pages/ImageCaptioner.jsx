import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Upload, Copy, Sparkles, Zap, LogOut, RefreshCw,
    History, Image as ImageIcon, Smile, Laugh, Briefcase,
    Theater, Hash, CheckCircle2, ChevronDown, Trash2, LayoutGrid
} from "lucide-react";
const T = {
    bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
    mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
    accentHover: "#b5845a", border: "#e8e0d5",
};

// ─── Markdown Parser ────────────────────────────────────────────────
// Converts AI output like **Section:** * bullet into structured data
const parseCaptionMarkdown = (text) => {
    const sections = [];
    const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
    let currentSection = null;

    for (const line of lines) {
        const headerMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)$/);
        if (headerMatch) {
            if (currentSection) sections.push(currentSection);
            currentSection = { title: headerMatch[1].replace(/:$/, ""), bullets: [] };
            const rest = headerMatch[2].trim();
            if (rest) currentSection.bullets.push(rest);
        } else if (/^[*•-]\s+/.test(line)) {
            const bullet = line.replace(/^[*•-]\s+/, "").trim();
            if (bullet) {
                if (!currentSection) currentSection = { title: null, bullets: [] };
                currentSection.bullets.push(bullet);
            }
        } else {
            if (!currentSection) currentSection = { title: null, bullets: [] };
            if (line.length > 3) currentSection.bullets.push(line);
        }
    }
    if (currentSection) sections.push(currentSection);
    return sections.filter(s => s.bullets.length > 0);
};

// ─── Single Caption Bullet Row ───────────────────────────────────────
const CaptionBullet = ({ text, T }) => {
    const [copiedItem, setCopiedItem] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedItem(true);
            setTimeout(() => setCopiedItem(false), 2000);
        } catch (error) {
            console.error("Copy failed", error);
        }
    };

    return (
        <div
            className="flex items-start gap-3 px-4 py-3 rounded-2xl border group transition-all"
            style={{ background: T.surface, borderColor: T.border }}
        >
            {/* Bullet dot */}
            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: T.accent }} />

            {/* Caption text */}
            <p className="flex-1 text-sm leading-relaxed font-medium" style={{ color: T.mid }}>
                {text}
            </p>

            {/* Copy button */}
            <button
                onClick={handleCopy}
                title="Copy this caption"
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95"
                style={
                    copiedItem
                        ? { background: "rgba(52,211,153,0.12)", color: "#059669", border: "1px solid rgba(52,211,153,0.25)" }
                        : { background: "white", color: T.muted, border: `1px solid ${T.border}` }
                }
                onMouseEnter={e => { if (!copiedItem) { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; } }}
                onMouseLeave={e => { if (!copiedItem) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; } }}
            >
                {copiedItem ? <><CheckCircle2 className="w-3.5 h-3.5" /> Done</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
        </div>
    );
};

// ─── Full Caption Output Block ────────────────────────────────────────
const CaptionOutput = ({ caption, T, onRegenerateClick }) => {
    const [copiedAll, setCopiedAll] = useState(false);
    const sections = parseCaptionMarkdown(caption);

    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(caption);
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 2500);
        } catch (error) {
            console.error("Copy all failed", error);
        }
    };

    // If parsing produced nothing meaningful, fall back to raw display
    const hasStructure = sections.length > 0 && sections.some(s => s.bullets.length > 0);

    return (
        <div className="animate-fadeUp w-full">
            {/* Captions list */}
            <div className="space-y-6 mb-6 max-h-[360px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                {hasStructure ? (
                    sections.map((section, si) => (
                        <div key={si}>
                            {section.title && (
                                <p className="text-[11px] font-black uppercase tracking-widest mb-2 px-1" style={{ color: T.accent }}>
                                    {section.title}
                                </p>
                            )}
                            <div className="space-y-2">
                                {section.bullets.map((bullet, bi) => (
                                    <CaptionBullet key={bi} text={bullet} T={T} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    // Fallback: show raw caption as single bullet
                    <CaptionBullet text={caption} T={T} />
                )}
            </div>

            {/* Bottom action row */}
            <div className="flex gap-3">
                <button
                    onClick={copyAll}
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                    style={
                        copiedAll
                            ? { background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#059669" }
                            : { background: T.dark, color: "white" }
                    }
                    onMouseEnter={e => { if (!copiedAll) e.currentTarget.style.background = T.accent; }}
                    onMouseLeave={e => { if (!copiedAll) e.currentTarget.style.background = T.dark; }}
                >
                    {copiedAll
                        ? <><CheckCircle2 className="w-5 h-5" /> All Copied!</>
                        : <><Copy className="w-5 h-5" /> Copy All</>}
                </button>

                <button
                    onClick={onRegenerateClick}
                    className="w-16 h-16 flex items-center justify-center rounded-2xl border transition-all group/re"
                    style={{ background: T.surface, borderColor: T.border, color: T.muted }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
                    title="Regenerate"
                >
                    <RefreshCw className="w-5 h-5 group-hover/re:rotate-180 transition-transform duration-500" />
                </button>
            </div>
        </div>
    );
};

// ─── Gallery View ─────────────────────────────────────────────────────
const GalleryView = ({ history, T, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {history.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="group relative bg-white rounded-[32px] border border-[#e8e0d5] overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                            src={item.image}
                            alt="captioned"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: T.surface, color: T.accent }}>
                                {item.style}
                            </span>
                            <span className="text-[10px] font-bold" style={{ color: T.muted }}>
                                {item.timestamp}
                            </span>
                        </div>
                        <p className="text-sm font-medium line-clamp-3 leading-relaxed" style={{ color: T.dark }}>
                            "{item.caption}"
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/90 p-4 rounded-2xl scale-90 group-hover:scale-100 transition-transform">
                            <Sparkles className="w-6 h-6" style={{ color: T.accent }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────
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
    const [showProfile, setShowProfile] = useState(false);
    const [activeTab, setActiveTab] = useState("editor"); // 'editor' or 'gallery'
    const fileInputRef = useRef(null);
    const uploadedFileRef = useRef(null); // store last uploaded file for regeneration

    // Fetch History on Mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/posts", { withCredentials: true });
                if (res.data?.posts) {
                    const formattedHistory = res.data.posts.map(p => ({
                        id: p._id,
                        caption: p.caption,
                        style: p.tone || "casual",
                        image: p.image, // we can use this to show small preview later
                        timestamp: new Date(p.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    }));
                    setCaptionHistory(formattedHistory);
                }
            } catch (err) {
                console.error("Error fetching history:", err);
            }
        };
        fetchHistory();
    }, []);

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
        uploadedFileRef.current = file; // save for regeneration
        setPreviewUrl(URL.createObjectURL(file));
        setCaption("");
        setIsGenerating(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("tone", captionStyle); // send selected tone
            const res = await axios.post("http://localhost:3000/api/posts", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            const gen = res.data?.post?.caption || "";
            setCaption(gen);
            showToast("Caption generated! ✨");
            if (gen && res.data?.post) {
                const newPost = {
                    id: res.data.post._id,
                    caption: gen,
                    style: res.data.post.tone || captionStyle,
                    image: res.data.post.image,
                    timestamp: new Date(res.data.post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                };
                setCaptionHistory(prev => [newPost, ...prev.slice(0, 9)]);
            }
        } catch (err) {
            console.error("Upload error:", err.response?.data);
            if (err.response?.status === 401) {
                showToast("Session expired. Signing out...", "error");
                setTimeout(onLogout, 1500);
            } else {
                showToast(err.response?.data?.message || "Upload failed. Try again.", "error");
            }
            setPreviewUrl(null);
        } finally { setIsGenerating(false); }
    };

    // Regenerate with the selected tone using the same image
    const generateCaption = async () => {
        if (!uploadedFileRef.current) { showToast("Please upload an image first", "error"); return; }
        setIsGenerating(true);
        setCaption("");
        try {
            const formData = new FormData();
            formData.append("image", uploadedFileRef.current);
            formData.append("tone", captionStyle); // send the newly selected tone
            const res = await axios.post("http://localhost:3000/api/posts", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            const gen = res.data?.post?.caption || "";
            setCaption(gen);
            showToast(`${captionStyles.find(s => s.id === captionStyle)?.label} caption ready! ✨`);
            if (gen && res.data?.post) {
                const newPost = {
                    id: res.data.post._id,
                    caption: gen,
                    style: res.data.post.tone || captionStyle,
                    image: res.data.post.image,
                    timestamp: new Date(res.data.post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                };
                setCaptionHistory(prev => [newPost, ...prev.slice(0, 9)]);
            }
        } catch (err) {
            console.error("Regeneration error:", err.response?.data);
            if (err.response?.status === 401) {
                showToast("Session expired. Signing out...", "error");
                setTimeout(onLogout, 1500);
            } else {
                showToast(err.response?.data?.message || "Generation failed. Try again.", "error");
            }
        } finally { setIsGenerating(false); }
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
                        <span className="text-lg font-black tracking-tight" style={{ color: T.dark }}>Snap<span style={{ color: T.accent }}>Script</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#059669" }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            AI Online
                        </div>

                        <div className="h-8 w-px bg-[#e8e0d5] hidden md:block"></div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActiveTab("editor")}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "editor" ? "shadow-md scale-105" : "opacity-50 hover:opacity-100"}`}
                                style={activeTab === "editor" ? { background: T.dark, color: "white" } : { color: T.dark }}
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setActiveTab("gallery")}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "gallery" ? "shadow-md scale-105" : "opacity-50 hover:opacity-100"}`}
                                style={activeTab === "gallery" ? { background: T.dark, color: "white" } : { color: T.dark }}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                Your Gallery
                            </button>
                        </div>

                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all hover:bg-white active:scale-95"
                                    style={{ background: T.surface, borderColor: showProfile ? T.accent : T.border }}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: T.accent }}>
                                        {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                    <span className="hidden sm:inline text-sm font-semibold" style={{ color: T.mid }}>{user.fullName?.split(" ")[0]}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showProfile ? "rotate-180" : ""}`} style={{ color: T.muted }} />
                                </button>

                                {showProfile && (
                                    <div className="absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl p-5 z-[200] animate-in fade-in slide-in-from-top-2" style={{ background: "white", borderColor: T.border }}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white" style={{ background: T.accent }}>
                                                {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-black text-sm truncate" style={{ color: T.dark }}>{user.fullName}</p>
                                                <p className="text-[10px] font-medium truncate uppercase tracking-widest" style={{ color: T.muted }}>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="h-px w-full mb-4" style={{ background: T.border }}></div>
                                        <button
                                            onClick={onLogout}
                                            className="w-full flex items-center justify-between p-3 rounded-xl transition-all group"
                                            style={{ color: "#ef4444" }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#fff1f2"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <div className="flex items-center gap-3">
                                                <LogOut className="w-4 h-4" />
                                                <span className="font-bold text-sm">Logout Session</span>
                                            </div>
                                            <ChevronDown className="-rotate-90 w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: T.dark }}>
                        {activeTab === "editor" ? (
                            <>Captions by <span style={{ color: T.accent }}>Image</span></>
                        ) : (
                            <>Your AI <span style={{ color: T.accent }}>Gallery</span></>
                        )}
                    </h1>
                    <p className="font-medium" style={{ color: T.muted }}>
                        {activeTab === "editor"
                            ? "Upload an image → AI reads the scene → Get your perfect caption"
                            : "Explore your collection of AI-generated stories and visuals"
                        }
                    </p>
                </div>

                {activeTab === "gallery" ? (
                    <GalleryView
                        history={captionHistory}
                        T={T}
                        onSelect={(item) => {
                            setCaption(item.caption);
                            setPreviewUrl(item.image);
                            setActiveTab("editor");
                        }}
                    />
                ) : (
                    <div className="grid lg:grid-cols-[1fr_420px] gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

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
                                <div className="flex items-center justify-between mb-6">
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
                                                <p className="font-medium text-sm" style={{ color: T.muted }}>AI is reading the scene, mood &amp; context</p>
                                            </div>
                                            <div className="flex gap-2">
                                                {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: T.accent, animationDelay: `${i * 0.15}s` }}></div>)}
                                            </div>
                                        </div>
                                    ) : caption ? (
                                        <CaptionOutput
                                            caption={caption}
                                            T={T}
                                            onRegenerateClick={generateCaption}
                                        />
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

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ImageCaptioner;

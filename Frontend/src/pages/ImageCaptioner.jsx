import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Upload,
    Copy,
    Sparkles,
    Moon,
    Sun,
    Github,
    FileText,
    LogOut,
    Download,
    RefreshCw,
    History,
    Zap,
} from "lucide-react";

const ImageCaptioner = ({ isDarkMode, setIsDarkMode, onLogout, user }) => {
    const navigate = useNavigate();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [caption, setCaption] = useState("");
    const [captionStyle, setCaptionStyle] = useState("casual");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [captionHistory, setCaptionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [Error, setError] = useState("");
    const fileInputRef = useRef(null);

    const captionStyles = [
        { id: "casual", label: "Casual 😎", icon: "😎" },
        { id: "funny", label: "Funny 😂", icon: "😂" },
        { id: "professional", label: "Professional 💼", icon: "💼" },
        { id: "poetic", label: "Poetic 🎭", icon: "🎭" },
        { id: "hashtags", label: "With Hashtags #️⃣", icon: "#️⃣" },
    ];

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer && event.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = async (file) => {
        if (!file || !file.type.startsWith("image/")) {
            showToastMessage("Please upload a valid image file");
            return;
        }

        try {
            setIsGenerating(true);
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                "http://localhost:3000/api/posts",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            const imageUrl = res.data?.post?.image || "";
            setUploadedImage(imageUrl);

            const generatedCaption = res.data?.post?.caption || "";
            setCaption(generatedCaption);

            setIsGenerating(false);
            showToastMessage("Post created successfully! ✨");

            const newHistoryItem = {
                id: Date.now(),
                caption: generatedCaption,
                style: "auto-generated",
                timestamp: new Date().toLocaleTimeString(),
            };

            setCaptionHistory((prevHistory) => [
                newHistoryItem,
                ...prevHistory.slice(0, 4),
            ]);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to create post. Please try again.");
            showToastMessage("Upload failed ❌");
            setIsGenerating(false);
        }
    };

    const generateCaption = () => {
        setIsGenerating(true);
        setCaption("");

        setTimeout(() => {
            const sampleCaptions = {
                casual: "Just captured this amazing moment! ✨ Life is beautiful when you take time to notice the little things.",
                funny: "When you accidentally take the perfect photo and pretend it was totally planned 😅📸",
                professional: "Exploring new perspectives through visual storytelling. Every image tells a unique story worth sharing.",
                poetic: "In this fleeting moment, time stands still, and beauty whispers secrets only the heart can hear. 🌟",
                hashtags: "Living my best life! ✨ #photography #moments #beautiful #inspiration #blessed #goodvibes #memories",
            };

            const generatedCaption = sampleCaptions[captionStyle];
            setCaption(generatedCaption);
            setIsGenerating(false);

            const newHistoryItem = {
                id: Date.now(),
                caption: generatedCaption,
                style: captionStyle,
                timestamp: new Date().toLocaleTimeString(),
            };

            setCaptionHistory((prevHistory) => [
                newHistoryItem,
                ...prevHistory.slice(0, 4),
            ]);
        }, 2000);
    };

    const copyCaption = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(caption);
                showToastMessage("Caption copied to clipboard! 🎉");
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = caption;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand("copy");
                document.body.removeChild(textArea);
                if (successful) showToastMessage("Caption copied to clipboard! 🎉");
            }
        } catch {
            showToastMessage("Failed to copy caption");
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target && event.target.files && event.target.files[0];
        if (file) handleFileUpload(file);
    };

    const removeImage = (event) => {
        event.stopPropagation();
        setUploadedImage(null);
        setCaption("");
    };

    const findCaptionStyleLabel = (styleId) => {
        const style = captionStyles.find((s) => s.id === styleId);
        return style ? style.label : styleId;
    };

    return (
        <div className={`min-h-screen transition-all duration-500 font-['Inter'] ${isDarkMode ? "bg-[#020617]" : "bg-gradient-to-br from-slate-50 to-slate-100"
            }`}>
            {/* Toast */}
            {showToast && (
                <div className="fixed top-6 right-6 z-50 animate-fadeIn">
                    <div className="bg-[#14f1d9] text-[#020617] px-6 py-3 rounded-2xl font-bold shadow-2xl shadow-[#14f1d9]/20 flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        {toastMessage}
                    </div>
                </div>
            )}

            {/* Nav */}
            <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDarkMode ? "bg-[#020617]/80 border-slate-800" : "bg-white/80 border-slate-200"
                }`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-10 h-10 bg-gradient-to-br from-[#14f1d9] to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#14f1d9]/20 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6 text-[#020617]" />
                        </div>
                        <span className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                            AI <span className="text-[#14f1d9]">Captioner</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Active User</span>
                            <span className={`text-sm font-bold ${isDarkMode ? "text-[#14f1d9]" : "text-slate-700"}`}>@{user?.fullName?.split(" ")[0]}</span>
                        </div>

                        <div className="h-8 w-[1px] bg-slate-800/50"></div>

                        <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 font-bold text-sm transition-colors group">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Logout</span>
                        </button>

                        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-xl transition-all hover:scale-110 ${isDarkMode ? "bg-slate-800/50 text-[#14f1d9]" : "bg-slate-100 text-slate-600"
                            }`}>
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Upload */}
                    <div className="space-y-8">
                        <div className={`p-8 rounded-[32px] border transition-all duration-500 shadow-2xl relative overflow-hidden group ${isDarkMode ? "bg-[#0f172a]/60 border-slate-800/80 hover:border-[#14f1d9]/30" : "bg-white border-slate-200"
                            }`}>
                            <h2 className={`text-3xl font-[850] mb-8 tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                Drop Your <span className="text-[#14f1d9]">Visuals</span>
                            </h2>

                            <div className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-500 min-h-[350px] cursor-pointer ${dragOver
                                ? "border-[#14f1d9] bg-[#14f1d9]/5 scale-[1.02]"
                                : isDarkMode ? "border-slate-800 hover:border-[#14f1d9]/50" : "border-slate-200 hover:border-[#14f1d9]/50"
                                }`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={triggerFileInput}>
                                {uploadedImage ? (
                                    <div className="w-full h-full relative group/img">
                                        <img src={uploadedImage} alt="Preview" className="w-full max-h-[400px] object-cover rounded-2xl shadow-2xl" />
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                            <button onClick={removeImage} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-110 active:scale-95 shadow-xl">
                                                Change Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 ${dragOver ? "scale-125 rotate-12" : ""} ${isDarkMode ? "bg-slate-800/50" : "bg-slate-50"
                                            }`}>
                                            <Upload className={`w-8 h-8 ${isDarkMode ? "text-[#14f1d9]" : "text-slate-400"}`} />
                                        </div>
                                        <p className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                            {dragOver ? "Release to process ✨" : "Drag & drop an image"}
                                        </p>
                                        <p className="text-slate-500 font-medium">PNG, JPG or WebP (Max 10MB)</p>
                                    </>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
                            </div>

                            {uploadedImage && (
                                <div className="mt-8 space-y-4 animate-fadeIn">
                                    <label className={`block text-sm font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Preferred Tone</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {captionStyles.map((style) => (
                                            <button key={style.id} onClick={() => setCaptionStyle(style.id)} className={`py-4 px-4 rounded-2xl font-bold text-sm transition-all border ${captionStyle === style.id
                                                ? "bg-[#14f1d9] border-[#14f1d9] text-[#020617] shadow-lg shadow-[#14f1d9]/20"
                                                : isDarkMode ? "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500" : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300"
                                                }`}>
                                                {style.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Result */}
                    <div className="space-y-8">
                        <div className={`p-8 rounded-[32px] border transition-all duration-500 min-h-[500px] flex flex-col justify-between shadow-2xl relative overflow-hidden ${isDarkMode ? "bg-[#0f172a]/60 border-slate-800/80" : "bg-white border-slate-200"
                            }`}>
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Sparkles className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h3 className={`text-2xl font-[850] tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>AI Magic Output</h3>
                                </div>

                                {isGenerating ? (
                                    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                                        <div className="w-16 h-16 border-4 border-[#14f1d9] border-t-transparent rounded-full animate-spin mb-6"></div>
                                        <p className="text-[#14f1d9] font-black text-xl tracking-tighter uppercase italic">Analyzing Pixels...</p>
                                    </div>
                                ) : caption ? (
                                    <div className="animate-fadeIn">
                                        <div className={`p-8 rounded-[24px] mb-8 font-medium leading-relaxed text-xl relative group ${isDarkMode ? "bg-slate-900/50 text-slate-200 border border-slate-800" : "bg-slate-50 text-slate-800"
                                            }`}>
                                            "{caption}"
                                            <div className="absolute top-[-10px] left-8 px-3 py-1 bg-purple-600 text-[10px] font-black uppercase text-white rounded-full tracking-widest shadow-lg">New Generation</div>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            <button onClick={copyCaption} className="flex-1 bg-[#14f1d9] hover:bg-[#0ee7ce] text-[#020617] py-4 rounded-2xl font-extrabold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#14f1d9]/10">
                                                <Copy className="w-5 h-5" />
                                                Copy Caption
                                            </button>
                                            <button onClick={generateCaption} className={`px-6 py-4 rounded-2xl font-extrabold flex items-center gap-2 border transition-all hover:scale-[1.02] active:scale-95 ${isDarkMode ? "bg-slate-800/50 border-slate-700 text-white hover:border-slate-500" : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"}`}>
                                                <RefreshCw className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-24 text-center opacity-40">
                                        <Zap className="w-20 h-20 mb-6" />
                                        <p className="text-xl font-bold tracking-tight">Your caption will appear here</p>
                                        <p className="text-sm">Select an image to get started</p>
                                    </div>
                                )}
                            </div>

                            {captionHistory.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-slate-800/50">
                                    <button onClick={() => setShowHistory(!showHistory)} className="flex items-center justify-between w-full group">
                                        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm tracking-widest uppercase">
                                            <History className="w-4 h-4" />
                                            Recent History
                                        </div>
                                        <span className={`transition-transform duration-300 ${showHistory ? "rotate-180" : ""} text-[#14f1d9]`}>▼</span>
                                    </button>

                                    {showHistory && (
                                        <div className="mt-6 space-y-3 animate-fadeIn">
                                            {captionHistory.map(item => (
                                                <div key={item.id} onClick={() => setCaption(item.caption)} className={`p-4 rounded-2xl cursor-pointer transition-all hover:translate-x-2 border ${isDarkMode ? "bg-slate-800/30 border-slate-800 hover:border-slate-600" : "bg-slate-50 border-slate-100 hover:border-slate-300"
                                                    }`}>
                                                    <p className={`text-sm font-medium line-clamp-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{item.caption}</p>
                                                    <span className="text-[10px] font-black text-[#14f1d9] uppercase tracking-tighter opacity-70">{item.timestamp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default ImageCaptioner;

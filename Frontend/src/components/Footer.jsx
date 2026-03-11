import React from "react";
import { Github, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const T = {
    bg: "#fafafa", surface: "#f5f0eb", dark: "#1a1a1a",
    mid: "#4a4a4a", muted: "#9a9a9a", accent: "#c4956a",
    accentHover: "#b5845a", border: "#e8e0d5",
};

const Footer = () => {
    const navigate = useNavigate();

    const footerLinks = {
        Product: [
            { name: "Image Captioner", path: "/image-captioner" },
            { name: "Features", path: "/#features" },
            { name: "How it Works", path: "/#how" },
            { name: "Pricing", path: "/#pricing" },
        ],
        Company: [
            { name: "About Us", path: "#" },
            { name: "Careers", path: "#" },
            { name: "Blog", path: "#" },
            { name: "Contact", path: "#" },
        ],
        Legal: [
            { name: "Privacy Policy", path: "#" },
            { name: "Terms of Service", path: "#" },
            { name: "Cookie Policy", path: "#" },
        ],
    };

    const socials = [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/IshaCodes04" },
        { icon: <Twitter className="w-5 h-5" />, link: "https://x.com/isha_singh06" },
        { icon: <Instagram className="w-5 h-5" />, link: "#" },
        { icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/isha-singh-b00715300/" },
    ];

    return (
        <footer className="w-full pt-12 pb-10 border-t" style={{ background: "white", borderColor: T.border }}>
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-12 flex flex-col items-center text-center space-y-6">
                        <div className="cursor-pointer" onClick={() => navigate("/home")}>
                            <Logo size={32} />
                        </div>

                        <p className="text-sm font-medium leading-relaxed max-w-sm opacity-50" style={{ color: T.mid }}>
                            Premium AI vision engine for creators.
                        </p>

                        <div className="flex items-center gap-4">
                            {socials.map((social, i) => (
                                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:-translate-y-1"
                                    style={{ borderColor: T.border, color: T.muted }}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left" style={{ borderColor: T.border }}>
                    <p className="text-xs font-bold opacity-40" style={{ color: T.muted }}>
                        © 2026 SnapScript. Built by {T.dark} Isha Singh
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40" style={{ color: "#059669" }}>System: Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

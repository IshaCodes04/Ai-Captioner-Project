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
        <footer className="w-full pt-20 pb-10 border-t" style={{ background: "white", borderColor: T.border }}>
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="cursor-pointer" onClick={() => navigate("/home")}>
                            <Logo size={40} />
                        </div>

                        <p className="text-base font-medium leading-relaxed max-w-sm" style={{ color: T.mid }}>
                            The premium AI engine for creators. Turn visual stories into viral scripts with one click using Gemini Vision AI.
                        </p>

                        <div className="flex items-center gap-4">
                            {socials.map((social, i) => (
                                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:-translate-y-1"
                                    style={{ borderColor: T.border, color: T.muted }}
                                    onMouseEnter={e => { e.currentTarget.style.color = T.accent; e.currentTarget.style.borderColor = T.accent; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title} className="space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: T.dark }}>{title}</h4>
                                <ul className="space-y-4">
                                    {links.map((link, i) => (
                                        <li key={i}>
                                            <a href={link.path} className="text-[15px] font-medium transition-colors hover:translate-x-1 inline-block"
                                                style={{ color: T.mid }}
                                                onMouseEnter={e => e.currentTarget.style.color = T.accent}
                                                onMouseLeave={e => e.currentTarget.style.color = T.mid}>
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: T.dark }}>Stay Updated</h4>
                        <p className="text-sm font-medium" style={{ color: T.muted }}>Get the latest AI tips and updates directly to your inbox.</p>
                        <div className="relative">
                            <input type="email" placeholder="email@example.com"
                                className="w-full px-5 py-4 rounded-2xl border bg-transparent font-medium text-sm focus:outline-none transition-all"
                                style={{ borderColor: T.border, color: T.dark }}
                                onFocus={e => e.currentTarget.style.borderColor = T.accent}
                                onBlur={e => e.currentTarget.style.borderColor = T.border} />
                            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
                                style={{ background: T.dark }}>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-6">
                        <p className="text-sm font-bold" style={{ color: T.muted }}>
                            © 2026 SnapScript. Built by <span style={{ color: T.dark }}>Isha Singh</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#059669" }}>System Status: Operational</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold" style={{ color: T.muted }}>
                            <span>English (US)</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

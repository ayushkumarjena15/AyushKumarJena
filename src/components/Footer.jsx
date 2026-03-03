import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="text-3xl md:text-4xl font-black text-white tracking-[-0.04em] uppercase font-heading">
                            AYUSH
                        </Link>
                        <p className="text-secondary font-light leading-relaxed text-sm max-w-xs font-serif italic">
                            Building digital experiences that matter, one line of code at a time.
                            Crafting interfaces that feel alive, solving problems that make a difference,
                            and turning ideas into reality. Every pixel has a purpose. Every interaction tells a story.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-serif italic text-white">General</h4>
                            <ul className="space-y-3 text-secondary text-sm">
                                <li className="hover:text-accent1 transition-colors cursor-pointer">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Blogs</li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Guestbook</li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Uses</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-serif italic text-white">About</h4>
                            <ul className="space-y-3 text-secondary text-sm">
                                <li className="hover:text-accent1 transition-colors cursor-pointer">
                                    <Link to="/about">About Me</Link>
                                </li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">
                                    <Link to="/projects">Projects</Link>
                                </li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Contact</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-serif italic text-white">Startup</h4>
                            <ul className="space-y-3 text-secondary text-sm">
                                <li className="hover:text-accent1 transition-colors cursor-pointer">SkillTwin</li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">D-Liver</li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Agri-Novation</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-serif italic text-white">Legal</h4>
                            <ul className="space-y-3 text-secondary text-sm">
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Privacy Policy</li>
                                <li className="hover:text-accent1 transition-colors cursor-pointer">Terms & Conditions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                    <p className="text-xs text-secondary">
                        © {new Date().getFullYear()} Ayush Kumar Jena. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer">
                            <Github size={16} className="text-secondary hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={16} className="text-secondary hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="https://x.com/AyushJena1504" target="_blank" rel="noopener noreferrer">
                            <Twitter size={16} className="text-secondary hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <Send size={16} className="text-secondary hover:text-white transition-colors cursor-pointer" />
                        <a href="https://www.instagram.com/ig_ayush099/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={16} className="text-secondary hover:text-white transition-colors cursor-pointer" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

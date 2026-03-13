import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Command, Download, Link2, Monitor, Book } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'More', href: '#', hasDropdown: true },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const location = useLocation();
    const { scrollY } = useScroll();



    useMotionValueEvent(scrollY, "change", (latest) => {
        if (isMobileMenuOpen) return; // Don't hide navbar if mobile menu is open

        const previous = scrollY.getPrevious();

        // Always show at the top
        if (latest < 50) {
            setIsVisible(true);
            setIsScrolled(false);
            return;
        }

        setIsScrolled(true);

        // Smart Logic: Hide on scroll down, show on scroll up
        if (latest > previous) {
            // Only hide if we've scrolled a bit to avoid jitter
            if (latest > 150) setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    });

    // Detect when scrolling stops to show the nav (User interaction convenience)
    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            if (isMobileMenuOpen) return;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // Re-show nav after 1 second of no scrolling
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -120 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${
                isScrolled
                    ? 'pt-3 pb-3 md:pt-6 md:pb-4 bg-background/90 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none'
                    : 'pt-4 pb-3 md:pt-6 md:pb-4'
            }`}
        >
            <div className={`max-w-7xl mx-auto px-6 flex ${isScrolled ? 'md:justify-center justify-end' : 'justify-between'} items-center pointer-events-auto`}>
                {/* Logo + Tagline */}
                <AnimatePresence>
                    {!isScrolled && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <Link to="/" onClick={() => setIsMoreOpen(false)} className="z-10 flex items-center gap-3">
                                <span className="text-xl font-black text-white tracking-widest uppercase font-ethnocentric">AJ</span>
                                <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_4px_1px_rgba(74,222,128,0.6)] flex-shrink-0" />
                                    <div>
                                        <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">Creative Engineer</p>
                                        <p className="text-[9px] font-bold text-accent1 uppercase tracking-[0.2em]">Building the Future</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile-only: persistent AJ logo when scrolled */}
                {isScrolled && (
                    <Link
                        to="/"
                        onClick={() => setIsMoreOpen(false)}
                        className="md:hidden mr-auto text-xl font-black text-white tracking-widest uppercase font-ethnocentric"
                    >
                        AJ
                    </Link>
                )}

                {/* Floating Central Pill */}
                <div className={`hidden md:flex items-center gap-1 p-1.5 backdrop-blur-3xl border border-white/5 rounded-full shadow-2xl transition-all duration-500 ${isScrolled ? 'bg-background/80' : 'bg-background/40'}`}>
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group/navitem">
                            {link.hasDropdown ? (
                                <button
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 flex items-center gap-1 text-secondary hover:text-white ${isMoreOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    {link.name}
                                    <motion.svg
                                        animate={{ rotate: isMoreOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </motion.svg>
                                </button>
                            ) : (
                                <Link
                                    to={link.href}
                                    onClick={() => setIsMoreOpen(false)}
                                    className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 flex items-center gap-1 ${isActive(link.href)
                                        ? 'bg-white text-black'
                                        : 'text-secondary hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )}

                            {link.hasDropdown && (
                                <AnimatePresence>
                                    {isMoreOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 origin-top"
                                        >
                                            <div className="w-[420px] bg-[#0c0a09] border border-white/5 rounded-[2rem] p-2 flex gap-2 shadow-2xl">
                                                {/* Labs Card */}
                                                <Link onClick={() => setIsMoreOpen(false)} to="/labs" className="w-[180px] bg-[#5a4fcf] rounded-3xl p-5 relative overflow-hidden group/labs flex flex-col justify-end min-h-[220px]">
                                                    <div className="absolute top-0 right-[-10%] opacity-20 group-hover/labs:scale-110 group-hover/labs:opacity-40 group-hover/labs:-rotate-12 transition-all duration-500">
                                                        <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>
                                                    </div>
                                                    <div className="relative z-10">
                                                        <h3 className="text-xl font-bold text-white mb-2 font-heading tracking-tight">Labs</h3>
                                                        <p className="text-white/90 text-[11px] leading-relaxed">Experimental playground & fun micro-tools</p>
                                                    </div>
                                                </Link>

                                                {/* Right Links */}
                                                <div className="flex-1 flex flex-col gap-2 relative justify-center">
                                                    <Link onClick={() => setIsMoreOpen(false)} to="/links" className="flex items-center gap-4 p-3 rounded-[1.2rem] bg-[#151515] hover:bg-white/10 transition-colors group/link border border-transparent">
                                                        <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover/link:bg-black/60 transition-colors">
                                                            <Link2 size={16} className="text-white transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-white font-heading leading-none mb-1">Links</h4>
                                                            <p className="text-[11px] text-secondary leading-none">Socials & Profiles</p>
                                                        </div>
                                                    </Link>

                                                    <Link onClick={() => setIsMoreOpen(false)} to="/uses" className="flex items-center gap-4 p-3 rounded-[1.2rem] bg-[#151515] hover:bg-white/10 transition-colors group/link border border-transparent">
                                                        <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover/link:bg-black/60 transition-colors">
                                                            <Monitor size={16} className="text-white transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-white font-heading leading-none mb-1">Uses</h4>
                                                            <p className="text-[11px] text-secondary leading-none">My gear & software</p>
                                                        </div>
                                                    </Link>

                                                    <Link onClick={() => setIsMoreOpen(false)} to="/guestbook" className="flex items-center gap-4 p-3 rounded-[1.2rem] bg-[#151515] hover:bg-white/10 transition-colors group/link border border-transparent">
                                                        <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover/link:bg-black/60 transition-colors">
                                                            <Book size={16} className="text-white transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-white font-heading leading-none mb-1">Guestbook</h4>
                                                            <p className="text-[11px] text-secondary leading-none">Sign my wall</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() => { setIsMoreOpen(false); setShowResumeModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-accent1/10 rounded-full transition-all cursor-pointer group"
                    >
                        <Download size={12} className="text-accent1 group-hover:text-white transition-colors" />
                        <span className="text-[10px] font-black uppercase text-accent1 group-hover:text-white tracking-widest transition-colors">Resume</span>
                    </button>
                    <Link to="/book" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-all cursor-pointer group">
                        <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white transition-colors flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-white tracking-widest">Book a Call</span>
                    </Link>
                </div>

                {/* Right Controls */}
                <AnimatePresence>
                    {!isScrolled && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="hidden md:flex items-center gap-3"
                        >

                            <button
                                onClick={() => window.dispatchEvent(new Event('toggle-command-palette'))}
                                className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center text-secondary hover:text-white hover:border-white/30 transition-all"
                            >
                                <Command size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-10 p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

        </motion.nav>

            {/* Mobile Nav Overlay — rendered OUTSIDE motion.nav to avoid CSS transform stacking context bug
                (position:fixed inside a transformed parent positions relative to parent, not viewport) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 bg-background z-[45] flex flex-col items-center justify-center p-8 space-y-6 pointer-events-auto"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {navLinks.map((link) => (
                                <React.Fragment key={link.name}>
                                    {!link.hasDropdown ? (
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-3xl font-black uppercase tracking-widest ${isActive(link.href) ? 'text-accent1' : 'text-secondary'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col items-center space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-4 mb-2">— {link.name} —</p>
                                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/labs" className="text-2xl font-black uppercase tracking-widest text-secondary hover:text-accent1">Labs</Link>
                                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/links" className="text-2xl font-black uppercase tracking-widest text-secondary hover:text-accent1">Links</Link>
                                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/uses" className="text-2xl font-black uppercase tracking-widest text-secondary hover:text-accent1">Uses</Link>
                                            <Link onClick={() => setIsMobileMenuOpen(false)} to="/guestbook" className="text-2xl font-black uppercase tracking-widest text-secondary hover:text-accent1">Guestbook</Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-6 mt-8 border-t border-white/10 pt-8 w-full">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); setShowResumeModal(true); }}
                                    className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-accent1"
                                >
                                    <Download size={18} />
                                    Resume
                                </button>
                                <div className="w-px h-8 bg-white/10" />

                            </div>
                            <Link
                                to="/book"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-8 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-white/5"
                            >
                                Book a Call
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Resume Modal */}
            <AnimatePresence>
                {showResumeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                        onClick={() => setShowResumeModal(false)}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative bg-[#0c0a09] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowResumeModal(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-secondary hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="w-14 h-14 rounded-2xl bg-accent1/10 border border-accent1/20 flex items-center justify-center mb-5">
                                <Download size={22} className="text-accent1" />
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3">Resume Coming Soon</h3>
                            <p className="text-secondary text-sm leading-relaxed mb-6">
                                The resume is not available for download right now, but it will be provided soon. Stay tuned!
                                <br /><br />
                                In the meantime, feel free to reach out — I'd be happy to share it with you directly.
                            </p>

                            <div className="flex gap-3">
                                <Link
                                    to="/book"
                                    onClick={() => setShowResumeModal(false)}
                                    className="flex-1 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all hover:bg-white/90"
                                >
                                    Contact Me
                                </Link>
                                <button
                                    onClick={() => setShowResumeModal(false)}
                                    className="flex-1 py-3 border border-white/10 text-secondary rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-white/5 hover:text-white"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
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
    const location = useLocation();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setIsScrolled(latest > 20);
    });

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-6 pb-4 ${isScrolled ? 'bg-background/80 backdrop-blur-md' : ''}`}
        >
            <div className={`max-w-7xl mx-auto px-6 flex ${isScrolled ? 'justify-center' : 'justify-between'} items-center`}>
                {/* Logo + Tagline */}
                <AnimatePresence>
                    {!isScrolled && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <Link to="/" className="z-10 flex items-center gap-3">
                                <span className="text-xl font-black text-white tracking-widest uppercase font-ethnocentric">AJ</span>
                                <div className="hidden sm:block border-l border-white/10 pl-3">
                                    <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em]">Creative Engineer</p>
                                    <p className="text-[9px] font-bold text-accent1 uppercase tracking-[0.2em]">Building the Future</p>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Central Pill */}
                <div className={`hidden md:flex items-center gap-1 p-1.5 backdrop-blur-3xl border border-white/5 rounded-full shadow-2xl transition-all duration-500 ${isScrolled ? 'bg-background/80' : 'bg-background/40'}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 flex items-center gap-1 ${isActive(link.href)
                                ? 'bg-white text-black'
                                : 'text-secondary hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {link.name}
                            {link.hasDropdown && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                            )}
                        </Link>
                    ))}
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-all cursor-pointer group">
                        <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white transition-colors flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-white tracking-widest">Book a Call</span>
                    </div>
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
                            <button className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center text-secondary hover:text-white hover:border-white/30 transition-all">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            </button>
                            <button className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center text-secondary hover:text-white hover:border-white/30 transition-all">
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

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center p-8 space-y-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-3xl font-black uppercase tracking-widest ${isActive(link.href) ? 'text-accent1' : 'text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

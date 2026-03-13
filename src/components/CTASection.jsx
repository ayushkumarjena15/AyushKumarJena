import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

                {/* Left: Text Content - Perfectly Matching the Image */}
                <motion.div
                    className="flex-1 space-y-2 z-10"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-6">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-10" />
                            <img
                                src="/profile.jpg"
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 object-cover shadow-2xl"
                                alt="Ayush"
                            />
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white tracking-tighter leading-none">
                            Let's create
                        </h2>
                        <span className="sr-only">Contact Ayush Kumar Jena</span>
                    </div>
                    <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-[#555] tracking-tighter leading-none">
                        something real.
                    </p>

                    <div className="pt-6 md:pt-12">
                        <>
                        <style>{`
                            @keyframes gradientShift {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                            .animated-gradient {
                                background: linear-gradient(270deg, #ff4d4d, #f731db, #a855f7, #f731db, #ff4d4d);
                                background-size: 300% 300%;
                                animation: gradientShift 7s ease infinite;
                            }
                        `}</style>
                        <Link
                            to="/book"
                            className="relative group inline-flex items-center gap-3 text-white text-sm font-black uppercase tracking-[0.2em] px-8 py-4 rounded-full overflow-hidden active:scale-95 transition-all duration-300 border border-white/10"
                        >
                            <span className="absolute inset-0 bg-[#1a1a1a] group-hover:opacity-0 transition-opacity duration-500" />
                            <span className="animated-gradient absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative">Collaborate & Contribute</span>
                            <span className="relative text-base">→</span>
                        </Link>
                        </>
                    </div>
                </motion.div>

                {/* Right: Waving Robot */}
                <motion.div
                    className="relative flex-shrink-0 flex items-end justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg width="220" height="280" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Glow under feet */}
                        <ellipse cx="110" cy="268" rx="55" ry="8" fill="#c2a07a" opacity="0.15" />

                        {/* Legs */}
                        <rect x="82" y="210" width="22" height="48" rx="10" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        <rect x="116" y="210" width="22" height="48" rx="10" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        {/* Feet */}
                        <rect x="76" y="250" width="34" height="16" rx="8" fill="#c2a07a" opacity="0.8"/>
                        <rect x="110" y="250" width="34" height="16" rx="8" fill="#c2a07a" opacity="0.8"/>

                        {/* Body */}
                        <rect x="70" y="130" width="80" height="88" rx="18" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        {/* Chest panel */}
                        <rect x="84" y="148" width="52" height="36" rx="8" fill="#0c0a09" stroke="#c2a07a" strokeWidth="1" opacity="0.8"/>
                        {/* Chest lights */}
                        <circle cx="98" cy="162" r="5" fill="#c2a07a" opacity="0.9"/>
                        <circle cx="114" cy="162" r="5" fill="#c2a07a" opacity="0.5"/>
                        <circle cx="130" cy="162" r="5" fill="#c2a07a" opacity="0.3"/>
                        {/* Belly dot */}
                        <circle cx="110" cy="196" r="4" fill="#c2a07a" opacity="0.4"/>

                        {/* Left arm (static) */}
                        <rect x="42" y="136" width="28" height="16" rx="8" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        <rect x="34" y="148" width="16" height="40" rx="8" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        {/* Left hand */}
                        <circle cx="42" cy="194" r="9" fill="#c2a07a" opacity="0.7"/>

                        {/* Right arm (waving) — rotates from shoulder */}
                        <motion.g
                            style={{ transformOrigin: "148px 144px" }}
                            animate={{ rotate: [-10, -50, -10] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <rect x="150" y="136" width="28" height="16" rx="8" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                            <rect x="170" y="148" width="16" height="40" rx="8" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                            {/* Right hand */}
                            <circle cx="178" cy="194" r="9" fill="#c2a07a" opacity="0.7"/>
                        </motion.g>

                        {/* Neck */}
                        <rect x="100" y="118" width="20" height="16" rx="6" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>

                        {/* Head */}
                        <rect x="68" y="60" width="84" height="64" rx="20" fill="#1e1b18" stroke="#c2a07a" strokeWidth="1.5"/>
                        {/* Antenna */}
                        <line x1="110" y1="60" x2="110" y2="40" stroke="#c2a07a" strokeWidth="2" strokeLinecap="round"/>
                        <motion.circle
                            cx="110" cy="36" r="5" fill="#c2a07a"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        {/* Eyes */}
                        <motion.rect
                            x="82" y="80" width="22" height="14" rx="6" fill="#c2a07a"
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: "93px 87px" }}
                        />
                        <motion.rect
                            x="116" y="80" width="22" height="14" rx="6" fill="#c2a07a"
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: "127px 87px" }}
                        />
                        {/* Mouth */}
                        <path d="M90 108 Q110 118 130 108" stroke="#c2a07a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                    </svg>
                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;

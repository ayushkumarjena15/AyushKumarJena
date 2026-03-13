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
                    <svg width="300" height="460" viewBox="-20 -100 300 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="rg-head" cx="38%" cy="32%" r="65%">
                                <stop offset="0%" stopColor="#ffffff"/>
                                <stop offset="55%" stopColor="#e8e8e8"/>
                                <stop offset="100%" stopColor="#b8b8b8"/>
                            </radialGradient>
                            <radialGradient id="rg-body" cx="32%" cy="28%" r="72%">
                                <stop offset="0%" stopColor="#f8f8f8"/>
                                <stop offset="50%" stopColor="#d5d5d5"/>
                                <stop offset="100%" stopColor="#a5a5a5"/>
                            </radialGradient>
                            <radialGradient id="rg-joint" cx="38%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#e0e0e0"/>
                                <stop offset="100%" stopColor="#787878"/>
                            </radialGradient>
                            <linearGradient id="lg-limb" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#b8b8b8"/>
                                <stop offset="35%" stopColor="#f2f2f2"/>
                                <stop offset="100%" stopColor="#a8a8a8"/>
                            </linearGradient>
                            <linearGradient id="lg-visor" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#1e2030"/>
                                <stop offset="100%" stopColor="#0a0a15"/>
                            </linearGradient>
                            <filter id="f-drop" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#00000030"/>
                            </filter>
                            <filter id="f-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="blur"/>
                                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                        </defs>

                        {/* Thought bubble */}
                        <motion.g
                            animate={{ scale: [1, 1.04, 1], opacity: [0.95, 1, 0.95] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: '185px -55px' }}
                        >
                            {/* Cloud shape */}
                            <path d="
                                M 155 -20
                                Q 130 -20 128 -42
                                Q 118 -58 132 -70
                                Q 128 -92 146 -96
                                Q 155 -115 172 -107
                                Q 182 -122 200 -114
                                Q 215 -124 228 -110
                                Q 246 -108 244 -90
                                Q 258 -80 250 -62
                                Q 258 -44 244 -36
                                Q 242 -20 224 -22
                                Q 212 -12 196 -22
                                Q 182 -12 166 -22
                                Q 155 -12 155 -20 Z
                            " fill="white" stroke="#ddd" strokeWidth="1.5" opacity="0.95"/>
                            {/* "Hi there!" text */}
                            <text x="188" y="-62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0c0a09" fontFamily="sans-serif">Hi there!</text>
                            {/* Thought dots */}
                            <circle cx="152" cy="-8" r="5" fill="white" stroke="#ddd" strokeWidth="1.2"/>
                            <circle cx="144" cy="6" r="4" fill="white" stroke="#ddd" strokeWidth="1.2"/>
                            <circle cx="138" cy="18" r="3" fill="white" stroke="#ddd" strokeWidth="1.2"/>
                        </motion.g>

                        {/* Ground shadow */}
                        <ellipse cx="130" cy="352" rx="60" ry="8" fill="#00000025"/>

                        {/* Hip joints */}
                        <circle cx="105" cy="260" r="14" fill="url(#rg-joint)" filter="url(#f-drop)"/>
                        <circle cx="155" cy="260" r="14" fill="url(#rg-joint)" filter="url(#f-drop)"/>

                        {/* Left leg */}
                        <rect x="91" y="260" width="28" height="46" rx="13" fill="url(#lg-limb)" filter="url(#f-drop)"/>
                        <circle cx="105" cy="308" r="14" fill="url(#rg-joint)"/>
                        <rect x="91" y="304" width="28" height="36" rx="12" fill="url(#lg-limb)"/>
                        <ellipse cx="101" cy="342" rx="22" ry="11" fill="url(#rg-joint)" filter="url(#f-drop)"/>

                        {/* Right leg */}
                        <rect x="141" y="260" width="28" height="46" rx="13" fill="url(#lg-limb)" filter="url(#f-drop)"/>
                        <circle cx="155" cy="308" r="14" fill="url(#rg-joint)"/>
                        <rect x="141" y="304" width="28" height="36" rx="12" fill="url(#lg-limb)"/>
                        <ellipse cx="159" cy="342" rx="22" ry="11" fill="url(#rg-joint)" filter="url(#f-drop)"/>

                        {/* Body */}
                        <ellipse cx="130" cy="210" rx="55" ry="62" fill="url(#rg-body)" filter="url(#f-drop)"/>
                        <ellipse cx="130" cy="210" rx="36" ry="44" fill="none" stroke="#c8c8c8" strokeWidth="1.5" opacity="0.5"/>
                        <rect x="106" y="185" width="48" height="36" rx="10" fill="url(#lg-visor)" opacity="0.9"/>
                        <circle cx="122" cy="203" r="6" fill="#2563eb" filter="url(#f-glow)"/>
                        <circle cx="138" cy="203" r="6" fill="#60a5fa" opacity="0.8" filter="url(#f-glow)"/>
                        <ellipse cx="130" cy="258" rx="44" ry="9" fill="#c0c0c0" opacity="0.3"/>

                        {/* Shoulder joints */}
                        <circle cx="75" cy="184" r="18" fill="url(#rg-joint)" filter="url(#f-drop)"/>
                        <circle cx="185" cy="184" r="18" fill="url(#rg-joint)" filter="url(#f-drop)"/>

                        {/* Left arm (hanging) */}
                        <rect x="61" y="194" width="28" height="52" rx="13" fill="url(#lg-limb)" filter="url(#f-drop)"/>
                        <circle cx="75" cy="248" r="14" fill="url(#rg-joint)"/>
                        <rect x="61" y="244" width="28" height="42" rx="12" fill="url(#lg-limb)"/>
                        <ellipse cx="75" cy="292" rx="14" ry="12" fill="url(#rg-joint)"/>
                        <rect x="65" y="299" width="5" height="15" rx="3" fill="url(#lg-limb)"/>
                        <rect x="72" y="300" width="5" height="17" rx="3" fill="url(#lg-limb)"/>
                        <rect x="79" y="299" width="5" height="15" rx="3" fill="url(#lg-limb)"/>

                        {/* Right arm (straight down — same as left) */}
                        <rect x="171" y="194" width="28" height="52" rx="13" fill="url(#lg-limb)" filter="url(#f-drop)"/>
                        <circle cx="185" cy="248" r="14" fill="url(#rg-joint)"/>
                        <rect x="171" y="244" width="28" height="42" rx="12" fill="url(#lg-limb)"/>
                        <ellipse cx="185" cy="292" rx="14" ry="12" fill="url(#rg-joint)"/>
                        <rect x="175" y="299" width="5" height="15" rx="3" fill="url(#lg-limb)"/>
                        <rect x="182" y="300" width="5" height="17" rx="3" fill="url(#lg-limb)"/>
                        <rect x="189" y="299" width="5" height="15" rx="3" fill="url(#lg-limb)"/>

                        {/* Neck */}
                        <rect x="118" y="152" width="24" height="22" rx="8" fill="url(#lg-limb)" filter="url(#f-drop)"/>

                        {/* Head */}
                        <circle cx="130" cy="95" r="64" fill="url(#rg-head)" filter="url(#f-drop)"/>
                        <ellipse cx="108" cy="70" rx="28" ry="20" fill="white" opacity="0.25"/>

                        {/* Visor */}
                        <rect x="86" y="85" width="88" height="28" rx="9" fill="url(#lg-visor)"/>
                        {/* Left eye LED */}
                        <rect x="94" y="91" width="30" height="16" rx="5" fill="#1d4ed8"/>
                        <rect x="94" y="91" width="30" height="16" rx="5" fill="#3b82f6" opacity="0.7" filter="url(#f-glow)"/>
                        {/* Right eye LED */}
                        <rect x="136" y="91" width="30" height="16" rx="5" fill="#1d4ed8"/>
                        <rect x="136" y="91" width="30" height="16" rx="5" fill="#3b82f6" opacity="0.7" filter="url(#f-glow)"/>
                        <rect x="94" y="91" width="30" height="16" rx="5" fill="none" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5"/>
                        <rect x="136" y="91" width="30" height="16" rx="5" fill="none" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5"/>

                        {/* Smile */}
                        <path d="M108 124 Q130 136 152 124" stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
                    </svg>
                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;

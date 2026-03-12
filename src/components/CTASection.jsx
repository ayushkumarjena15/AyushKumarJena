import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    const orbRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!orbRef.current) return;
        const rect = orbRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
        setMousePos({ x, y });
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden" onMouseMove={handleMouseMove}>
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

                {/* Right: High-Fidelity Glowing Orb (Gemini Style) */}
                <motion.div
                    ref={orbRef}
                    className="relative flex-shrink-0"
                    animate={{
                        x: mousePos.x,
                        y: mousePos.y,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                >
                    {/* The Inner Glowing Core */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">

                        {/* Layered Glow Rings */}
                        <div className="absolute inset-0 rounded-full border-[2px] border-white/5" />

                        {/* Deep Outer Glow */}
                        <motion.div
                            className="absolute inset--10 rounded-full blur-[80px]"
                            style={{
                                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 60%, transparent 80%)'
                            }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* The Main High-Contrast Ring */}
                        <motion.div
                            className="relative w-full h-full rounded-full p-[3px] overflow-hidden"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent, #3b82f6, #9333ea, #3b82f6, transparent)',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Inner Mask to create the ring effect */}
                            <div className="absolute inset-[3px] rounded-full bg-background" />

                            {/* Accent Glow on the Ring itself */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20" />
                        </motion.div>

                        {/* Centered Pulsing Dot (The "Brain") */}
                        <div className="absolute flex items-center justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                style={{ boxShadow: '0 0 20px 2px rgba(255,255,255,0.8)' }}
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>

                        {/* Refractive Highlight */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;

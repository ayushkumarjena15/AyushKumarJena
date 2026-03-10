import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    SiNextdotjs, SiTypescript, SiSupabase, SiFramer, SiRadixui,
    SiTailwindcss, SiOpenai, SiPython, SiFastapi, SiFirebase,
    SiScikitlearn, SiTwilio, SiVercel
} from 'react-icons/si';

const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('next.js')) return <SiNextdotjs className="text-[#000000] dark:text-white" />;
    if (t.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
    if (t.includes('supabase')) return <SiSupabase className="text-[#3ECF8E]" />;
    if (t.includes('framer')) return <SiFramer className="text-[#0055FF]" />;
    if (t.includes('radix')) return <SiRadixui className="text-white" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
    if (t.includes('groq')) return <Sparkles size={10} className="text-orange-400" />;
    if (t.includes('python')) return <SiPython className="text-[#3776AB]" />;
    if (t.includes('fastapi')) return <SiFastapi className="text-[#05998B]" />;
    if (t.includes('firebase')) return <SiFirebase className="text-[#FFCA28]" />;
    if (t.includes('scikit')) return <SiScikitlearn className="text-[#F7931E]" />;
    if (t.includes('twilio')) return <SiTwilio className="text-[#F22F46]" />;
    if (t.includes('ollama')) return <Sparkles size={10} className="text-purple-400" />;
    if (t.includes('three.js')) return <span className="text-[8px] font-bold">3D</span>;
    if (t.includes('tesseract')) return <span className="text-[8px] font-bold">OCR</span>;
    if (t.includes('pubmed')) return <span className="text-[8px] font-bold">MED</span>;
    return <span className="w-1 h-1 rounded-full bg-current" />;
};

const ventures = [
    {
        name: 'SkillTwin',
        emoji: '🚀',
        description: 'An AI-first career intelligence platform that creates a "Digital Skill Twin" by analyzing resumes and GitHub profiles, detecting skill gaps, and generating personalized learning roadmaps using state-of-the-art LLMs.',
        techStack: ['Next.js 15', 'TypeScript', 'Groq (Llama-3)', 'Supabase', 'Framer Motion', 'Radix UI'],
        images: [
            '/skilltwin/hero.png',
            '/skilltwin/features.png',
            '/skilltwin/roadmap.png',
            '/skilltwin/problem.png',
            '/skilltwin/sdg.png'
        ],
        color: 'from-orange-600 to-red-800',
    },
    {
        name: 'D-Liver',
        emoji: '🩺',
        description: 'An AI-Powered Medical Report Intelligence System designed to bridge the gap between complex clinical data and patient understanding. It transforms raw medical documents into structured, actionable health insights.',
        techStack: ['Next.js 15', 'Ollama', 'Supabase', 'Three.js', 'Tesseract.js', 'PubMed API'],
        images: [
            '/d-liver/hero.png',
            '/d-liver/dashboard.png',
            '/d-liver/features.png',
            '/d-liver/howitworks.png',
            '/d-liver/login.png'
        ],
        color: 'from-blue-600 to-indigo-800',
    },
    {
        name: 'Agri-Novation',
        emoji: '🌿',
        description: 'A comprehensive agricultural technology platform bridging the gap between traditional farming and modern data science. It leverages IoT, machine learning, and generative AI to provide farmers with actionable insights.',
        techStack: ['Python', 'FastAPI', 'Firebase', 'Groq API', 'Scikit-learn', 'Twilio API'],
        images: [
            '/agri-sahayak/hero.png',
            '/agri-sahayak/dashboard.png',
            '/agri-sahayak/features.png',
            '/agri-sahayak/technology.png'
        ],
        color: 'from-green-600 to-emerald-800',
    }
];

const ProjectImageCarousel = ({ images, name, emoji }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Rotate every 3 seconds for a more dynamic feel
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20">
            {/* Background Layer (Previous Image) to prevent flicker */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000"
                style={{ backgroundImage: `url(${images[(currentIndex - 1 + images.length) % images.length]})` }}
            />

            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${name} preview ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.fallback');
                        if (fallback) fallback.style.display = 'flex';
                    }}
                />
            </AnimatePresence>

            {/* Fallback for missing images */}
            <div className="fallback hidden absolute inset-0 w-full h-full bg-black/30 backdrop-blur-sm items-center justify-center">
                <span className="text-6xl">{emoji}</span>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

const VentureShowcase = () => {
    const listRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const avatarOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

    // Same color mapping as Projects page
    const lineColor = useTransform(
        scrollYProgress,
        [0.1, 0.45, 0.8],
        ["#f97316", "#8b5cf6", "#10b981"] // SkillTwin (Orange) -> D-Liver (Violet) -> Agri-Novation (Green)
    );

    const avatarBorderColor = useTransform(
        scrollYProgress,
        [0.1, 0.45, 0.8],
        ["#f97316", "#8b5cf6", "#10b981"]
    );

    const avatarGlow = useTransform(
        scrollYProgress,
        [0.1, 0.45, 0.8],
        ["rgba(249, 115, 22, 0.4)", "rgba(139, 92, 246, 0.4)", "rgba(16, 185, 129, 0.4)"]
    );
    const avatarBoxShadow = useTransform(avatarGlow, (glow) => `0 0 20px ${glow}`);
    const [containerHeight, setContainerHeight] = useState(0);
    useEffect(() => {
        if (!listRef.current) return;
        const ro = new ResizeObserver(e => setContainerHeight(e[0].contentRect.height));
        ro.observe(listRef.current);
        setContainerHeight(listRef.current.offsetHeight);
        return () => ro.disconnect();
    }, []);
    const avatarY = useTransform(scaleY, [0, 1], [0, containerHeight - 32]);

    return (
        <section className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
                className="text-center mb-10 md:mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent1 font-bold mb-4">
                    Crafting Modern Experiences
                </p>
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight">
                    Venture{' '}
                    <span className="bg-clip-text text-transparent font-serif italic animated-gradient-text">
                        Showcase
                    </span>
                </h2>
            </motion.div>

            {/* Venture Cards */}
            <div className="relative pb-24" ref={listRef}>
                {/* Scroll Indicator System (Desktop Only) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05] z-0">
                    <motion.div
                        className="absolute top-0 left-0 w-full origin-top"
                        style={{
                            height: '100%',
                            scaleY,
                            backgroundColor: lineColor
                        }}
                    />

                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                        style={{ y: avatarY }}
                    >
                        <motion.div
                            className="w-8 h-8 rounded-full border-2 bg-background shadow-2xl overflow-hidden flex items-center justify-center"
                            style={{
                                opacity: avatarOpacity,
                                borderColor: avatarBorderColor,
                                boxShadow: avatarBoxShadow
                            }}
                        >
                            <img src="/profile.jpeg" className="w-full h-full object-cover" alt="Ayush" />
                        </motion.div>
                    </motion.div>
                </div>

            <div className="space-y-16 md:space-y-32">
                {ventures.map((venture, idx) => (
                    <motion.div
                        key={venture.name}
                        className="relative"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        {/* Venture Name + Red dash */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-8 h-0.5 bg-red-500" />
                            <h3 className="text-3xl md:text-4xl font-heading font-black text-white">
                                {venture.name}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                            {/* Left - Info */}
                            <div className="space-y-6">
                                <p className="text-primary text-base md:text-lg leading-relaxed font-light">
                                    {venture.emoji} {venture.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {venture.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-2 hover:border-accent1/30 hover:text-accent1 transition-all"
                                        >
                                            {getTechIcon(tech)}
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Know More Button */}
                                <div className="pt-8">
                                    <Link
                                        to="/projects"
                                        className="group/btn relative px-8 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-full overflow-hidden flex items-center gap-3 transition-all hover:scale-105 active:scale-95 inline-flex"
                                    >
                                        <span className="relative z-10 transition-colors group-hover/btn:text-white">Know More</span>
                                        <ArrowUpRight size={14} className="relative z-10 group-hover/btn:rotate-45 group-hover/btn:text-white transition-all" />
                                        <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right - Mockup Carousel */}
                            <div className={`rounded-3xl bg-gradient-to-br ${venture.color} p-1 md:p-1.5 overflow-hidden relative group cursor-pointer shadow-2xl border border-white/5 h-full aspect-video md:aspect-auto`}>
                                <div className="relative z-10 h-full rounded-2xl overflow-hidden">
                                    <ProjectImageCarousel
                                        images={venture.images}
                                        name={venture.name}
                                        emoji={venture.emoji}
                                    />
                                </div>
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            </div>
        </section>
    );
};

export default VentureShowcase;

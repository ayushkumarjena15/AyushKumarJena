import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import ScrollIndicator from '../components/ScrollIndicator';
import GitHubActivity from '../components/GitHubActivity';
import {
    SiNextdotjs, SiTypescript, SiSupabase, SiFramer, SiRadixui,
    SiTailwindcss, SiOpenai, SiPython, SiFastapi, SiFirebase,
    SiScikitlearn, SiTwilio, SiVercel
} from 'react-icons/si';

const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('next.js')) return <SiNextdotjs className="w-3 h-3 text-[#000000] dark:text-white" />;
    if (t.includes('typescript')) return <SiTypescript className="w-3 h-3 text-[#3178C6]" />;
    if (t.includes('supabase')) return <SiSupabase className="w-3 h-3 text-[#3ECF8E]" />;
    if (t.includes('framer')) return <SiFramer className="w-3 h-3 text-[#0055FF]" />;
    if (t.includes('radix')) return <SiRadixui className="w-3 h-3 text-white" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="w-3 h-3 text-[#06B6D4]" />;
    if (t.includes('groq')) return <Sparkles size={12} className="text-orange-400" />;
    if (t.includes('python')) return <SiPython className="w-3 h-3 text-[#3776AB]" />;
    if (t.includes('fastapi')) return <SiFastapi className="w-3 h-3 text-[#05998B]" />;
    if (t.includes('firebase')) return <SiFirebase className="w-3 h-3 text-[#FFCA28]" />;
    if (t.includes('scikit')) return <SiScikitlearn className="w-3 h-3 text-[#F7931E]" />;
    if (t.includes('twilio')) return <SiTwilio className="w-3 h-3 text-[#F22F46]" />;
    if (t.includes('ollama')) return <Sparkles size={12} className="text-purple-400" />;
    if (t.includes('three.js')) return <span className="text-[9px] font-bold">3D</span>;
    if (t.includes('tesseract')) return <span className="text-[9px] font-bold">OCR</span>;
    if (t.includes('pubmed')) return <span className="text-[9px] font-bold">MED</span>;
    return <span className="w-1.5 h-1.5 rounded-full bg-current" />;
};

const ProjectImageCarousel = ({ images, name, emoji, onImageClick }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div
            className="relative w-full h-full cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); onImageClick(images[index]); }}
        >
            <AnimatePresence>
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`${name} screenshot ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden w-full h-full bg-black/40 backdrop-blur-sm items-center justify-center text-8xl">
                    {emoji}
                </div>
            </AnimatePresence>

            {/* Pagination Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === i ? 'bg-white w-4' : 'bg-white/30'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const projects = [
    {
        name: 'SkillTwin',
        emoji: '🚀',
        type: 'AI Career Intelligence',
        description: 'A high-performance, AI-driven career intelligence platform designed to bridge the gap between academic education and industry requirements. It creates a "Digital Skill Twin" of the user to identify weaknesses and provide a hyper-personalized path to employability.',
        color: 'from-orange-600 to-red-800',
        images: [
            '/skilltwin/hero.webp',
            '/skilltwin/features.webp',
            '/skilltwin/roadmap.webp',
            '/skilltwin/problem.webp',
            '/skilltwin/sdg.webp'
        ],
        overview: {
            problem: 'The "Employability Gap" caused by stagnant curriculums lagging 2-5 years behind industry trends and skill fragmentation where students lack structured paths.',
            techSpec: [
                { category: 'Frontend', tech: 'Next.js 16 (App Router)', purpose: 'SEO and performance' },
                { category: 'AI (LLMs)', tech: 'Groq (Llama-3 70B)', purpose: 'Fast roadmap generation' },
                { category: 'AI (Vision)', tech: 'Google Gemini', purpose: 'Resume deep analysis' },
                { category: 'Realtime', tech: 'Supabase Realtime', purpose: 'Live social proof' }
            ],
            keyFeatures: [
                { title: 'AI Skill Gap Analysis', desc: 'Uses Gemini to normalize resume skills and match against target JDs.' },
                { title: '🐙 GitHub Intelligence', desc: 'Validates skills by analyzing actual code evidence from user profiles.' },
                { title: 'Personalized Roadmaps', desc: 'Groq-powered week-by-week learning plans tailored to levels.' }
            ],
            workflow: 'Auth → Profiling (Skill Twin) → Targeting → Gap Detection → AI Roadmapping → Job Matching.',
            future: 'Automated Mock Interviews (AI Voice) & Skill Certification (Blockchain).'
        },
        techStack: ['Next.js 15', 'TypeScript', 'Groq API', 'Supabase', 'Framer Motion', 'Radix UI']
    },
    {
        name: 'D-Liver',
        emoji: '🩺',
        type: 'Medical Report Intelligence',
        description: 'An AI-Powered Medical Report Intelligence System designed to bridge the gap between complex clinical data and patient understanding. It transforms raw medical documents into structured, actionable health insights.',
        color: 'from-blue-600 to-indigo-800',
        images: [
            '/d-liver/hero.webp',
            '/d-liver/dashboard.webp',
            '/d-liver/features.webp',
            '/d-liver/howitworks.webp',
            '/d-liver/login.webp'
        ],
        overview: {
            problem: 'The Medical Literacy Gap and anxiety caused by patients Googling complex lab terms they don\'t understand.',
            techSpec: [
                { category: 'AI Engine', tech: 'Gemini + Ollama', purpose: 'Dual-path AI processing' },
                { category: 'OCR', tech: 'Tesseract.js', purpose: 'Extracting medical image text' },
                { category: '3D Graphics', tech: 'Three.js / R3F', purpose: 'Interactive health visuals' },
                { category: 'RAG', tech: 'PubMed API', purpose: 'Fetching clinical citations' }
            ],
            keyFeatures: [
                { title: 'Multi-Lens Explanations', desc: '4 levels of detail: Patient, Balanced, Advanced, and Doctor.' },
                { title: 'Medical Validation Firewall', desc: 'Layer that rejects non-medical files and cross-references data.' },
                { title: 'Retrieval-Augmented Gen', desc: 'Automatically fetches live citations from trusted databases.' }
            ],
            workflow: 'Ingestion → Analysis Gateway → Entity Extraction → RAG Enrichment → 3D Presentation.',
            future: 'Doctor Verification Portal & Local AI Privacy (Ollama integration).'
        },
        techStack: ['Next.js 15', 'Ollama', 'Supabase', 'Three.js', 'Tesseract.js', 'PubMed API']
    },
    {
        name: 'Agri-Novation',
        emoji: '🌿',
        type: 'Industrial Agri-Tech',
        description: 'A comprehensive agricultural technology platform bridging the gap between traditional farming and modern data science. It leverages IoT, machine learning, and generative AI to provide farmers with actionable insights.',
        color: 'from-green-600 to-emerald-800',
        images: [
            '/agri-sahayak/hero.webp',
            '/agri-sahayak/dashboard.webp',
            '/agri-sahayak/features.webp',
            '/agri-sahayak/technology.webp'
        ],
        overview: {
            problem: 'Eliminating guesswork in irrigation/fertilization and predicting pest/disease outbreaks before they happen.',
            techSpec: [
                { category: 'Backend', tech: 'FastAPI (Python)', purpose: 'Asynchronous model inference' },
                { category: 'Database', tech: 'Firebase Realtime', purpose: 'Live IoT sensor sync' },
                { category: 'Predictive ML', tech: 'Scikit-learn', purpose: 'Disease & Pest forecasting' },
                { category: 'Alerts', tech: 'Twilio API', purpose: 'Smart SMS notifications' }
            ],
            keyFeatures: [
                { title: 'AI Prediction Suite', desc: 'Irrigation, Disease, and Pest forecasting based on IoT data.' },
                { title: 'Smart Fertilizer Rec', desc: 'pH-based conditional logic for specific crop matching.' },
                { title: 'Agri-Assistant', desc: 'Groq-powered chatbot for specialized farming knowledge.' }
            ],
            workflow: 'IoT Ingestion → Firebase Sync → FastAPI Processing → Actionable Recommendation → SMS Alerts.',
            future: 'Direct multilingual translation for regional support and Glassmorphism dashboard optimization.'
        },
        techStack: ['Python', 'FastAPI', 'Firebase', 'Groq API', 'Scikit-learn', 'Twilio API']
    }
];

const ProjectsPage = () => {
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const closeLightbox = useCallback(() => setLightboxSrc(null), []);

    useEffect(() => {
        if (!lightboxSrc) return;
        const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxSrc, closeLightbox]);

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

    const avatarOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    // Dynamic color mapping based on scroll progress
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
    const avatarBoxShadow = useTransform(avatarGlow, (glow) => `0 0 30px ${glow}`);
    const [containerHeight, setContainerHeight] = useState(0);
    useEffect(() => {
        if (!listRef.current) return;
        const ro = new ResizeObserver(e => setContainerHeight(e[0].contentRect.height));
        ro.observe(listRef.current);
        setContainerHeight(listRef.current.offsetHeight);
        return () => ro.disconnect();
    }, []);
    const avatarY = useTransform(scaleY, [0, 1], [0, containerHeight - 56]);

    const title = "MY WORKS";
    const letterVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.2 + i * 0.05,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    return (
        <>
        {/* Lightbox */}
        <AnimatePresence>
            {lightboxSrc && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={closeLightbox}
                >
                    <motion.img
                        src={lightboxSrc}
                        alt="Project screenshot"
                        className="max-w-[92vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain"
                        initial={{ scale: 0.88, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.88, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background text-white bg-grain pb-40"
        >
            <h1 className="sr-only">Projects by Ayush Kumar Jena - Full Stack & AI Engineering Portfolio</h1>
            {/* Hero Section */}
            <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="text-center z-10 w-full px-4">
                    <motion.h1
                        className="text-[13vw] sm:text-[15vw] md:text-[16vw] font-black leading-none tracking-[-0.04em] uppercase mb-8 text-white w-full flex justify-center overflow-hidden items-end"
                    >
                        {title.split('').map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block"
                                style={{ transformOrigin: 'bottom center', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <div className="flex flex-col items-center gap-3 md:gap-4 mt-2">
                        <motion.p
                            className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.8em] pl-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            CRAFTING DIGITAL EXPERIENCES
                        </motion.p>
                        <motion.h2
                            className="text-4xl md:text-7xl lg:text-8xl font-serif italic text-white font-light normal-case tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            with passion & code.
                        </motion.h2>
                    </div>
                </div>

                <ScrollIndicator text="Explore the works" />
            </section>

            {/* List Section with Integrated Scroll Indicator */}
            <section className="px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative mt-20" ref={listRef}>

                {/* Scroll Indicator System (Desktop Only) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] z-0" style={{ willChange: 'transform' }}>
                    <motion.div
                        className="absolute top-0 left-0 w-full origin-top rounded-full"
                        style={{
                            height: '100%',
                            scaleY,
                            backgroundColor: lineColor
                        }}
                    />

                    <motion.div
                        className="absolute top-0 left-0 flex flex-col items-center"
                        style={{ y: avatarY, x: '-50%' }}
                    >
                        <motion.div
                            className="w-14 h-14 rounded-full border-[3px] bg-[#1a1a1a] shadow-2xl overflow-hidden flex items-center justify-center"
                            style={{
                                opacity: avatarOpacity,
                                borderColor: avatarBorderColor,
                                boxShadow: avatarBoxShadow
                            }}
                        >
                            <img src="/profile.webp" className="w-full h-full object-cover" alt="Ayush" />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-16 md:space-y-32 relative z-10">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.name}
                            className="relative grid grid-cols-1 lg:grid-cols-[1fr_100px_1fr] gap-12 lg:gap-0 items-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Left Content (or Right on alternate) */}
                            <div className={`space-y-10 ${idx % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20 order-2 lg:order-3'}`}>
                                <motion.div
                                    className="flex items-center gap-6"
                                    initial={{ x: idx % 2 === 0 ? -40 : 40, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent1">{project.type}</p>
                                        <h3 className="text-3xl md:text-7xl font-heading font-black text-white tracking-tighter italic uppercase">
                                            {project.name}
                                        </h3>
                                    </div>
                                    <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                                </motion.div>

                                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
                                    {project.description}
                                </p>

                                {/* Detailed Sections */}
                                <div className="space-y-8 py-8 border-y border-white/[0.03]">
                                    <div>
                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                            The Core Problem
                                        </h4>
                                        <p className="text-white/80 font-bold leading-relaxed">{project.overview.problem}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                Key Features
                                            </h4>
                                            <ul className="space-y-3">
                                                {project.overview.keyFeatures.map((feature, i) => (
                                                    <li key={i} className="text-sm">
                                                        <span className="text-white font-bold">{feature.title}: </span>
                                                        <span className="text-white/60">{feature.desc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                Strategic Workflow
                                            </h4>
                                            <p className="text-sm text-white/60 leading-relaxed italic">{project.overview.workflow}</p>
                                        </div>
                                    </div>

                                    {/* Tech Specs Panel */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent1" />
                                            Technical DNA
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                                            {project.overview.techSpec.map((spec, i) => (
                                                <div key={i} className="space-y-1">
                                                    <p className="text-[9px] text-accent1/60 font-black uppercase tracking-tighter flex items-center gap-1.5">
                                                        {getTechIcon(spec.tech)}
                                                        {spec.category}
                                                    </p>
                                                    <p className="text-xs text-white font-bold">{spec.tech}</p>
                                                    <p className="text-[10px] text-white/30 italic">{spec.purpose}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-8 border-t border-white/[0.03]">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all cursor-default flex items-center gap-2"
                                        >
                                            {getTechIcon(tech)}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Middle Placeholder */}
                            <div className="hidden lg:block order-2" />

                            {/* Image Component - Now with Carousel */}
                            <motion.div
                                className={`rounded-[3rem] bg-gradient-to-br ${project.color} p-5 md:p-12 aspect-video flex flex-col justify-center relative group overflow-hidden shadow-2xl ${idx % 2 === 0 ? 'order-2 lg:order-3' : 'order-2 lg:order-1'}`}
                                initial={{ scale: 0.9, opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            >
                                <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_48px_80px_-16px_rgba(0,0,0,0.8)] border border-white/10 group-hover:scale-[1.02] transition-transform duration-1000 w-full h-full">
                                    <ProjectImageCarousel images={project.images} name={project.name} emoji={project.emoji} onImageClick={setLightboxSrc} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 md:mt-60 text-center flex justify-center pb-20 relative z-20">
                    <a
                        href="https://github.com/ayushkumarjena15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-6 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 hover:scale-110 active:scale-95 flex items-center gap-4"
                    >
                        For more projects, visit GitHub <ArrowUpRight size={18} />
                    </a>
                </div>
            </section>

            <div className="pt-20">
                <GitHubActivity />
            </div>
        </motion.main>
        </>
    );
};

export default ProjectsPage;

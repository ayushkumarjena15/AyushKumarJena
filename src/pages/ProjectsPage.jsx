import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';
import GitHubActivity from '../components/GitHubActivity';

const ProjectImageCarousel = ({ images, name, emoji }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`${name} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
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
        description: 'An AI-first career intelligence platform that creates a "Digital Skill Twin" by analyzing resumes and GitHub profiles, detecting skill gaps, and generating personalized learning roadmaps using state-of-the-art LLMs.',
        features: [
            'AI-powered resume analysis with intelligent skill extraction',
            'GitHub profile deep scanning for real competency mapping',
            'Personalized learning roadmap generation with LLM orchestration',
        ],
        techStack: ['React', 'Next.js', 'TypeScript', 'Groq API', 'Supabase', 'Tailwind CSS', 'GSAP', 'Vercel'],
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
        emoji: '🏥',
        description: 'An intelligent healthcare platform that democratizes medical report comprehension. Patients upload documents and receive simplified AI explanations, while doctors get clinical views with confidence scoring and RAG-backed citations.',
        features: [
            'Medical report AI analysis with confidence scoring',
            'RAG pipeline for citation-backed explanations',
            'Dual interface: patient-friendly & clinical views',
        ],
        techStack: ['React', 'Ollama', 'Supabase', 'PubMed API', 'Tailwind CSS', 'Node.js', 'Express', 'Vercel'],
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
        emoji: '🌾',
        description: 'A full-stack agricultural intelligence dashboard integrating real-time IoT sensor data, 6 concurrent ML models, and LLMs to provide proactive alerts, crop predictions, and actionable agronomic advice.',
        features: [
            'Real-time IoT sensor data integration & monitoring',
            '6 concurrent ML models for crop prediction',
            'Multilingual LLM-powered agronomic advisory system',
        ],
        techStack: ['FastAPI', 'Scikit-Learn', 'Firebase', 'Groq API', 'React', 'Python', 'TensorFlow', 'Vercel'],
        images: [
            '/agri-sahayak/hero.png',
            '/agri-sahayak/dashboard.png',
            '/agri-sahayak/features.png',
            '/agri-sahayak/technology.png'
        ],
        color: 'from-green-600 to-emerald-800',
    },
];

const ProjectsPage = () => {
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

    const title = "MY WORKS";
    const letterVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -90 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: 0.3 + i * 0.08,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background text-white bg-grain pb-40"
        >
            {/* Hero Section */}
            <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="text-center z-10 w-full px-4">
                    <motion.h1
                        className="text-[18vw] md:text-[16vw] font-black leading-none tracking-[-0.04em] uppercase mb-8 text-white w-full flex justify-center overflow-hidden items-end"
                        style={{ perspective: '1000px' }}
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
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] z-0">
                    <motion.div
                        className="absolute top-0 left-0 w-full origin-top rounded-full"
                        style={{
                            height: '100%',
                            scaleY,
                            backgroundColor: lineColor
                        }}
                    />

                    <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <motion.div
                            className="w-14 h-14 rounded-full border-[3px] bg-[#1a1a1a] shadow-2xl overflow-hidden flex items-center justify-center -translate-y-1"
                            style={{
                                opacity: avatarOpacity,
                                borderColor: avatarBorderColor,
                                boxShadow: useTransform(avatarGlow, (glow) => `0 0 30px ${glow}`)
                            }}
                        >
                            <img src="/profile.jpeg" className="w-full h-full object-cover" alt="Ayush" />
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-80 relative z-10">
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
                                    <h3 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter italic uppercase">
                                        {project.name}
                                    </h3>
                                    <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                                </motion.div>

                                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
                                    {project.emoji} {project.description}
                                </p>

                                <ul className="space-y-5">
                                    {project.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start gap-4 group"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            <span className="text-[#ffcc33] mt-1 shrink-0 text-lg group-hover:scale-125 transition-transform duration-500">✦</span>
                                            <span className="text-white/80 text-[17px] leading-relaxed font-bold tracking-tight">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-3 pt-8 border-t border-white/[0.03]">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all cursor-default"
                                        >
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
                                    <ProjectImageCarousel images={project.images} name={project.name} emoji={project.emoji} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[4px] bg-black/40">
                                    <a href="#" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-[1.5rem] flex items-center gap-3 hover:bg-gray-100 transition-all shadow-2xl active:scale-95 translate-y-4 group-hover:translate-y-0 duration-700">
                                        Launch Project <ArrowUpRight size={20} />
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-60 text-center flex justify-center pb-20 relative z-20">
                    <Link
                        to="/contact"
                        className="px-12 py-6 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 hover:scale-110 active:scale-95 flex items-center gap-4"
                    >
                        View older archives <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>

            <div className="pt-20">
                <GitHubActivity />
            </div>
        </motion.main>
    );
};

export default ProjectsPage;

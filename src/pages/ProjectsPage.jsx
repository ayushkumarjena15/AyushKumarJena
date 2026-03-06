import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';
import GitHubActivity from '../components/GitHubActivity';

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
        image: '/skilltwin/hero.png',
        color: 'from-red-600 to-red-800',
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
        image: '/d-liver/hero.png',
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
        image: '/agri-sahayak/hero.png',
        color: 'from-green-600 to-emerald-800',
    },
];

const ProjectsPage = () => {
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

    const title = "MY WORKS";

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-background text-white selection:bg-accent1/30 bg-grain pb-32"
        >
            {/* Hero Section */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                {/* Glow effect matching the image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="text-center z-10 w-full px-4">
                    <motion.h1
                        className="text-[18vw] md:text-[16vw] font-black leading-none tracking-[-0.02em] uppercase mb-8 text-white w-full flex justify-center overflow-hidden items-end"
                        style={{ perspective: '600px' }}
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
                            className="text-secondary text-[11px] md:text-sm font-bold uppercase tracking-[0.5em] opacity-90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            CRAFTING DIGITAL EXPERIENCES
                        </motion.p>
                        <motion.h2
                            className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white font-light normal-case tracking-tight drop-shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            with passion & code.
                        </motion.h2>
                    </div>
                </div>

                <ScrollIndicator text="Scroll down to see more" />
            </section>

            {/* List Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative pt-10">
                <div className="space-y-40">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.name}
                            className="relative grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr] gap-8 lg:gap-12 items-center"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Left - Info */}
                            <div className="space-y-8 order-2 lg:order-1">
                                {/* Title with red line */}
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-1 bg-red-600" />
                                    <h3 className="text-3xl md:text-5xl font-heading font-black text-white">
                                        {project.name}
                                    </h3>
                                </div>

                                <p className="text-primary text-base md:text-lg leading-relaxed font-light">
                                    {project.emoji} {project.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-4">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            {/* Red Four-Pointed Star Bullet */}
                                            <span className="text-[#ff4f4f] mt-1 shrink-0 text-sm">✦</span>
                                            <span className="text-white text-[15px] leading-relaxed font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-surface/80 border border-white/10 rounded-full text-xs font-bold text-gray-300 flex items-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ffb703]" />
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Middle - Vertical Scroll Tracker Line (Hidden on small screens) */}
                            <div className="hidden lg:flex flex-col items-center justify-center relative h-full order-2">
                                <div className="w-[1px] h-full bg-white/10 absolute top-0 bottom-0" />
                                <div className="w-8 h-8 rounded-full bg-[#1c1917] border-[3px] border-[#c2a07a] z-10 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-[url('/profile.jpeg')] bg-cover bg-center opacity-80" />
                                </div>
                                {/* Highlight connecting line fragment - visually indicates progress */}
                                <div className="w-[3px] rounded-full h-32 bg-gradient-to-b from-[#c2a07a] to-transparent absolute top-1/2 -translate-y-1/2" />
                            </div>

                            {/* Right - Mockups Block */}
                            <div className={`order-1 lg:order-3 rounded-3xl bg-gradient-to-br ${project.color} p-4 md:p-8 h-full flex flex-col justify-center relative group`}>
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 w-full aspect-[4/3]">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover object-left-top"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full bg-black/40 backdrop-blur-sm items-center justify-center text-6xl">
                                        {project.emoji}
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-3xl" />

                                {/* Hover "See live" floating button effect */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/40 rounded-3xl">
                                    <a href="#" className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                                        View Project <ArrowUpRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center flex justify-center pb-20">
                    <button className="text-sm font-bold text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
                        See more projects <ArrowUpRight size={16} />
                    </button>
                </div>
            </section>

            <GitHubActivity />
        </motion.main>
    );
};

export default ProjectsPage;

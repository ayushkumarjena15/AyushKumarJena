import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    SiNextdotjs, SiTypescript, SiSupabase, SiFramer, SiRadixui,
    SiTailwindcss, SiOpenai, SiPython, SiFastapi, SiFirebase,
    SiScikitlearn, SiTwilio, SiVercel, SiReact
} from 'react-icons/si';

const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('next.js')) return <SiNextdotjs className="w-3 h-3 text-[#000000] dark:text-white" />;
    if (t.includes('react')) return <SiReact className="w-3 h-3 text-[#61DAFB]" />;
    if (t.includes('typescript')) return <SiTypescript className="w-3 h-3 text-[#3178C6]" />;
    if (t.includes('supabase')) return <SiSupabase className="w-3 h-3 text-[#3ECF8E]" />;
    if (t.includes('framer')) return <SiFramer className="w-3 h-3 text-[#0055FF]" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="w-3 h-3 text-[#06B6D4]" />;
    if (t.includes('groq')) return <Sparkles size={10} className="text-orange-400" />;
    if (t.includes('python')) return <SiPython className="w-3 h-3 text-[#3776AB]" />;
    if (t.includes('fastapi')) return <SiFastapi className="w-3 h-3 text-[#05998B]" />;
    if (t.includes('firebase')) return <SiFirebase className="w-3 h-3 text-[#FFCA28]" />;
    if (t.includes('scikit')) return <SiScikitlearn className="w-3 h-3 text-[#F7931E]" />;
    if (t.includes('twilio')) return <SiTwilio className="w-3 h-3 text-[#F22F46]" />;
    if (t.includes('ollama')) return <Sparkles size={10} className="text-purple-400" />;
    return <span className="w-1 h-1 rounded-full bg-current" />;
};

const featuredProjects = [
    {
        title: 'SkillTwin',
        domain: 'Education Domain',
        tagline: 'Turning Degrees into Job-Ready Skills',
        description: 'An AI-first career intelligence platform that creates a "Digital Skill Twin" by analyzing resumes and GitHub profiles, detecting skill gaps, and generating personalized learning roadmaps using state-of-the-art LLMs.',
        image: '/skilltwin/hero.png',
        techHighlights: ['Next.js 16', 'React 19', 'Groq LLM', 'Supabase'],
        github: '#',
        live: '#',
    },
    {
        title: 'D-Liver',
        domain: 'Health Care Domain',
        tagline: 'AI-Powered Medical Report Intelligence',
        description: 'An intelligent healthcare platform that democratizes medical report comprehension. Patients upload documents and receive simplified AI explanations, while doctors get clinical views with confidence scoring and RAG-backed citations.',
        image: '/d-liver/hero.png',
        techHighlights: ['React 18', 'Ollama', 'Supabase', 'PubMed API'],
        github: '#',
        live: '#',
    },
    {
        title: 'Agri-Novation',
        domain: 'Agriculture Domain',
        tagline: 'Smart IoT & AI-Driven Precision Agriculture',
        description: 'A full-stack agricultural intelligence dashboard integrating real-time IoT sensor data, 6 concurrent ML models, and LLMs to provide proactive alerts, crop predictions, and actionable agronomic advice with multilingual support.',
        image: '/agri-sahayak/hero.png',
        techHighlights: ['FastAPI', 'Scikit-Learn', 'Firebase', 'Groq API'],
        github: '#',
        live: '#',
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-32 border-t border-white/5 relative bg-grid">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                        Selected <span className="text-gradient">Creations</span>
                    </h2>
                    <p className="text-primary max-w-lg text-lg md:text-xl font-light leading-relaxed">
                        A curated showcase of architectural implementations and complex solution engineering.
                    </p>
                </div>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-4 px-10 py-5 glass-card text-xs font-black text-accent2 uppercase tracking-[0.2em] hover:bg-accent1/10 hover:border-accent1/30 transition-all duration-500 group shrink-0 border border-white/5"
                >
                    The Full Collection
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-accent1" />
                </Link>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredProjects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-card overflow-hidden group border border-white/5 hover:border-accent1/20 hover:-translate-y-3 transition-all duration-700 ease-out flex flex-col h-full bg-surface/5"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                    >
                        {/* Image Preview with Hover Reveal */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-background">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-110 filter saturate-[0.1] group-hover:saturate-100 group-hover:blur-[2px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-700" />

                            {/* Hover Overlay Actions */}
                            <div className="absolute inset-0 flex items-center justify-center gap-6 translate-y-12 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-accent1 text-background rounded-full flex items-center justify-center hover:bg-gold-light hover:scale-110 transition-all shadow-2xl" title="Repository">
                                    <Github size={24} />
                                </a>
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white text-background rounded-full flex items-center justify-center hover:bg-accent2 hover:scale-110 transition-all shadow-2xl" title="Live Deployment">
                                    <ExternalLink size={24} />
                                </a>
                            </div>

                            {/* Domain badge */}
                            <div className="absolute top-6 left-6 inline-flex items-center gap-3 px-4 py-2 bg-background/60 backdrop-blur-xl border border-white/5 text-[9px] font-black tracking-[0.3em] text-accent1 uppercase rounded-full">
                                <Sparkles size={14} className="animate-pulse" /> {project.domain}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-10 flex-1 flex flex-col space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black text-accent2 group-hover:text-accent1 transition-all duration-500 font-heading uppercase tracking-wider italic">{project.title}</h3>
                                <p className="text-secondary text-xs font-black tracking-widest uppercase leading-none">{project.tagline}</p>
                            </div>

                            <p className="text-primary text-sm leading-relaxed flex-1 font-light line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack Chips */}
                            <div className="flex flex-wrap gap-2 py-4">
                                {project.techHighlights.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 text-[9px] font-black text-secondary rounded-lg group-hover:text-accent1 group-hover:border-accent1/20 transition-all uppercase tracking-widest flex items-center gap-1.5">
                                        {getTechIcon(tech)}
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-3 text-[10px] font-black text-accent2 hover:text-accent1 transition-colors uppercase tracking-[0.3em] group/btn"
                            >
                                Deep Analysis
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;

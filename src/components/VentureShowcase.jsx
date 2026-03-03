import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const ventures = [
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

const VentureShowcase = () => {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            {/* Section Header */}
            <motion.div
                className="text-center mb-20"
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
                    <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-serif italic">
                        Showcase
                    </span>
                </h2>
            </motion.div>

            {/* Venture Cards */}
            <div className="space-y-32">
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left - Info */}
                            <div className="space-y-6">
                                <p className="text-primary text-base md:text-lg leading-relaxed font-light">
                                    {venture.emoji} {venture.description}
                                </p>

                                <ul className="space-y-3">
                                    {venture.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-accent1 mt-1 text-sm">✦</span>
                                            <span className="text-primary text-sm leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {venture.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5 hover:border-accent1/30 hover:text-accent1 transition-all"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-current" />
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Mockup */}
                            <div className={`rounded-3xl bg-gradient-to-br ${venture.color} p-6 md:p-8 overflow-hidden relative group cursor-pointer`}>
                                <div className="relative z-10">
                                    <img
                                        src={venture.image}
                                        alt={venture.name}
                                        className="w-full rounded-2xl shadow-2xl group-hover:scale-[1.03] transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full aspect-video rounded-2xl bg-black/30 backdrop-blur-sm items-center justify-center">
                                        <span className="text-6xl">{venture.emoji}</span>
                                    </div>
                                </div>
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                                {/* VISIT PROJECT circular hover button */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center relative">
                                        {/* Rotating text ring */}
                                        <svg
                                            className="absolute inset-0 w-full h-full animate-spin-slow"
                                            viewBox="0 0 200 200"
                                        >
                                            <defs>
                                                <path
                                                    id={`circlePath-${idx}`}
                                                    d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
                                                />
                                            </defs>
                                            <text fill="white" fontSize="14" fontWeight="700" letterSpacing="6" style={{ textTransform: 'uppercase' }}>
                                                <textPath href={`#circlePath-${idx}`}>
                                                    • VISIT PROJECT • VISIT PROJECT
                                                </textPath>
                                            </text>
                                        </svg>
                                        {/* Eye icon center */}
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default VentureShowcase;

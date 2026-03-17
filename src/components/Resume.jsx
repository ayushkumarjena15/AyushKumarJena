import { Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Resume = () => {
    return (
        <section className="py-32 border-t border-white/5 flex flex-col lg:flex-row items-center gap-24 relative bg-grid">
            <motion.div
                className="flex-1 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="glass-card p-4 md:p-10 aspect-[1/1.41] w-full max-w-lg mx-auto relative group overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)] border border-white/5 bg-surface/5">
                    {/* Actual Resume Content Preview */}
                    <div className="w-full h-full bg-[#fafaf9] flex text-left text-[#1c1917] overflow-hidden relative pointer-events-none rounded-xl border border-white/10">
                        {/* Sidebar */}
                        <div className="w-[35%] bg-[#1c1917] text-[#e7e5e4] p-4 md:p-6 flex flex-col gap-8 text-[8px] md:text-[10px] leading-relaxed">
                            <div className="space-y-4">
                                <h3 className="text-[10px] md:text-sm text-accent1 font-black uppercase tracking-widest border-b border-white/10 pb-2">Contact</h3>
                                <div className="space-y-2 opacity-80">
                                    <p>Sambalpur, Odisha, India</p>
                                    <p>+91 9861522916</p>
                                    <p>ahalyajena28@gmail.com</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[10px] md:text-sm text-accent1 font-black uppercase tracking-widest border-b border-white/10 pb-2">Focus</h3>
                                <div className="space-y-2 opacity-80 font-black tracking-tighter">
                                    <p>React.js</p>
                                    <p>Machine Learning</p>
                                    <p>Cloud Arch.</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-[65%] p-6 md:p-10 flex flex-col gap-6 text-[8px] md:text-xs leading-tight">
                            <div className="space-y-1">
                                <h1 className="text-lg md:text-2xl font-bold text-[#0c0a09] uppercase tracking-normal font-ethnocentric">Ayush Kumar Jena</h1>
                                <p className="text-accent1 font-black uppercase tracking-[0.2em] text-[8px]">Software Engineering Resident</p>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-sm md:text-base font-black text-[#0c0a09] border-b-2 border-accent1/20 pb-1 italic">The Narrative</h2>
                                <div className="space-y-2 text-[#44403c] font-light leading-relaxed">
                                    <p>GIET University resident specializing in Artificial Intelligence and Machine Learning implementation. Passionate about architecting high-integrity solutions that bridge complex logic with intuitive design.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-sm md:text-base font-black text-[#0c0a09] border-b-2 border-accent1/20 pb-1 italic">Creations</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-black text-[#0c0a09] text-[9px] md:text-[13px] uppercase tracking-tight">SkillTwin — Career Intelligence</p>
                                        <p className="text-accent1 text-[7px] md:text-[9px] font-black uppercase tracking-widest mt-0.5">Next.js • TypeScript • LLM Orchestration</p>
                                    </div>
                                    <div>
                                        <p className="font-black text-[#0c0a09] text-[9px] md:text-[13px] uppercase tracking-tight">D-Liver — Medical Intelligence</p>
                                        <p className="text-accent1 text-[7px] md:text-[9px] font-black uppercase tracking-widest mt-0.5">React • Ollama • RAG Pipeline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-background/80 backdrop-blur-md">
                        <a href="/Ayush Resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-8 py-4 bg-accent1 text-background font-black rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl uppercase tracking-widest text-xs">
                            <Eye size={20} />
                            View Full Dossier
                        </a>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="flex-1 space-y-10 text-center lg:text-left"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                        Technical <span className="text-gradient">Narrative</span>
                    </h2>
                    <p className="text-primary text-xl font-light leading-relaxed max-w-xl">
                        A synthesized documentation of my engineering trajectory, pedagogical background, and implementation competencies.
                    </p>
                </div>

                <div className="pt-6 flex flex-wrap gap-6 justify-center lg:justify-start">
                    <a href="/Ayush Resume.pdf" download className="px-10 py-5 bg-accent1 text-background font-black rounded-2xl hover:bg-gold-light hover:-translate-y-1 transition-all duration-500 flex items-center gap-4 group shadow-2xl shadow-accent1/20 uppercase tracking-widest text-xs">
                        <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                        Download Archive
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Resume;

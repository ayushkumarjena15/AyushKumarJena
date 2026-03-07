import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    SiReact, SiTailwindcss, SiTypescript, SiNodedotjs,
    SiExpress, SiMongodb, SiGit, SiDocker, SiFigma
} from 'react-icons/si';

const getSkillIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return <SiReact className="text-[#61DAFB]" />;
    if (n.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
    if (n.includes('javascript') || n.includes('ts')) return <SiTypescript className="text-[#3178C6]" />;
    if (n.includes('node')) return <SiNodedotjs className="text-[#339933]" />;
    if (n.includes('express')) return <SiExpress className="text-white" />;
    if (n.includes('mongodb')) return <SiMongodb className="text-[#47A248]" />;
    if (n.includes('git')) return <SiGit className="text-[#F05032]" />;
    if (n.includes('docker')) return <SiDocker className="text-[#2496ED]" />;
    if (n.includes('figma')) return <SiFigma className="text-[#F24E1E]" />;
    return null;
};

const skills = [
    { category: 'Frontend', items: [{ name: 'React', level: 90 }, { name: 'Tailwind CSS', level: 85 }, { name: 'JavaScript / TS', level: 80 }] },
    { category: 'Backend', items: [{ name: 'Node.js', level: 75 }, { name: 'Express', level: 70 }, { name: 'MongoDB', level: 65 }] },
    { category: 'Tools', items: [{ name: 'Git & GitHub', level: 85 }, { name: 'Docker', level: 60 }, { name: 'Figma', level: 70 }] },
];

const About = () => {
    return (
        <section id="about" className="py-32 border-t border-white/5 relative bg-grid">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
            >
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Bio Column */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                                About <span className="text-gradient">Me</span>
                            </h2>
                            <div className="w-16 h-1.5 bg-accent1 rounded-full" />
                        </div>

                        <div className="space-y-8 text-primary leading-relaxed text-lg md:text-xl font-light">
                            <p>
                                I am a results-driven <span className="text-accent2 font-bold italic">Software Engineer</span> with a passion for designing and building highly scalable, resilient web architectures.
                            </p>
                            <p>
                                My methodology prioritizes <span className="text-accent2 font-bold italic">engineering excellence</span>, focusing on well-tested, maintainable codebases over quick patches. Whether crafting pixel-perfect UIs or optimizing server-side orchestration, my goal is to deliver premium digital experiences.
                            </p>
                            <p>
                                With a strong foundation in <span className="text-accent1 font-bold italic">Full-Stack Development</span>, I bridge the gap between complex logic and intuitive user experiences.
                            </p>
                        </div>

                        <Link to="/about" className="inline-flex items-center gap-6 px-10 py-5 glass-card text-accent2 font-black rounded-[2rem] hover:bg-white/5 hover:-translate-y-1 transition-all duration-500 group uppercase tracking-widest text-xs border border-white/5">
                            The Full Narrative
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-accent1" />
                        </Link>
                    </div>

                    {/* Skills Column */}
                    <div className="glass-card p-12 space-y-12 border border-white/5 hover:border-accent1/20 transition-all duration-700 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)] bg-surface/10">
                        <h3 className="text-2xl font-black text-accent2 font-heading uppercase tracking-widest italic">Technical Arsenal</h3>
                        <div className="space-y-10">
                            {skills.map((skillGroup, idx) => (
                                <div key={idx} className="space-y-8">
                                    <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">{skillGroup.category}</h4>
                                    <div className="space-y-7">
                                        {skillGroup.items.map((skill, i) => (
                                            <div key={i} className="group">
                                                <div className="flex justify-between text-sm mb-3">
                                                    <span className="text-primary font-bold group-hover:text-accent1 transition-colors uppercase tracking-widest text-[11px] flex items-center gap-2">
                                                        {getSkillIcon(skill.name)}
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-secondary font-mono text-xs">{skill.level}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-accent1 to-gold-light"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.8, delay: 0.2, ease: "circOut" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;

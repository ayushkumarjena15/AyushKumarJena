import { motion, useMotionValue, useAnimationFrame, useScroll, useVelocity, useSpring } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import { VscGraph } from 'react-icons/vsc';
import { FaJava, FaTerminal } from 'react-icons/fa';
import propeller from '../assets/propeller.png';

const skillRows = [
    ['C', 'Python', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
    ['Firebase', 'MongoDB', 'MySQL', 'Supabase'],
    ['FastAPI', 'Node.js', 'React', 'TailwindCSS'],
    ['Git', 'GitHub'],
    ['Netlify', 'Render', 'Vercel'],
    ['Matplotlib', 'MLflow', 'NumPy', 'Pandas', 'Plotly', 'PyTorch', 'scikit-learn', 'TensorFlow'],
    ['Docker', 'Kubernetes', 'Raspberry Pi', 'Windows Terminal'],
    ['Canva']
];

const skillIcons = {
    'C': { icon: SiIcons.SiC, color: '#A8B9CC' },
    'Python': { icon: SiIcons.SiPython, color: '#3776AB' },
    'Java': { icon: FaJava, color: '#007396' },
    'HTML5': { icon: SiIcons.SiHtml5, color: '#E34F26' },
    'CSS3': { icon: SiIcons.SiCss, color: '#1572B6' },
    'JavaScript': { icon: SiIcons.SiJavascript, color: '#F7DF1E' },
    'TypeScript': { icon: SiIcons.SiTypescript, color: '#3178C6' },
    'Firebase': { icon: SiIcons.SiFirebase, color: '#FFCA28' },
    'MongoDB': { icon: SiIcons.SiMongodb, color: '#47A248' },
    'MySQL': { icon: SiIcons.SiMysql, color: '#4479A1' },
    'Supabase': { icon: SiIcons.SiSupabase, color: '#3ECF8E' },
    'FastAPI': { icon: SiIcons.SiFastapi, color: '#009688' },
    'Node.js': { icon: SiIcons.SiNodedotjs, color: '#339933' },
    'React': { icon: SiIcons.SiReact, color: '#61DAFB' },
    'TailwindCSS': { icon: SiIcons.SiTailwindcss, color: '#06B6D4' },
    'Git': { icon: SiIcons.SiGit, color: '#F05032' },
    'GitHub': { icon: SiIcons.SiGithub, color: '#ffffff' },
    'Netlify': { icon: SiIcons.SiNetlify, color: '#00C7B7' },
    'Render': { icon: SiIcons.SiRender, color: '#ffffff' },
    'Vercel': { icon: SiIcons.SiVercel, color: '#ffffff' },
    'Matplotlib': { icon: VscGraph, color: '#ffffff' },
    'MLflow': { icon: SiIcons.SiMlflow, color: '#0194E2' },
    'NumPy': { icon: SiIcons.SiNumpy, color: '#013243' },
    'Pandas': { icon: SiIcons.SiPandas, color: '#150458' },
    'Plotly': { icon: SiIcons.SiPlotly, color: '#3F4F75' },
    'PyTorch': { icon: SiIcons.SiPytorch, color: '#EE4C2C' },
    'scikit-learn': { icon: SiIcons.SiScikitlearn, color: '#F7931E' },
    'TensorFlow': { icon: SiIcons.SiTensorflow, color: '#FF6F00' },
    'Docker': { icon: SiIcons.SiDocker, color: '#2496ED' },
    'Kubernetes': { icon: SiIcons.SiKubernetes, color: '#326CE5' },
    'Raspberry Pi': { icon: SiIcons.SiRaspberrypi, color: '#A22846' },
    'Windows Terminal': { icon: FaTerminal, color: '#4D4D4D' },
    'Canva': { icon: SiIcons.SiCanva, color: '#00C4CC' }
};

/* ── Realistic 3D Propeller Animation ── */
const SpinningWheel = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    const rotation = useMotionValue(0);

    useAnimationFrame((_, delta) => {
        const velocity = smoothVelocity.get();
        const direction = velocity < 0 ? -1 : 1;
        const scrollBoost = Math.abs(velocity) * 0.003;
        rotation.set(rotation.get() + scrollBoost * direction * delta * 0.1);
    });

    return (
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                <div className="absolute inset-[-40px] bg-blue-500/10 rounded-full blur-[100px]" />

                {/* Mask on plain div (not the rotating one) so it actually works */}
                <div
                    className="w-full h-full"
                    style={{
                        maskImage: 'radial-gradient(circle, black 44%, transparent 66%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 44%, transparent 66%)',
                    }}
                >
                    <motion.div className="w-full h-full" style={{ rotate: rotation }}>
                        <img
                            src={propeller}
                            alt="Propeller"
                            className="w-full h-full object-contain"
                            style={{
                                mixBlendMode: 'screen',
                                maskImage: 'radial-gradient(ellipse 70% 70% at center, black 50%, transparent 75%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 50%, transparent 75%)',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const SkillsetSection = () => {
    return (
        <section className="pt-16 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* Propeller + Header overlapping container */}
            <div className="relative flex flex-col items-center mb-16">
                {/* Propeller — bottom layer */}
                <motion.div
                    className="relative z-0"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 30%, transparent 80%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 80%)',
                    }}
                >
                    <div className="w-64 h-64 md:w-80 md:h-80">
                        <SpinningWheel />
                    </div>
                </motion.div>

                {/* Header — top layer, pulled up to overlap propeller */}
                <motion.div
                    className="text-center relative z-10 -mt-28"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white">
                    The Magic{' '}
                    <span className="bg-clip-text text-transparent italic animated-gradient-text">
                        Behind
                    </span>
                    <span className="sr-only"> - My Skills</span>
                </h2>
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent1 font-bold mt-4">My Skillset</p>
                </motion.div>
            </div>

            {/* Skill Rows */}
            <div className="space-y-4 flex flex-col items-center">
                {skillRows.map((row, rowIdx) => (
                    <motion.div
                        key={rowIdx}
                        className="flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: rowIdx * 0.1 }}
                    >
                        {row.map((skill) => (
                            <motion.span
                                key={skill}
                                className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm font-medium text-secondary flex items-center gap-2.5 hover:border-white/20 hover:text-white hover:bg-white/[0.06] transition-all duration-500 cursor-default group"
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                {skillIcons[skill] ? (
                                    <span className="opacity-80 group-hover:opacity-100 transition-opacity flex items-center">
                                        {(() => {
                                            const IconComp = skillIcons[skill].icon;
                                            return <IconComp size={16} color={skillIcons[skill].color} />;
                                        })()}
                                    </span>
                                ) : (
                                    <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">•</span>
                                )}
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SkillsetSection;

import { motion, useTransform, useScroll } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import { VscGraph } from 'react-icons/vsc';
import { FaJava, FaXbox, FaTerminal } from 'react-icons/fa';
import propeller from '../assets/propeller.png';

const skillRows = [
    ['C', 'C++', 'Python', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
    ['Firebase', 'MongoDB', 'MySQL', 'Supabase', 'Prisma'],
    ['Apache Kafka', 'Django', 'Express.js', 'FastAPI', 'Flask', 'Node.js', 'React', 'TailwindCSS', 'Three.js'],
    ['Bitbucket', 'Git', 'GitHub'],
    ['Cloudflare', 'Google Cloud', 'Netlify', 'Render', 'Vercel'],
    ['Matplotlib', 'MLflow', 'NumPy', 'Pandas', 'Plotly', 'PyTorch', 'scikit-learn', 'TensorFlow'],
    ['Docker', 'Kubernetes', 'Power BI', 'Raspberry Pi', 'Twilio', 'NVIDIA', 'OpenGL', 'PlayStation Network', 'Riot Games', 'Xbox', 'Windows Terminal'],
    ['Adobe', 'Adobe Photoshop', 'Canva', 'Figma', 'Sketch']
];

const skillIcons = {
    'C': { icon: SiIcons.SiC, color: '#A8B9CC' },
    'C++': { icon: SiIcons.SiCplusplus, color: '#00599C' },
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
    'Prisma': { icon: SiIcons.SiPrisma, color: '#2D3748' },
    'Apache Kafka': { icon: SiIcons.SiApachekafka, color: '#231F20' },
    'Django': { icon: SiIcons.SiDjango, color: '#092E20' },
    'Express.js': { icon: SiIcons.SiExpress, color: '#ffffff' },
    'FastAPI': { icon: SiIcons.SiFastapi, color: '#009688' },
    'Flask': { icon: SiIcons.SiFlask, color: '#ffffff' },
    'Node.js': { icon: SiIcons.SiNodedotjs, color: '#339933' },
    'React': { icon: SiIcons.SiReact, color: '#61DAFB' },
    'TailwindCSS': { icon: SiIcons.SiTailwindcss, color: '#06B6D4' },
    'Three.js': { icon: SiIcons.SiThreedotjs, color: '#ffffff' },
    'Bitbucket': { icon: SiIcons.SiBitbucket, color: '#0052CC' },
    'Git': { icon: SiIcons.SiGit, color: '#F05032' },
    'GitHub': { icon: SiIcons.SiGithub, color: '#ffffff' },
    'Cloudflare': { icon: SiIcons.SiCloudflare, color: '#F38020' },
    'Google Cloud': { icon: SiIcons.SiGooglecloud, color: '#4285F4' },
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
    'Power BI': { icon: VscGraph, color: '#F2C811' },
    'Raspberry Pi': { icon: SiIcons.SiRaspberrypi, color: '#A22846' },
    'Twilio': { icon: SiIcons.SiTwilio, color: '#F22F46' },
    'NVIDIA': { icon: SiIcons.SiNvidia, color: '#76B900' },
    'OpenGL': { icon: SiIcons.SiOpengl, color: '#5586A4' },
    'PlayStation Network': { icon: SiIcons.SiPlaystation, color: '#003087' },
    'Riot Games': { icon: SiIcons.SiRiotgames, color: '#EB0029' },
    'Xbox': { icon: FaXbox, color: '#107C10' },
    'Windows Terminal': { icon: FaTerminal, color: '#4D4D4D' },
    'Canva': { icon: SiIcons.SiCanva, color: '#00C4CC' },
    'Figma': { icon: SiIcons.SiFigma, color: '#F24E1E' },
    'Sketch': { icon: SiIcons.SiSketch, color: '#F7B500' }
};

/* ── Realistic 3D Propeller Animation ── */
const SpinningWheel = () => {
    const { scrollYProgress } = useScroll();
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 720]);

    return (
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center rounded-full overflow-hidden bg-black/50">
                <motion.img
                    src={propeller}
                    alt="Propeller"
                    className="w-full h-full object-contain relative z-10"
                    style={{
                        rotate: rotation,
                        mixBlendMode: 'screen',
                        filter: 'contrast(1.8) brightness(0.6) saturate(0)',
                    }}
                />
            </div>
        </div>
    );
};

const SkillsetSection = () => {
    return (
        <section className="pt-16 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* Realistic Spinning Wheel Animation */}
            <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                <div className="w-48 h-48 md:w-64 md:h-64 relative">
                    <SpinningWheel />
                </div>
            </motion.div>

            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent1 font-bold mb-4">My Skillset</p>
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white">
                    The Magic{' '}
                    <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent italic">
                        Behind
                    </span>
                </h2>
            </motion.div>

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

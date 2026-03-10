import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const QuickGlance = () => {
    return (
        <section className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Left column - Text */}
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[11px] uppercase tracking-[0.4em] text-accent1 font-bold">
                        A Quick Glance
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight">
                        Building the bridge between ideas and{' '}
                        <span className="font-serif italic bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            experiences
                        </span>
                    </h2>

                    <div className="space-y-6 text-primary text-base md:text-lg leading-relaxed font-light">
                        <p>
                            I'm Ayush Kumar Jena, an engineering-driven developer who turns complex technical challenges into high-speed web products.
                            I manage the entire stack with a focus on clean, reusable code and seamless performance.
                            I excel in <span className="text-white font-medium underline decoration-accent1/40 underline-offset-4">React</span> and{' '}
                            <span className="text-white font-medium underline decoration-accent1/40 underline-offset-4">full-stack architecture</span>,
                            always delivering modern solutions that actually solve problems for every user.
                        </p>
                        <p>
                            As an AI & ML enthusiast, I build platforms like SkillTwin and D-Liver. Building these startup-level ecosystems has taught me how to ship products that scale.
                        </p>
                        <p>
                            My code is built to last, helping your startup reach the next milestone faster with production-grade reliability.
                        </p>
                    </div>

                    <Link
                        to="/about"
                        className="inline-flex items-center gap-4 text-sm font-bold text-accent1 hover:text-white transition-colors group uppercase tracking-wider"
                    >
                        Read more about me
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Right column - Photo */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md ml-auto">
                        <img
                            src="/profile.jpeg"
                            alt="Ayush Kumar Jena"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 border border-white/5 rounded-3xl" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent1/10 rounded-3xl" />
                </motion.div>
            </div>
        </section>
    );
};

export default QuickGlance;

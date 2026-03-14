import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers, ChevronDown } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
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

    const name = "AYUSH";

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background">
            {/* Subtle gradient bg */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,30,30,0.4)_0%,_transparent_70%)]" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 pt-32 pb-20">
                {/* Giant Name */}
                <motion.h1
                    className="text-[clamp(3.5rem,15vw,14rem)] font-black text-white leading-[0.85] tracking-[-0.04em] uppercase font-heading select-none lg:mb-8"
                    style={{ perspective: '600px' }}
                >
                    <span className="sr-only">Ayush Kumar Jena - Software Developer Portfolio</span>
                    <span className="flex overflow-hidden" aria-hidden="true">
                        {name.split('').map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block"
                                style={{ transformOrigin: 'bottom center' }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>
                <h2 className="sr-only">Software Developer Portfolio</h2>

                {/* Subtitle Line 1 */}
                <motion.p
                    className="text-[clamp(0.6rem,1.4vw,0.85rem)] text-secondary tracking-[0.35em] uppercase font-medium mt-8 md:mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    I design and build products that
                </motion.p>

                {/* Subtitle Line 2 - Italic serif */}
                <motion.p
                    className="text-[clamp(1.5rem,4vw,3rem)] text-accent2 font-serif italic mt-3 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    deliver real impact.
                </motion.p>
            </div>

            {/* Bottom Info Badges */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
            >
                {/* Left - Location */}
                <div className="flex flex-col items-center gap-2">
                    <MapPin size={18} className="text-green-500" />
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-accent2 text-center">
                        Based in Sambalpur,
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-secondary text-center">
                        India
                    </p>
                </div>

                {/* Right - Role */}
                <div className="flex flex-col items-center gap-2">
                    <Layers size={18} className="text-blue-400" />
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-accent2 text-center">
                        Full Stack Dev
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-secondary text-center">
                        & MLOps
                    </p>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator text="Scroll down to see project" />
        </section>
    );
};

export default Hero;

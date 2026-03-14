import React from 'react';
import { motion } from 'framer-motion';
import { Beaker } from 'lucide-react';

const LabsPage = () => {
    return (
        <motion.section
            className="min-h-screen bg-background overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Hero */}
            <div className="relative flex flex-col items-center justify-center text-center pt-36 pb-24 px-6 overflow-hidden">
                {/* Spotlight glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10"
                >
                    <h1 className="text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-tight uppercase text-white font-heading select-none">
                        LABS
                    </h1>
                    <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mt-6 mb-2">
                        EXPERIMENTAL PLAYGROUND
                    </p>
                    <p className="text-[clamp(1.5rem,4vw,3rem)] font-serif italic text-white/70 leading-tight">
                        where ideas come alive.
                    </p>
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-32 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent"
                >
                    <div className="w-20 h-20 rounded-full bg-[#5a4fcf]/20 flex items-center justify-center text-[#5a4fcf] mb-6">
                        <Beaker size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Curiosity fueled by coffee.</h2>
                    <p className="text-secondary text-base max-w-lg mx-auto leading-relaxed">
                        This is where I build prototypes, experiment with emerging tech, and break things to learn how they work. Experiments coming soon!
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LabsPage;

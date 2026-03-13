import React from 'react';
import { motion } from 'framer-motion';
import { Beaker } from 'lucide-react';

const LabsPage = () => {
    return (
        <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24"
            >
                <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mb-8 pl-1">EXPERIMENTAL PLAYGROUND</p>
                <h1 className="flex flex-col">
                    <span className="text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-tight uppercase text-white font-heading select-none text-gradient-purple">
                        THE
                    </span>
                    <span className="text-[clamp(3.5rem,10vw,8.5rem)] font-serif italic text-white/[0.35] leading-[0.85] tracking-tight pl-2 md:pl-6 -mt-3 select-none">
                        labs
                    </span>
                </h1>
            </motion.div>

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
        </section>
    );
};

export default LabsPage;

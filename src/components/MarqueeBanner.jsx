import { motion } from 'framer-motion';

const words = [
    'IMMERSIVE', 'PROTECTED', 'DEPENDABLE', 'CAPTIVATING',
    'USER-FRIENDLY', 'ADAPTIVE', 'SCALABLE', 'PERFORMANT',
    'RESILIENT', 'INNOVATIVE', 'ACCESSIBLE', 'DYNAMIC',
];

const MarqueeBanner = () => {
    return (
        <section className="py-6 overflow-hidden relative">
            {/* Dark background bar */}
            <div className="bg-surface/50 backdrop-blur-sm border-y border-white/5 py-5 relative overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    {[...words, ...words].map((word, i) => (
                        <span
                            key={i}
                            className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-white/90 flex items-center gap-6"
                        >
                            <span className="text-accent1/60">✦</span>
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MarqueeBanner;

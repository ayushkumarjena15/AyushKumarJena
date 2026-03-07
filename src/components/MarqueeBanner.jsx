import { motion } from 'framer-motion';

const words = [
    'IMMERSIVE', 'PROTECTED', 'DEPENDABLE', 'CAPTIVATING',
    'USER-FRIENDLY', 'ADAPTIVE', 'SCALABLE', 'PERFORMANT',
    'RESILIENT', 'INNOVATIVE', 'ACCESSIBLE', 'DYNAMIC',
];

const MarqueeBanner = () => {
    return (
        <section className="py-6 overflow-hidden relative">
            {/* Red background bar */}
            <div className="bg-[#e11d48] py-5 relative overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.3)]">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    {[...words, ...words].map((word, i) => (
                        <span
                            key={i}
                            className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-white flex items-center gap-6"
                        >
                            <span className="text-white/40">✦</span>
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MarqueeBanner;

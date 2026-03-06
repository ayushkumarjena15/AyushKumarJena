import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('signing'); // 'signing' -> 'done'

    // The text to write
    const signatureText = "Ayush Kumar Jena";

    useEffect(() => {
        // Total animation duration: ~2.5s for signature + 0.5s pause
        const signatureDuration = 2500;

        const timer = setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
                onComplete();
            }, 600);
        }, signatureDuration + 500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const themeColor = "#c2a07a"; // Warm gold accent

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Background glowing orb */}
                <motion.div
                    className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] pointer-events-none"
                    style={{ backgroundColor: `${themeColor}15` }} // 15% opacity for Earthy feel
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Signature Container */}
                    <motion.div
                        className="flex flex-col items-center justify-center w-full px-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* The Signature Text Area */}
                        <div className="relative flex items-center justify-center py-4">
                            {/* Main text that is revealed */}
                            <motion.h1
                                className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-none font-bold uppercase"
                                style={{
                                    fontFamily: "'ethnocentric', sans-serif",
                                    color: themeColor,
                                    whiteSpace: 'nowrap',
                                    clipPath: 'inset(0% 100% 0% 0%)',
                                    textShadow: `0 0 30px ${themeColor}44`,
                                    paddingRight: '10px'
                                }}
                                animate={{
                                    clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut"
                                }}
                            >
                                {signatureText}
                            </motion.h1>

                            {/* Cursor that follows the writing */}
                            <motion.div
                                className="absolute h-2 w-2 sm:h-3 sm:w-3 rounded-full z-10"
                                style={{
                                    backgroundColor: themeColor,
                                    boxShadow: `0 0 20px 8px ${themeColor}66`
                                }}
                                initial={{ left: '0%', opacity: 0 }}
                                animate={{
                                    left: ['0%', '100%'],
                                    opacity: [0, 1, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    opacity: {
                                        duration: 2.5,
                                        times: [0, 0.05, 0.5, 0.9, 1],
                                    }
                                }}
                            />
                        </div>

                        {/* Underline swoosh */}
                        <svg
                            viewBox="0 0 400 20"
                            className="w-[220px] sm:w-[320px] md:w-[450px]"
                            style={{ overflow: 'visible', marginTop: '-5px' }}
                        >
                            <motion.path
                                d="M 10 10 Q 100 -5 200 10 Q 300 25 390 10"
                                stroke={themeColor}
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{
                                    pathLength: { duration: 1, delay: 2, ease: "easeOut" },
                                    opacity: { duration: 0.5, delay: 2 }
                                }}
                            />
                        </svg>
                    </motion.div>

                    {/* Progress Bar Container */}
                    <motion.div
                        className="w-48 md:w-80 h-[1px] mt-16 bg-white/5 rounded-full overflow-hidden relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 h-full"
                            style={{
                                backgroundColor: themeColor,
                                boxShadow: `0 0 10px 1px ${themeColor}66`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Status text */}
                    <div className="mt-8 h-6 relative flex justify-center items-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={phase}
                                className={`text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase transition-colors duration-500`}
                                style={{
                                    color: phase === 'done' ? themeColor : '#a8a29e', // secondary color
                                    textShadow: phase === 'done' ? `0 0 15px ${themeColor}60` : 'none'
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                {phase === 'signing' && "Ayush Kumar Jena"}
                                {phase === 'done' && "Loading Complete"}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;

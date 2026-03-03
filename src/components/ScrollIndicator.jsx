import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 z-20 hidden md:flex cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={28} className="text-secondary hover:text-white transition-colors" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollIndicator;

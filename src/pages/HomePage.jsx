import React from 'react';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import VentureShowcase from '../components/VentureShowcase';
import SkillsetSection from '../components/SkillsetSection';
import MarqueeBanner from '../components/MarqueeBanner';
import QuickGlance from '../components/QuickGlance';
import BehindCurtains from '../components/BehindCurtains';
import CTASection from '../components/CTASection';

import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 className="sr-only">Ayush Kumar Jena - Creative Engineer & Full Stack Developer based in Sambalpur, India</h1>
            <Hero />
            <BentoGrid />
            <VentureShowcase />
            <SkillsetSection />
            <MarqueeBanner />
            <QuickGlance />
            <BehindCurtains />
            <CTASection />
        </motion.main>
    );
};

export default HomePage;

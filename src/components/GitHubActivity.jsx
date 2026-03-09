import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubActivity = () => {
    // Exact GitHub contribution colors matching the provided screenshot
    const explicitTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="w-full py-16 bg-background relative overflow-hidden flex flex-col items-center">
            {/* Subtle green glow in the background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39d353]/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/60 font-bold text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
                        MY CODE JOURNEY
                    </p>
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-[1] tracking-tight text-white font-heading">
                        GitHub Activity
                    </h2>
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-serif italic text-white/50 leading-[1] tracking-tight flex items-center justify-center gap-3">
                        <span className="text-[#ec4899] font-sans font-black not-italic px-1 tracking-tighter">&amp;&amp;</span>
                        <span className="text-transparent border-none bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#ef4444] stroke-none">
                            Open Source
                        </span>
                    </h2>
                </motion.div>

                {/* Custom Live GitHub Calendar Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center pb-6 overflow-x-auto"
                >
                    <div className="min-w-max">
                        <GitHubCalendar
                            username="ayushkumarjena15"
                            colorScheme="dark"
                            theme={explicitTheme}
                            blockSize={14}
                            blockMargin={5}
                            fontSize={12}
                        />
                    </div>
                </motion.div>


            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .react-activity-calendar {
                    font-family: inherit !important;
                }
                .react-activity-calendar text {
                    fill: #8b949e !important;
                }
            `}} />
        </section>
    );
};

export default GitHubActivity;

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';

const GitHubActivity = () => {
    const explicitTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="w-full py-16 bg-background relative overflow-hidden flex flex-col items-center">
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
                        <span className="animated-gradient-text font-sans font-black not-italic px-1 tracking-tighter">&amp;&amp;</span>
                        <span className="animated-gradient-text">
                            Open Source
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
                            renderBlock={(block, activity) =>
                                React.cloneElement(block, {
                                    'data-tooltip-id': 'gh-tooltip',
                                    'data-tooltip-content': `${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.`,
                                })
                            }
                        />
                        <Tooltip
                            id="gh-tooltip"
                            style={{
                                backgroundColor: '#1a1a1a',
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                                zIndex: 9999,
                            }}
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

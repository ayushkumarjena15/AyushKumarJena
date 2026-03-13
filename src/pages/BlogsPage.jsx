import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const BlogsPage = () => {
    return (
        <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24"
            >
                <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mb-8 pl-1">MY THOUGHTS && WRITINGS</p>
                <h1 className="flex flex-col">
                    <span className="text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-tight uppercase text-white font-heading select-none">
                        BLOG
                    </span>
                    <span className="text-[clamp(3.5rem,10vw,8.5rem)] font-serif italic text-white/[0.35] leading-[0.85] tracking-tight pl-2 md:pl-6 -mt-3 select-none">
                        posts
                    </span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-32 rounded-[3rem] border border-white/5 bg-white/[0.02]"
            >
                <BookOpen size={52} className="text-white/20 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Writing things down...</h2>
                <p className="text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                    I'm currently working on some deep dives into engineering, AI, and product strategy. Check back soon!
                </p>
            </motion.div>
        </section>
    );
};

export default BlogsPage;

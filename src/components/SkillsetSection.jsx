import { motion } from 'framer-motion';

const skillRows = [
    ['ReactJS', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Motion', 'Sanity'],
    ['Contentful', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Prisma'],
    ['Zustand', 'Zod', 'pnpm', 'Bun', 'Git', 'GitHub', 'Vercel'],
    ['AWS', 'Docker', 'Figma', 'Supabase', 'Firebase', 'Linux'],
];

const skillEmojis = {
    'ReactJS': '⚛️', 'Next.js': '▲', 'TypeScript': '🔷', 'Tailwind CSS': '🎨',
    'GSAP': '🟢', 'Motion': '🎬', 'Sanity': '🔮', 'Contentful': '📦',
    'Node.js': '🟩', 'Express.js': '⚡', 'PostgreSQL': '🐘', 'MongoDB': '🍃',
    'Prisma': '◆', 'Zustand': '🐻', 'Zod': '✔️', 'pnpm': '📦',
    'Bun': '🍞', 'Git': '🔀', 'GitHub': '🐙', 'Vercel': '▲',
    'AWS': '☁️', 'Docker': '🐋', 'Figma': '🎨', 'Supabase': '⚡',
    'Firebase': '🔥', 'Linux': '🐧',
};

const SkillsetSection = () => {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* 3D Abstract visual at top */}
            <motion.div
                className="flex justify-center mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="w-40 h-40 md:w-56 md:h-56 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent animate-spin-slow" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-tl from-white/5 to-transparent animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
                    <div className="absolute inset-8 rounded-full bg-gradient-to-r from-white/5 to-transparent animate-spin-slow" style={{ animationDuration: '15s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl md:text-7xl opacity-20">✺</div>
                    </div>
                </div>
            </motion.div>

            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent1 font-bold mb-4">My Skillset</p>
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white">
                    The Magic{' '}
                    <span className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent font-serif italic">
                        Behind
                    </span>
                </h2>
            </motion.div>

            {/* Skill Rows */}
            <div className="space-y-4 flex flex-col items-center">
                {skillRows.map((row, rowIdx) => (
                    <motion.div
                        key={rowIdx}
                        className="flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: rowIdx * 0.1 }}
                    >
                        {row.map((skill) => (
                            <motion.span
                                key={skill}
                                className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm font-medium text-secondary flex items-center gap-2.5 hover:border-white/20 hover:text-white hover:bg-white/[0.06] transition-all duration-500 cursor-default group"
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">
                                    {skillEmojis[skill] || '•'}
                                </span>
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SkillsetSection;

import { motion } from 'framer-motion';
import { useMemo } from 'react';

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

/* ─── Realistic Wheel / Gear Animation ─── */
const SpinningWheel = () => {
    const cx = 150, cy = 150;
    const gold = '#c2a07a';
    const goldLight = '#d4b896';
    const goldDim = '#8a7560';

    // Generate gear teeth path
    const gearTeeth = useMemo(() => {
        const teeth = 24;
        const outerR = 120;
        const innerR = 110;
        const points = [];
        for (let i = 0; i < teeth; i++) {
            const a1 = (i / teeth) * Math.PI * 2;
            const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
            const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
            const a4 = ((i + 0.7) / teeth) * Math.PI * 2;
            points.push(`${cx + Math.cos(a1) * innerR},${cy + Math.sin(a1) * innerR}`);
            points.push(`${cx + Math.cos(a2) * outerR},${cy + Math.sin(a2) * outerR}`);
            points.push(`${cx + Math.cos(a3) * outerR},${cy + Math.sin(a3) * outerR}`);
            points.push(`${cx + Math.cos(a4) * innerR},${cy + Math.sin(a4) * innerR}`);
        }
        return `M ${points.join(' L ')} Z`;
    }, []);

    // Spokes
    const spokeCount = 12;
    const spokes = useMemo(() => {
        return Array.from({ length: spokeCount }, (_, i) => {
            const angle = (i / spokeCount) * Math.PI * 2;
            return {
                x1: cx + Math.cos(angle) * 22,
                y1: cy + Math.sin(angle) * 22,
                x2: cx + Math.cos(angle) * 100,
                y2: cy + Math.sin(angle) * 100,
            };
        });
    }, []);

    // Small orbiting dots
    const orbitDots = [
        { r: 135, dur: 10, size: 2.5, delay: 0 },
        { r: 135, dur: 10, size: 2, delay: 5 },
        { r: 140, dur: 14, size: 1.5, delay: 2 },
        { r: 145, dur: 18, size: 1.2, delay: 7 },
    ];

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
                <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={gold} stopOpacity="0.12" />
                    <stop offset="70%" stopColor={gold} stopOpacity="0.04" />
                    <stop offset="100%" stopColor={gold} stopOpacity="0" />
                </radialGradient>
                <filter id="goldGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background radial glow */}
            <circle cx={cx} cy={cy} r="148" fill="url(#wheelGlow)" />

            {/* ── Outer gear ring (clockwise) ── */}
            <motion.g
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                <path
                    d={gearTeeth}
                    fill="none"
                    stroke={gold}
                    strokeWidth="1.5"
                    opacity={0.5}
                    filter="url(#softGlow)"
                />
            </motion.g>

            {/* ── Outer rim ring ── */}
            <motion.circle
                cx={cx} cy={cy} r="105"
                fill="none"
                stroke={gold}
                strokeWidth="1.2"
                opacity={0.35}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Decorative dashed ring ── */}
            <motion.circle
                cx={cx} cy={cy} r="95"
                fill="none"
                stroke={goldDim}
                strokeWidth="0.8"
                strokeDasharray="4 8"
                opacity={0.3}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Spokes (counter-clockwise) ── */}
            <motion.g
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {spokes.map((s, i) => (
                    <line
                        key={i}
                        x1={s.x1} y1={s.y1}
                        x2={s.x2} y2={s.y2}
                        stroke={gold}
                        strokeWidth={i % 3 === 0 ? '1.2' : '0.6'}
                        opacity={i % 3 === 0 ? 0.4 : 0.18}
                    />
                ))}
            </motion.g>

            {/* ── Inner ring (clockwise, faster) ── */}
            <motion.circle
                cx={cx} cy={cy} r="70"
                fill="none"
                stroke={goldLight}
                strokeWidth="0.8"
                opacity={0.25}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Inner decorative ring with ticks ── */}
            <motion.g
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
                <circle cx={cx} cy={cy} r="55" fill="none" stroke={goldDim} strokeWidth="0.6" opacity={0.2} />
                {Array.from({ length: 36 }, (_, i) => {
                    const angle = (i / 36) * Math.PI * 2;
                    const r1 = 52;
                    const r2 = i % 3 === 0 ? 47 : 50;
                    return (
                        <line
                            key={i}
                            x1={cx + Math.cos(angle) * r1}
                            y1={cy + Math.sin(angle) * r1}
                            x2={cx + Math.cos(angle) * r2}
                            y2={cy + Math.sin(angle) * r2}
                            stroke={goldDim}
                            strokeWidth={i % 3 === 0 ? '1' : '0.5'}
                            opacity={i % 3 === 0 ? 0.35 : 0.15}
                        />
                    );
                })}
            </motion.g>

            {/* ── Hub ring ── */}
            <motion.circle
                cx={cx} cy={cy} r="20"
                fill="none"
                stroke={gold}
                strokeWidth="2"
                opacity={0.5}
                filter="url(#goldGlow)"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Center hub dot (pulsing) ── */}
            <motion.circle
                cx={cx} cy={cy} r="5"
                fill={gold}
                filter="url(#goldGlow)"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Orbiting particles ── */}
            {orbitDots.map((dot, i) => (
                <motion.circle
                    key={i}
                    r={dot.size}
                    fill={i % 2 === 0 ? gold : goldLight}
                    filter="url(#softGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: dot.dur * 0.4,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: 'easeInOut',
                    }}
                >
                    <animateMotion
                        dur={`${dot.dur}s`}
                        repeatCount="indefinite"
                        begin={`${dot.delay}s`}
                        path={`M ${cx + dot.r} ${cy} A ${dot.r} ${dot.r} 0 1 1 ${cx - dot.r} ${cy} A ${dot.r} ${dot.r} 0 1 1 ${cx + dot.r} ${cy}`}
                    />
                </motion.circle>
            ))}
        </svg>
    );
};

const SkillsetSection = () => {
    return (
        <section className="pt-16 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* Realistic Spinning Wheel Animation */}
            <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                <div className="w-48 h-48 md:w-64 md:h-64 relative">
                    <SpinningWheel />
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

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform, useSpring, useVelocity } from 'framer-motion';
import { MapPin, Github, Linkedin, Twitter, Copy, ArrowUpRight, Sparkles } from 'lucide-react';

const BentoGrid = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ahalyajena28@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: (i) => ({
            opacity: 1, y: 0, scale: 1,
            transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        })
    };

    const philosophyTags = ['Motion', 'Type', 'Feedback', 'Craft'];
    const [activeTag, setActiveTag] = useState(0);

    const galleryItems = [
        { id: 1, type: 'image', content: '/profile.jpeg', gradient: 'from-accent1/20 to-accent1/5' },
        { id: 2, type: 'image', content: '/gallery/sphere.jpg', gradient: 'from-blue-600/20 to-indigo-600/10' },
        { id: 3, type: 'image', content: '/gallery/torus.jpg', gradient: 'from-blue-700/20 to-indigo-800/10' },
        { id: 4, type: 'image', content: '/gallery/geometric.jpg', gradient: 'from-stone-600/20 to-stone-900/10' },
        { id: 5, type: 'image', content: '/gallery/ai_face.jpg', gradient: 'from-purple-600/20 to-fuchsia-600/20' },
        { id: 6, type: 'image', content: '/gallery/abstract_gold.jpg', gradient: 'from-orange-600/20 to-amber-600/20' },
    ];

    const dragRef = useRef(null);

    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);
    const xSpring = useSpring(xVelocity, {
        stiffness: 100,
        damping: 30
    });

    const skew = useTransform(xSpring, [-5000, 5000], [-15, 15]);
    const containerRef = useRef(null);

    // Track the width of a single set of items to handle looping
    // 6 items * (140px + 12px gap) = 912px
    const setWidth = 912;

    useAnimationFrame((t, delta) => {
        // Persistent auto-scroll
        const currentX = x.get();
        x.set(currentX - 0.6); // Slightly faster crawl for better feel

        if (currentX > 0) {
            x.set(currentX - setWidth);
        } else if (currentX < -setWidth) {
            x.set(currentX + setWidth);
        }
    });

    useEffect(() => {
        // Start with a slight offset to center the items better
        x.set(0);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTag(prev => (prev + 1) % philosophyTags.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

                {/* Card 1: Profile Card */}
                <motion.div
                    className="bento-card p-6 md:p-8 flex flex-col justify-between row-span-2 min-h-[380px]"
                    custom={0}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div>
                        <h3 className="text-2xl font-heading font-black text-white">
                            Ayush Kumar Jena
                        </h3>
                        <div className="flex items-center gap-2 mt-3 text-secondary text-xs">
                            <MapPin size={12} />
                            <span>Sambalpur, IN</span>
                            <span className="text-white/20 mx-1">•</span>
                            <span>{currentTime}</span>
                        </div>
                    </div>

                    {/* Draggable Photo Gallery - Circular Loop with 3D Animation */}
                    <div className="mt-8 relative" style={{ perspective: '1200px' }}>
                        <div className="overflow-hidden" ref={containerRef}>
                            <motion.div
                                drag="x"
                                style={{ x, skewX: skew }}
                                dragConstraints={{ left: -setWidth * 2, right: setWidth }}
                                className="flex gap-3 cursor-grab active:cursor-grabbing"
                            >
                                {/* Triplicate items for seamless looping */}
                                {[...galleryItems, ...galleryItems, ...galleryItems].map((item, idx) => (
                                    <GalleryItem key={`${item.id}-${idx}`} item={item} containerX={x} index={idx} />
                                ))}
                            </motion.div>
                        </div>
                        {/* Drag indicator */}
                        <div className="flex justify-center gap-1 mt-6">
                            <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent1/50"
                                    animate={{
                                        x: [-20, 20],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 mt-6">
                        <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                        <a href="https://x.com/AyushJena1504" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                            <Twitter size={18} />
                        </a>
                    </div>
                </motion.div>

                {/* Card 2: Philosophy/Interfaces */}
                <motion.div
                    className="bento-card p-6 md:p-8 flex flex-col justify-between min-h-[180px] relative overflow-hidden group/card"
                    custom={1}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover/card:opacity-30 transition-opacity duration-700">
                        <img src="/gallery/ai_face.jpg" className="w-full h-full object-cover grayscale brightness-125" alt="" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
                            <Sparkles size={12} className="text-accent1" />
                            <span>Detail-Driven UI</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                            Interfaces
                        </h3>
                        <p className="text-xl md:text-2xl font-serif italic text-accent1 mt-1">
                            you can feel.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                        {philosophyTags.map((tag, i) => (
                            <span
                                key={tag}
                                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all duration-500 ${activeTag === i
                                    ? 'bg-accent1 border-accent1 text-background'
                                    : 'border-white/10 text-secondary'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 relative z-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Philosophy ✦</p>
                        <p className="text-sm font-bold text-white mt-1">Micro-interactions</p>
                        <p className="text-xs text-secondary mt-1 leading-relaxed">
                            Subtle movement that confirms intent — never distracting.
                        </p>
                    </div>
                </motion.div>

                {/* Card 3: Connect / Available for Work */}
                <motion.div
                    className="bento-card p-6 md:p-8 flex flex-col justify-between row-span-2 min-h-[380px]"
                    custom={2}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Available badge */}
                    <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Available for work</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight uppercase">
                            Let's Build<br />Something
                        </h3>
                        <p className="text-xl font-serif italic text-secondary mt-1">
                            that actually works.
                        </p>
                    </div>

                    {/* Email */}
                    <div className="mt-6 space-y-3">
                        <div
                            onClick={handleCopyEmail}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent1/30 transition-colors">
                                <Copy size={12} className="text-secondary group-hover:text-accent1 transition-colors" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white font-serif italic">ahalyajena28@gmail.com</p>
                                <p className="text-[10px] text-secondary uppercase tracking-widest mt-0.5">
                                    {copied ? '✓ COPIED!' : 'TAP TO COPY EMAIL'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <a
                        href="mailto:ahalyajena28@gmail.com"
                        className="mt-6 w-full py-4 border border-white/20 rounded-xl text-center text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-background transition-all duration-500 flex items-center justify-center gap-2"
                    >
                        Connect Now
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>

                {/* Card 4: Clock Widget */}
                <motion.div
                    className="bento-card p-0 overflow-hidden flex items-center justify-center min-h-[200px] relative"
                    custom={3}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <AnalogClock />
                </motion.div>

                {/* Card 5: Founder Card */}
                <motion.div
                    className="bento-card md:col-span-2 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start min-h-[180px] relative overflow-hidden group/card"
                    custom={4}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="absolute inset-0 opacity-5 group-hover/card:opacity-10 transition-opacity duration-1000">
                        <img src="/gallery/abstract_gold.jpg" className="w-full h-full object-cover" alt="" />
                    </div>
                    {/* Globe Section */}
                    <div className="flex-1 space-y-4 relative z-10">
                        <p className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Available Globally</p>
                        <h3 className="text-xl font-heading font-bold text-white">
                            Adaptable across<br />time zones
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['🇬🇧 UK', '🇮🇳 India', '🇺🇸 USA'].map((zone, i) => (
                                <span
                                    key={zone}
                                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-500 ${i === 1
                                        ? 'bg-accent1/20 border-accent1/40 text-accent1'
                                        : 'border-white/10 text-secondary'
                                        }`}
                                >
                                    {zone}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Founder Info */}
                    <div className="flex-1 text-right space-y-3 relative z-10">
                        <div className="flex justify-end mb-4">
                            <div className="w-16 h-1 bg-accent1 rounded-full opacity-50" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
                            Creator of <span className="text-accent1 font-serif italic text-glow">SkillTwin</span>
                        </h3>
                        <p className="text-secondary text-sm italic flex items-center justify-end gap-2">
                            &lt; Crafting Digital Experiences /&gt;
                            <ArrowUpRight size={14} className="text-accent1" />
                        </p>
                    </div>
                </motion.div>

                {/* Card 6: Detail Card with I sweat spacing */}
                <motion.div
                    className="bento-card p-6 md:p-8 min-h-[120px] flex flex-col justify-center"
                    custom={5}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <p className="text-sm text-secondary leading-relaxed">
                        I sweat spacing, timing, and feedback —<br />
                        <span className="text-primary font-medium">the tiny stuff.</span>
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

// Analog Clock Component
const AnalogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update at 60fps for sweeping second hand
        let frame;
        const update = () => {
            setTime(new Date());
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, []);

    // IST offset
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (5.5 * 3600000));

    const seconds = ist.getSeconds();
    const ms = ist.getMilliseconds();
    const minutes = ist.getMinutes();
    const hours = ist.getHours();
    const date = ist.getDate();

    const secondDeg = (seconds + ms / 1000) * 6;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const hourDeg = ((hours % 12) + minutes / 60) * 30;

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#080808] min-h-[220px] select-none">
            {/* Outer Case / Bezel */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-br from-[#222] via-[#111] to-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_-2px_5px_rgba(255,255,255,0.1)]">

                {/* Watch Face */}
                <div className="relative w-full h-full rounded-full bg-[#0c0c0c] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,1)] border border-white/5">

                    {/* Radial Texture / Sunburst effect */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#fff_0%,_transparent_70%)]" />

                    {/* Minute Markers */}
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full"
                            style={{ transform: `rotate(${i * 6}deg)` }}
                        >
                            <div className={`absolute top-1.5 left-1/2 -translate-x-1/2 ${i % 5 === 0 ? 'w-[2px] h-3 bg-white/40' : 'w-[1px] h-1.5 bg-white/10'}`} />
                        </div>
                    ))}

                    {/* Date Window */}
                    <div className="absolute right-[22%] top-1/2 -translate-y-1/2 w-7 h-6 bg-[#111] border border-white/10 rounded flex items-center justify-center shadow-inner">
                        <span className="text-[10px] font-mono font-bold text-accent1">{date}</span>
                    </div>

                    {/* Branding */}
                    <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center">
                        <p className="text-[7px] font-black tracking-[0.3em] text-white/40 uppercase">Quartz</p>
                    </div>
                    <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center">
                        <p className="text-[6px] font-bold tracking-[0.1em] text-accent1/60 uppercase">Chronograph</p>
                    </div>

                    {/* Hour Hand */}
                    <motion.div
                        className="absolute bottom-1/2 left-1/2 w-[4px] h-[25%] bg-gradient-to-t from-white to-white/80 rounded-full origin-bottom z-20"
                        animate={{ rotate: hourDeg }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        style={{ x: "-50%", boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                    />

                    {/* Minute Hand */}
                    <motion.div
                        className="absolute bottom-1/2 left-1/2 w-[3px] h-[35%] bg-white/90 rounded-full origin-bottom z-30"
                        animate={{ rotate: minuteDeg }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        style={{ x: "-50%", boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                    />

                    {/* Second Hand (Sweeping) */}
                    <div
                        className="absolute bottom-1/2 left-1/2 w-[1.5px] h-[42%] bg-accent1 rounded-full origin-bottom z-40"
                        style={{
                            transform: `translateX(-50%) rotate(${secondDeg}deg)`,
                            boxShadow: '0 0 5px rgba(194,160,122,0.3)'
                        }}
                    >
                        {/* Counter-weight */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[1.5px] h-4 bg-accent1" />
                    </div>

                    {/* Center Pin / Cap */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1a1a1a] rounded-full z-50 shadow-lg border border-white/20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-accent1 rounded-full" />
                    </div>

                    {/* Glass Reflection Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                </div>
            </div>
        </div>
    );
};

// Gallery Item with 3D effects
const GalleryItem = ({ item, containerX, index }) => {
    const itemWidth = 140;
    const gap = 12;
    const offset = index * (itemWidth + gap);

    // Calculate relative position to container center (approx 450/2 = 225)
    const relativeX = useTransform(containerX, (val) => val + offset + itemWidth / 2);

    // 3D rotation based on position
    const rotateY = useTransform(relativeX, [0, 450], [15, -15]);
    const z = useTransform(relativeX, [0, 225, 450], [-100, 0, -100]);
    const scale = useTransform(relativeX, [0, 225, 450], [0.85, 1.05, 0.85]);
    const opacity = useTransform(relativeX, [-100, 50, 400, 550], [0.1, 1, 1, 0.1]);

    return (
        <motion.div
            style={{
                rotateY,
                z,
                scale,
                opacity,
                background: `linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`
            }}
            className="flex-shrink-0 w-[140px] aspect-[3/4] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden hover:border-white/20 transition-all group relative preserve-3d"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />

            {item.type === 'image' ? (
                <motion.img
                    src={item.content}
                    alt="Gallery item"
                    className="w-full h-full object-cover z-10 transition-all duration-700 scale-110 group-hover:scale-100"
                    style={{ rotateY: useTransform(rotateY, (r) => -r * 0.5) }} // Subtle parallax
                />
            ) : (
                <motion.span
                    className="text-4xl z-10 transition-all transform group-hover:scale-125 duration-700"
                    style={{ rotateY: useTransform(rotateY, (r) => -r) }} // Counter-rotate text for readability
                >
                    {item.content}
                </motion.span>
            )}

            {/* Glossy shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.div>
    );
};

export default BentoGrid;

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform, useSpring, useVelocity } from 'framer-motion';
import { MapPin, Github, Linkedin, Twitter, Copy, ArrowUpRight, Sparkles, Navigation } from 'lucide-react';

const MiniGear = ({ rotation }) => {
    const gearPath = useMemo(() => {
        const teeth = 16;
        const outerR = 45;
        const innerR = 35;
        const cx = 50, cy = 50;
        let points = [];
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

    return (
        <motion.svg viewBox="0 0 100 100" className="w-full h-full text-accent1" style={{ rotate: rotation }}>
            <path d={gearPath} fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                <line
                    key={angle}
                    x1="50" y1="50"
                    x2={50 + Math.cos(angle * Math.PI / 180) * 35}
                    y2={50 + Math.sin(angle * Math.PI / 180) * 35}
                    stroke="currentColor" strokeWidth="1" opacity="0.4"
                />
            ))}
        </motion.svg>
    );
};

const projectNames = ['SkillTwin', 'D-Liver', 'Agri Sahayak'];

const timezones = [
    { label: 'UK', flag: 'gb', tz: 'Europe/London', offset: 0 },
    { label: 'India', flag: 'in', tz: 'Asia/Kolkata', offset: 5.5 },
    { label: 'USA', flag: 'us', tz: 'America/New_York', offset: -5 },
];

const FounderCard = ({ cardVariants, selectedTimezone, onTimezoneChange }) => {
    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProject(prev => (prev + 1) % projectNames.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="bento-card md:col-span-2 p-6 md:p-8 md:pt-24 flex flex-col md:flex-row gap-6 md:gap-8 items-start min-h-[180px] relative overflow-hidden group/card"
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="relative z-50 flex-1 space-y-4">
                <p className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Available Globally</p>
                <h3 className="text-xl font-heading font-bold text-white">
                    Adaptable across<br />time zones
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {timezones.map((zone, i) => (
                        <button
                            key={zone.label}
                            onClick={() => onTimezoneChange(i)}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2 ${selectedTimezone === i
                                ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                : 'border-white/10 text-secondary hover:border-white/30'
                                }`}
                        >
                            <img src={`https://flagcdn.com/20x15/${zone.flag}.png`} alt={zone.label} className="w-4 h-3 rounded-[1px] object-cover" />
                            <span>{zone.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Founder Info */}
            <div className="relative z-50 flex-1 text-left md:text-right space-y-3">
                <div className="flex justify-start md:justify-end mb-4">
                    <div className="w-16 h-1 bg-accent1 rounded-full opacity-50" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-white md:whitespace-nowrap">
                    Creator of{' '}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeProject}
                            className="animated-gradient-text font-serif italic inline-block"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {projectNames[activeProject]}
                        </motion.span>
                    </AnimatePresence>
                </h3>
                <p className="text-secondary text-sm italic flex items-center justify-start md:justify-end gap-2">
                    &lt; Crafting Digital Experiences /&gt;
                    <ArrowUpRight size={14} className="text-accent1" />
                </p>
            </div>
        </motion.div>
    );
};

const BentoGrid = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [copied, setCopied] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState(1); // Default: India

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

        const quotes = useMemo(() => [
        { text: 'Be the change that you wish to see in the world.', author: 'Mahatma Gandhi' },
        { text: 'The only thing we have to fear is fear itself.', author: 'Franklin D. Roosevelt' },
        { text: "That's one small step for man, one giant leap for mankind.", author: 'Neil Armstrong' },
        { text: 'I think, therefore I am.', author: 'René Descartes' },
        { text: 'The unexamined life is not worth living.', author: 'Socrates' },
        { text: 'To be, or not to be, that is the question.', author: 'William Shakespeare' },
        { text: 'Knowledge is power.', author: 'Francis Bacon' },
        { text: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu' },
        { text: "Life is what happens when you're busy making other plans.", author: 'John Lennon' },
        { text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
        { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
        { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
        { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
        { text: 'If you judge people, you have no time to love them.', author: 'Mother Teresa' },
        { text: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey' },
        { text: 'Float like a butterfly, sting like a bee.', author: 'Muhammad Ali' },
        { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein' },
        { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
        { text: 'An eye for an eye makes the whole world blind.', author: 'Mahatma Gandhi' },
        { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
        { text: 'Genius is one percent inspiration and ninety-nine percent perspiration.', author: 'Thomas Edison' },
        { text: "If opportunity doesn't knock, build a door.", author: 'Milton Berle' },
        { text: "You miss 100% of the shots you don't take.", author: 'Wayne Gretzky' },
        { text: 'Everything you can imagine is real.', author: 'Pablo Picasso' },
        { text: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
        { text: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
        { text: 'The best revenge is massive success.', author: 'Frank Sinatra' },
        { text: 'What we think, we become.', author: 'Gautama Buddha' },
        { text: 'Happiness depends upon ourselves.', author: 'Aristotle' },
        { text: 'Where there is love there is life.', author: 'Mahatma Gandhi' },
        { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
        { text: 'Act as if what you do makes a difference. It does.', author: 'William James' },
        { text: "Dream as if you'll live forever.", author: 'James Dean' },
        { text: 'Everything has beauty, but not everyone sees it.', author: 'Confucius' },
        { text: 'Life is really simple, but we insist on making it complicated.', author: 'Confucius' },
        { text: "If you tell the truth, you don't have to remember anything.", author: 'Mark Twain' },
        { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
        { text: 'Make each day your masterpiece.', author: 'John Wooden' },
        { text: 'Turn your face to the sun and the shadows fall behind you.', author: 'Walt Whitman' },
        { text: 'Do one thing every day that scares you.', author: 'Eleanor Roosevelt' },
        { text: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt' },
        { text: 'Quality is not an act, it is a habit.', author: 'Aristotle' },
        { text: 'If you can dream it, you can do it.', author: 'Walt Disney' },
        { text: "Whether you think you can or you think you can't, you're right.", author: 'Henry Ford' },
        { text: "Everything you've ever wanted is on the other side of fear.", author: 'George Addair' },
        { text: 'Fortune favors the bold.', author: 'Virgil' },
        { text: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
        { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
        { text: 'To live is the rarest thing in the world.', author: 'Oscar Wilde' },
    ], []);

    const [currentQuote, setCurrentQuote] = useState(() => {
        const hour = new Date().getHours();
        return quotes[hour % quotes.length];
    });

    useEffect(() => {
        const updateQuote = () => {
            const hour = new Date().getHours();
            setCurrentQuote(quotes[hour % quotes.length]);
        };
        const now = new Date();
        const msUntilNextHour = (60 - now.getMinutes()) * 60000 - now.getSeconds() * 1000;
        const timeout = setTimeout(() => {
            updateQuote();
            const interval = setInterval(updateQuote, 3600000);
            return () => clearInterval(interval);
        }, msUntilNextHour);
        return () => clearTimeout(timeout);
    }, [quotes]);

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

    const [activeTag, setActiveTag] = useState(0);

    const galleryItems = [
        { id: 1, type: 'image', content: '/gallery/photo1.jpg', gradient: 'from-blue-600/20 to-indigo-600/10', imageScale: 1.3 },
        { id: 2, type: 'image', content: '/gallery/photo2.jpeg', gradient: 'from-purple-600/20 to-purple-800/10' },
        { id: 3, type: 'image', content: '/gallery/photo3.jpg', gradient: 'from-red-700/20 to-red-800/10' },
        { id: 4, type: 'image', content: '/gallery/photo4.jpg', gradient: 'from-green-600/20 to-emerald-600/10' },
        { id: 5, type: 'image', content: '/gallery/photo5.jpg', gradient: 'from-yellow-600/20 to-amber-600/10', objectPosition: 'right center' },
        { id: 6, type: 'image', content: '/gallery/photo6.png', gradient: 'from-pink-600/20 to-rose-600/10' },
        { id: 7, type: 'image', content: '/gallery/photo7.jpg', gradient: 'from-cyan-600/20 to-sky-600/10' },
        { id: 8, type: 'image', content: '/gallery/photo8.jpeg', gradient: 'from-orange-600/20 to-amber-600/20' },
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
    // 9 items * (140px + 12px gap) = 1368px
    const setWidth = 1368;

    const gearRotation = useMotionValue(0);
    const [hoverDir, setHoverDir] = useState(0);

    useAnimationFrame((t, delta) => {
        // Persistent auto-scroll
        const currentX = x.get();
        x.set(currentX - 0.6); // Slightly faster crawl for better feel

        if (currentX > 0) {
            x.set(currentX - setWidth);
        } else if (currentX < -setWidth) {
            x.set(currentX + setWidth);
        }

        // Gear rotation logic
        if (hoverDir !== 0) {
            gearRotation.set(gearRotation.get() + (hoverDir * 2));
        } else {
            gearRotation.set(gearRotation.get() + 0.4); // Slow idle rotation
        }
    });

    useEffect(() => {
        // Start with a slight offset to center the items better
        x.set(0);
    }, []);

    const philosophyItems = [
        {
            tag: 'Motion',
            title: 'Micro-interactions',
            description: 'Subtle movement that confirms intent — never distracting.',
            activeStyle: 'bg-violet-600/90 border-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
        },
        {
            tag: 'Type',
            title: 'Typography',
            description: 'Clean hierarchy and rhythm for effortless scanning.',
            activeStyle: 'bg-blue-600/90 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
        },
        {
            tag: 'Feedback',
            title: 'Responsiveness',
            description: 'Every hover, click, and focus gets a crisp response.',
            activeStyle: 'bg-emerald-600/90 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
        },
        {
            tag: 'Craft',
            title: 'Attention to detail',
            description: 'Polish lives in the edges: spacing, timing, and states.',
            activeStyle: 'bg-orange-500/90 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTag(prev => (prev + 1) % philosophyItems.length);
        }, 3000); // 3 seconds feels more premium
        return () => clearInterval(interval);
    }, [philosophyItems.length]);

    return (
        <section className="relative py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Crosshair Lines (Global) - Removed per user request */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto relative z-10">

                {/* Card 1: Profile Card */}
                <motion.div
                    className="bento-card p-6 md:p-8 md:pr-14 flex flex-col justify-between md:row-span-2 min-h-[380px] overflow-hidden"
                    custom={0}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div>
                        <h3 className="text-2xl font-serif italic font-normal tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Ayush Kumar <span style={{ fontFeatureSettings: '"ss01" 1' }}>J</span>ena
                        </h3>
                        <div className="flex items-center gap-2 mt-3 text-secondary text-xs">
                            <MapPin size={12} />
                            <span>Sambalpur, IN</span>
                            <span className="text-white/20 mx-1">•</span>
                            <span>{currentTime}</span>
                        </div>
                    </div>

                    <div className="mt-8 relative" style={{ perspective: '1200px' }}>
                        <div className="overflow-hidden" ref={containerRef}>
                            <motion.div
                                drag="x"
                                style={{ x, skewX: skew }}
                                dragConstraints={{ left: -setWidth * 2, right: 0 }}
                                className="flex gap-3 cursor-grab active:cursor-grabbing"
                            >
                                {/* Triplicate items for seamless looping */}
                                {[...galleryItems, ...galleryItems, ...galleryItems].map((item, idx) => (
                                    <GalleryItem key={`${item.id}-${idx}`} item={item} containerX={x} index={idx} />
                                ))}
                            </motion.div>
                        </div>
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
                    className="bento-card p-6 md:p-8 md:pb-24 flex flex-col justify-between min-h-[180px] relative overflow-hidden group/card"
                    custom={1}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 group/label">
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center p-1.5 bg-white/5 transition-all duration-500 group-hover/label:border-white/30 group-hover/label:bg-white/10">
                                <Navigation size={14} className="text-white/80 rotate-[315deg] group-hover/label:text-white transition-colors" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                Detail-Driven UI
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                            Interfaces
                        </h3>
                        <p className="text-xl md:text-2xl font-serif italic text-accent1 mt-1">
                            you can feel.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                        {philosophyItems.map((item, i) => (
                            <button
                                key={item.tag}
                                onClick={() => setActiveTag(i)}
                                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all duration-500 hover:scale-105 active:scale-95 ${activeTag === i
                                    ? item.activeStyle
                                    : 'border-white/10 text-secondary hover:border-white/30'
                                    }`}
                            >
                                {item.tag}
                            </button>
                        ))}
                    </div>

                    <div className="relative z-50 h-full flex flex-col justify-between">
                        <div className="mt-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Philosophy ✦</p>
                            <motion.div
                                key={activeTag}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-sm font-bold text-white mt-1">{philosophyItems[activeTag].title}</p>
                                <p className="text-xs text-secondary mt-1 leading-relaxed">
                                    {philosophyItems[activeTag].description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Card 3: Connect / Available for Work */}
                <motion.div
                    className="bento-card p-6 md:p-8 md:pl-14 flex flex-col justify-between md:row-span-2 min-h-[380px] group/available"
                    custom={2}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const y = e.clientY - rect.top;
                        setHoverDir(y < rect.height / 2 ? 1 : -1);
                    }}
                    onMouseLeave={() => setHoverDir(0)}
                >
                    {/* Available badge */}
                    <div className="flex items-center justify-between">
                        <div className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/available:border-accent1/30 transition-all duration-700">
                            <div className="absolute inset-0 bg-accent1/5 rounded-full blur-md opacity-0 group-hover/available:opacity-100 transition-opacity" />
                            <div className="w-7 h-7 relative z-10">
                                <MiniGear rotation={gearRotation} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 group-hover/available:bg-green-500/20 transition-all duration-300">
                            <div className="relative flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <motion.div
                                    className="absolute w-2 h-2 rounded-full bg-green-500"
                                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute w-2 h-2 rounded-full bg-green-500/50"
                                    animate={{ scale: [1, 3.5], opacity: [0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                />
                            </div>
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
                            <div className="flex flex-col group/email">
                                <motion.p
                                    className="text-sm font-bold text-white font-serif italic transition-all duration-300 group-hover:text-accent1 group-hover:drop-shadow-[0_0_10px_rgba(194,160,122,0.5)]"
                                    whileHover={{ x: 5 }}
                                >
                                    ahalyajena28@gmail.com
                                </motion.p>
                                <motion.p
                                    className="text-[10px] text-secondary uppercase tracking-widest mt-0.5 transition-all duration-300 group-hover:text-white/60 group-hover:translate-x-1"
                                >
                                    {copied ? '✓ COPIED!' : 'TAP TO COPY EMAIL'}
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <a
                        href="mailto:ahalyajena28@gmail.com"
                        className="mt-6 w-full py-4 bg-white border border-white rounded-xl text-center text-xs font-bold uppercase tracking-[0.2em] text-background hover:bg-gradient-to-r hover:from-[#ff4d4d] hover:via-[#f731db] hover:to-[#a855f7] hover:border-transparent hover:text-white active:scale-95 transition-all duration-500 flex items-center justify-center gap-2"
                    >
                        Connect Now
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>

                {/* Card 4: Junction Point (Floating Clock Bridge) */}
                <div className="relative min-h-[340px] md:min-h-0 md:h-full flex items-center justify-center z-30 pointer-events-none md:-mx-12 md:-my-7">
                    <div className="pointer-events-auto scale-90 md:scale-110 relative">
                        {/* THE CUTOUT EFFECT: Clean technical border instead of blur shadow */}
                        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[112%] h-[112%] rounded-full bg-[#030303] border border-white/10 z-0 shadow-[0_0_15px_rgba(0,0,0,1)]" />

                        <div className="relative z-10">
                            <AnalogClock timezone={timezones[selectedTimezone]} />
                        </div>
                    </div>
                </div>

                {/* Card 5: Founder Card */}
                <FounderCard cardVariants={cardVariants} selectedTimezone={selectedTimezone} onTimezoneChange={setSelectedTimezone} />

                {/* Card 6: Quote of the Day */}
                <motion.div
                    className="bento-card p-6 md:p-8 min-h-[140px] flex flex-col justify-center relative overflow-hidden group/quote"
                    custom={5}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >

                    <div className="relative z-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-accent1 font-bold mb-3">Quote of the Hour</p>
                        <p className="text-sm md:text-base text-white font-serif italic leading-relaxed">
                            "{currentQuote.text}"
                        </p>
                        <p className="text-[10px] text-secondary uppercase tracking-widest mt-3 font-bold">
                            — {currentQuote.author}
                        </p>
                    </div>
                </motion.div>

            </div >
        </section >
    );
};

// Analog Clock Component
const AnalogClock = ({ timezone }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let frame;
        const update = () => {
            setTime(new Date());
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, []);

    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const tzTime = new Date(utc + (timezone.offset * 3600000));

    const seconds = tzTime.getSeconds();
    const ms = tzTime.getMilliseconds();
    const minutes = tzTime.getMinutes();
    const hours = tzTime.getHours();

    const secondDeg = (seconds + ms / 1000) * 6;
    const minuteDeg = (minutes + seconds / 60) * 6;
    // 24-hour clock: full rotation = 24h, so each hour = 15deg
    const hourDeg = (hours + minutes / 60) * 15;

    // 24-hour numerals: 24,02,04,...,22 placed every 30deg (every 2 hours)
    const hourLabels = ['24','02','04','06','08','10','12','14','16','18','20','22'];

    return (
        <div className="relative select-none">
            {/* Outer dark ring */}
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_0_4px_#0d0d0d,0_0_0_7px_#2a2a2a,0_8px_32px_rgba(0,0,0,0.8)]">

                {/* Inner bezel gradient ring */}
                <div className="relative w-[92%] h-[92%] rounded-full bg-gradient-to-br from-[#2e2e2e] via-[#141414] to-[#323232] p-[2px] shadow-inner">

                    {/* Watch Face */}
                    <div className="relative w-full h-full rounded-full bg-[#060606] overflow-hidden">

                        {/* Minute tick marks */}
                        {[...Array(60)].map((_, i) => (
                            <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 6}deg)` }}>
                                {i % 5 === 0 ? (
                                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[3px] h-[14px] bg-white/90 rounded-[1px] shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                                ) : (
                                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[1.5px] h-[8px] bg-white/50" />
                                )}
                            </div>
                        ))}

                        {/* 24-hour numerals */}
                        {hourLabels.map((label, i) => {
                            const angleDeg = i * 30 - 90; // 0 = top, clockwise
                            const angleRad = (angleDeg * Math.PI) / 180;
                            const r = 42; // % radius
                            const x = 50 + r * Math.cos(angleRad);
                            const y = 50 + r * Math.sin(angleRad);
                            return (
                                <span
                                    key={label}
                                    className="absolute text-[9px] font-mono text-white/70 leading-none select-none"
                                    style={{
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        })}

                        {/* Hands */}
                        <div className="absolute inset-0 z-20">
                            {/* Hour Hand — wide sword blade */}
                            <motion.div
                                className="absolute bottom-1/2 left-1/2 origin-bottom"
                                animate={{ rotate: hourDeg }}
                                style={{ x: '-50%' }}
                            >
                                <svg width="10" height="70" viewBox="0 0 10 70" style={{ display: 'block', filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.25))' }}>
                                    <polygon points="5,0 10,12 10,70 0,70 0,12" fill="white" />
                                </svg>
                            </motion.div>

                            {/* Minute Hand — longer sword blade */}
                            <motion.div
                                className="absolute bottom-1/2 left-1/2 origin-bottom"
                                animate={{ rotate: minuteDeg }}
                                style={{ x: '-50%' }}
                            >
                                <svg width="9" height="95" viewBox="0 0 9 95" style={{ display: 'block', filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.25))' }}>
                                    <polygon points="4.5,0 9,10 9,95 0,95 0,10" fill="white" />
                                </svg>
                            </motion.div>

                            {/* Second Hand — thin red line with tail */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 origin-[50%_72%]"
                                style={{ rotate: secondDeg, x: '-50%', y: '-72%' }}
                            >
                                <svg width="3" height="120" viewBox="0 0 3 120" style={{ display: 'block', filter: 'drop-shadow(0 0 2px rgba(220,50,50,0.7))' }}>
                                    {/* tail (behind center): top 28% of svg = ~34px */}
                                    <rect x="1" y="0" width="1" height="34" rx="0.5" fill="#e03030" opacity="0.85" />
                                    {/* shaft (forward): rest */}
                                    <rect x="1" y="34" width="1" height="86" rx="0.5" fill="#e03030" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Center Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1c1c1c] rounded-full z-30 border border-white/20 shadow-[0_0_4px_rgba(0,0,0,0.8)]" />

                        {/* Subtle glare */}
                        <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.04] z-40" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Gallery Item - Clean Modern Cards
const GalleryItem = ({ item, containerX, index }) => {
    const itemWidth = 140;
    const gap = 12;
    const offset = index * (itemWidth + gap);

    // Calculate relative position to container center for basic effects
    const relativeX = useTransform(containerX, (val) => val + offset + itemWidth / 2);

    // Expanded visibility ranges for the scrolling gallery
    const scale = useTransform(relativeX, [-200, 150, 450], [0.95, 1, 0.95]);
    const opacity = useTransform(relativeX, [-300, 0, 500, 800], [0, 1, 1, 0]);

    return (
        <motion.div
            style={{
                scale,
                opacity,
                background: `rgba(255,255,255,0.03)`
            }}
            className="flex-shrink-0 w-[140px] aspect-[3/4] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden transition-all group relative"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

            {item.type === 'image' ? (
                <img
                    src={item.content}
                    alt="Gallery item"
                    className="w-full h-full object-cover z-10 transition-all duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.objectPosition || 'center', transform: item.imageScale ? `scale(${item.imageScale})` : undefined }}
                />
            ) : (
                <span className="text-4xl z-10 transition-all transform group-hover:scale-110 duration-700">
                    {item.content}
                </span>
            )}

            {/* Glossy shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.div>
    );
};

export default BentoGrid;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, Star, Users, Briefcase, GitBranch, GitCommit } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';
import GitHubActivity from '../components/GitHubActivity';
import { supabase } from '../supabaseClient';
import BehindCurtains from '../components/BehindCurtains';
import CTASection from '../components/CTASection';
import SkillsetSection from '../components/SkillsetSection';

const AboutPage = () => {
    const [githubUser, setGithubUser] = useState(null);
    const [githubEvents, setGithubEvents] = useState([]);
    const [guestbookAvatars, setGuestbookAvatars] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [leetcode, setLeetcode] = useState(null);

    useEffect(() => {
        const photoInterval = setInterval(() => {
            setPhotoIndex(prev => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(photoInterval);
    }, []);

    useEffect(() => {
        // Fetch User Profile
        fetch('https://api.github.com/users/ayushkumarjena15')
            .then(res => res.json())
            .then(data => setGithubUser(data))
            .catch(e => console.error(e));

        // Fetch Recent Events
        fetch('https://api.github.com/users/ayushkumarjena15/events/public')
            .then(res => res.json())
            .then(data => setGithubEvents(Array.isArray(data) ? data.slice(0, 3) : []))
            .catch(e => console.error(e));

        // Fetch LeetCode Stats
        fetch('https://leetcode-api-faisalshohag.vercel.app/R57Cb5EtNk')
            .then(res => res.json())
            .then(data => {
                const totalSub = data.matchedUserStats?.totalSubmissionNum?.[0]?.submissions || data.totalSubmissions?.[0]?.submissions || 0;
                const acSub = data.matchedUserStats?.acSubmissionNum?.[0]?.submissions || 0;
                const acceptanceRate = totalSub > 0 ? (acSub / totalSub) * 100 : null;
                setLeetcode({ ...data, acceptanceRate });
            })
            .catch(e => console.error(e));

        const fetchAvatars = async () => {
            const { data } = await supabase.from('guestbook').select('avatar_url').limit(4).order('created_at', { ascending: false });
            if (data) setGuestbookAvatars(data.map(d => d.avatar_url).filter(Boolean));
        };
        fetchAvatars();
    }, []);

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    };

    const latestPush = githubEvents.find(e => e.type === 'PushEvent') || githubEvents[0];

    const letterVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -90 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: 0.3 + i * 0.08,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    const titleLine1 = "ABOUT";
    const titleLine2 = "ME";

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-background text-white selection:bg-accent1/30 bg-grain"
        >
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 hero-glow opacity-50 pointer-events-none" />

                <div className="text-center z-10 w-full px-4 flex flex-col items-center">
                    <motion.h1
                        className="text-[14vw] md:text-[10vw] font-black leading-[0.8] tracking-[-0.02em] uppercase mb-6 drop-shadow-2xl flex flex-col items-center overflow-hidden w-full"
                        style={{ perspective: '600px' }}
                    >
                        <div className="flex justify-center w-full">
                            {titleLine1.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block"
                                    style={{ transformOrigin: 'bottom center', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                        <div className="flex justify-center w-full">
                            {titleLine2.split('').map((letter, i) => (
                                <motion.span
                                    key={i + titleLine1.length}
                                    custom={i + titleLine1.length}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block"
                                    style={{ transformOrigin: 'bottom center', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.h1>

                    <div className="flex flex-col items-center gap-4 mt-2">
                        <motion.p
                            className="text-secondary text-xs md:text-sm font-bold uppercase tracking-[0.5em] opacity-80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            Get to know more about
                        </motion.p>
                        <motion.h2
                            className="text-3xl md:text-6xl font-serif italic text-accent1 font-light lower-case"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            who i am.
                        </motion.h2>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 text-secondary/30 hidden md:block"
                >
                    <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent mx-auto" />
                </motion.div>

                <ScrollIndicator text="Scroll down to know more about me" />
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-24 pb-32">

                {/* Nice to Meet You Section */}
                <section className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1">A little about me</p>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                                Nice to meet you. <br />
                                I'm <span className="animated-gradient-text italic font-serif">Ayush</span>
                            </h1>
                        </div>

                        <div className="space-y-6 text-secondary text-lg md:text-xl leading-relaxed font-light">
                            <p>
                                I transform complex ideas into high-speed, scalable web products. As an engineering-driven developer, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
                            </p>
                            <p>
                                Beyond writing code, I understand the product lifecycle. As the founder of <span className="text-white font-bold italic">SkillTwin</span> and <span className="text-white font-bold italic">D-Liver</span>, I've learned firsthand how to build, ship, and scale meaningful products in a fast-paced environment.
                            </p>
                            <p>
                                My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
                            </p>
                        </div>

                        {/* Journey Timeline */}
                        <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-[0.4em] text-accent1/60 font-bold mb-5">EDUCATION</p>
                            <div className="relative pl-5 space-y-0">
                                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />
                                {[
                                    { label: 'B.Tech • Present', sub: 'CSE AI/ML | Gandhi Institute of Engineering and Technology University, Gunupur', active: true },
                                    { label: 'Class 12th • 2024', sub: 'PCM | Seven Hills Residential School, Sambalpur (CBSE)', done: true },
                                    { label: 'Class 10th • 2022', sub: 'Guru Nanak Public School, Sambalpur (CBSE)', done: true },
                                ].map((item, i) => (
                                    <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                                        <div className={`relative z-10 mt-1 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${item.active ? 'border-accent1 bg-accent1 shadow-[0_0_8px_2px] shadow-accent1/40' : 'border-white/40 bg-white/20'}`} />
                                        <div>
                                            <p className={`text-sm font-bold ${item.active ? 'text-accent1' : 'text-white/80'}`}>{item.label}</p>
                                            <p className="text-[11px] text-secondary mt-0.5">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-6 text-[18px] text-secondary">
                            <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={20} className="hover:text-white transition-colors cursor-pointer" />
                            </a>
                            <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer">
                                <Github size={20} className="hover:text-white transition-colors cursor-pointer" />
                            </a>
                            <a href="https://x.com/AyushJena1504" target="_blank" rel="noopener noreferrer">
                                <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
                            </a>
                        </div>
                        <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-white group">
                            Dive in deeper
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <ExternalLink size={14} />
                            </div>
                        </button>
                    </motion.div>

                    {/* Automatically Rotating 3D Photo Carousel */}
                    <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center overflow-visible" style={{ perspective: 1500 }}>
                        {[
                            {
                                src: "/profile.jpg",
                                alt: "Ayush Kumar Jena",
                                size: "w-[70vw] h-[400px] md:w-80 md:h-[480px]",
                                rounded: "rounded-[2rem] md:rounded-[2.5rem]"
                            },
                            {
                                src: "/gallery/photo4.jpeg",
                                alt: "Ayush in the mountains",
                                size: "w-[70vw] h-[400px] md:w-80 md:h-[480px]",
                                rounded: "rounded-[2rem] md:rounded-[2.5rem]"
                            },
                            {
                                src: "/gallery/photo5.jpeg",
                                alt: "Ayush hiking",
                                size: "w-[70vw] h-[400px] md:w-80 md:h-[480px]",
                                rounded: "rounded-[2rem] md:rounded-[2.5rem]"
                            }
                        ].map((photo, i) => {
                            const offset = (i - photoIndex + 3) % 3;
                            const isActive = offset === 0;
                            const isLeft = offset === 2;
                            const isRight = offset === 1;

                            return (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isLeft ? (window.innerWidth < 768 ? -80 : -160) : (window.innerWidth < 768 ? 80 : 160),
                                        z: isActive ? 200 : -100,
                                        rotateY: isActive ? 0 : isLeft ? 35 : -35,
                                        rotateX: isActive ? 0 : 5,
                                        opacity: isActive ? 1 : 0.4,
                                        scale: isActive ? 1.05 : 0.85,
                                        filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                                    }}
                                    whileHover={isActive ? { scale: 1.1, rotateY: 5 } : {}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 22,
                                        mass: 0.8,
                                        opacity: { duration: 0.5 }
                                    }}
                                    className={`absolute ${photo.size} ${photo.rounded} overflow-hidden border border-white/20 shadow-[-20px_40px_80px_rgba(0,0,0,0.8)] cursor-pointer bg-surface`}
                                    style={{
                                        zIndex: isActive ? 30 : 10,
                                        transformStyle: 'preserve-3d'
                                    }}
                                    onClick={() => setPhotoIndex(i)}
                                >
                                    <img
                                        src={photo.src}
                                        className="w-full h-full object-cover transition-all duration-1000"
                                        alt={photo.alt}
                                    />
                                    {/* Overlay for inactive photos */}
                                    <div className={`absolute inset-0 bg-background/20 transition-opacity duration-1000 ${isActive ? 'opacity-0' : 'opacity-60'}`} />
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Skillset Section */}
                <SkillsetSection />

                {/* Interests & Extracurriculars Section */}
                <section className="space-y-24">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Hobbies */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1/60">Beyond the screen</p>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                                    My <span className="animated-gradient-text italic font-serif">Hobbies</span>
                                </h2>
                                <p className="text-secondary text-lg font-light leading-relaxed max-w-xl">
                                    When I'm not coding, I'm in the pool, cutting a video, animating with Framer Motion, or experimenting in the kitchen — creativity runs across everything I do.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Swimming", desc: "Finding focus and calm in the water — my reset button away from screens.", img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80" },
                                    { title: "Video Editing", desc: "Crafting compelling visual stories through cuts, transitions, and motion.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80" },
                                    { title: "Framer Motion", desc: "Building fluid, expressive animations and interactions that bring UI to life.", img: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=800&q=80" },
                                    { title: "Cooking", desc: "Experimenting with flavours and recipes — because great food, like great code, is all about the right ingredients.", img: "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?w=800&q=80" }
                                ].map((hobby, i) => (
                                    <div key={i} className="relative rounded-[2rem] overflow-hidden border border-white/5 h-36 flex items-end group">
                                        <img src={hobby.img} alt={hobby.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                        <div className="relative z-10 p-6">
                                            <h3 className="text-white text-lg font-bold font-heading italic">{hobby.title}</h3>
                                            <p className="text-secondary text-xs leading-relaxed font-light">{hobby.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Extracurriculars */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1/60">Community & Impact</p>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                                    <span className="animated-gradient-text italic font-serif">Extracurricular</span> Activities
                                </h2>
                                <p className="text-secondary text-lg font-light leading-relaxed max-w-xl">
                                    From competing in hackathons to anchoring stages and organising community events — I thrive beyond the screen as much as behind it.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Hackathon Enthusiast", desc: "Competed in and won multiple hackathons, building solutions aimed at creating meaningful world impact.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" },
                                    { title: "Stage Anchor", desc: "Anchored major college tech fests, cultural events, and student summit panels — commanding the stage with confidence and clarity.", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80" },
                                    { title: "Community Organiser", desc: "Organised technical workshops, coding sprints, and knowledge-sharing sessions at GIETU, nurturing a culture of building in public.", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80" }
                                ].map((act, i) => (
                                    <div key={i} className="relative rounded-[2rem] overflow-hidden border border-white/5 h-36 flex items-end group">
                                        <img src={act.img} alt={act.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                        <div className="relative z-10 p-6">
                                            <h3 className="text-white text-lg font-bold font-heading italic">{act.title}</h3>
                                            <p className="text-secondary text-sm leading-relaxed font-light">{act.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Live GitHub Section */}
                <section className="space-y-20">
                    <div className="text-center space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1/60">My code journey</p>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
                            GitHub <span className="animated-gradient-text italic font-serif">Live</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {/* Live Profile Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 bg-surface/5 border border-white/5 flex flex-col justify-center h-[450px]"
                        >
                            {githubUser ? (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <img src={githubUser.avatar_url} alt="GitHub Avatar" className="w-24 h-24 rounded-full border-2 border-accent1/50 shadow-xl shadow-accent1/20" />
                                        <div>
                                            <h3 className="text-3xl font-bold font-serif italic text-white">{githubUser.name || githubUser.login}</h3>
                                            <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="text-accent1 hover:text-white transition-colors text-sm font-mono flex items-center gap-2 mt-2">
                                                @{githubUser.login} <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-secondary/90 text-sm leading-relaxed max-w-sm">
                                        {githubUser.bio || "Building things that matter on the internet."}
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10">
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-secondary flex items-center gap-2"><Briefcase size={12} className="text-accent1" /> Repos</p>
                                            <p className="text-2xl font-mono text-white tracking-tighter">{githubUser.public_repos}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-secondary flex items-center gap-2"><Users size={12} className="text-accent1" /> Followers</p>
                                            <p className="text-2xl font-mono text-white tracking-tighter">{githubUser.followers}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-secondary flex items-center gap-2"><Star size={12} className="text-accent1" /> Following</p>
                                            <p className="text-2xl font-mono text-white tracking-tighter">{githubUser.following}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-secondary gap-6 animate-pulse">
                                    <Github size={48} className="opacity-50 text-accent1" />
                                    <p className="text-xs uppercase tracking-[0.3em] font-black">Connecting to GitHub...</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Recent Activity Feed */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 bg-surface/5 border border-white/5 flex flex-col h-[450px] overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                <div className="flex items-center gap-4 text-white">
                                    <GitBranch size={24} className="text-accent1" />
                                    <h3 className="text-xl font-bold font-serif italic">Terminal Activity</h3>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div> Live
                                </span>
                            </div>

                            <div className="space-y-6 flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {githubEvents.length > 0 ? (
                                    githubEvents.map((event, i) => (
                                        <div key={i} className="flex gap-5 group">
                                            <div className="mt-1 flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:bg-accent1/20 transition-colors shadow-lg">
                                                    {event.type === 'PushEvent' ? <GitCommit size={16} className="text-accent1" /> : <Star size={16} className="text-accent2" />}
                                                </div>
                                                {i !== githubEvents.length - 1 && <div className="w-[1px] h-full bg-white/5 my-1"></div>}
                                            </div>
                                            <div className="space-y-2 pb-6">
                                                <p className="text-sm font-medium leading-snug">
                                                    <span className="text-white capitalize font-bold">{event.type.replace('Event', '')}</span> to {' '}
                                                    <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer" className="text-accent1 hover:text-white transition-colors underline decoration-accent1/30 underline-offset-4 font-mono">
                                                        {event.repo.name.split('/')[1]}
                                                    </a>
                                                </p>
                                                <p className="text-[10px] text-secondary/60 font-mono tracking-wider uppercase">
                                                    {new Date(event.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                </p>
                                                {event.payload.commits && event.payload.commits[0] && (
                                                    <div className="mt-3 bg-surface/40 p-3 rounded-xl border border-white/5 backdrop-blur-sm group-hover:border-white/10 transition-colors">
                                                        <p className="text-xs text-secondary font-mono truncate max-w-[200px] sm:max-w-[250px]">
                                                            "{event.payload.commits[0].message}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-secondary/50 space-y-4">
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                                            <GitCommit size={20} />
                                        </div>
                                        <p className="text-xs uppercase tracking-widest font-black">Tracking Signals...</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* GitHub Streak Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 bg-surface/5 border border-white/5 flex flex-col justify-center h-[450px] overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                <div className="flex items-center gap-4 text-white">
                                    <Star size={24} className="text-accent1" />
                                    <h3 className="text-xl font-bold font-serif italic">Contribution Streak</h3>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <img
                                    src="https://github-readme-streak-stats.herokuapp.com/?user=ayushkumarjena15&theme=transparent&hide_border=true&stroke=FF6B00&ring=FF6B00&fire=FF4500&currStreakNum=e7e5e4&sideNums=e7e5e4&sideLabels=a8a29e&dates=a8a29e"
                                    alt="GitHub Streak"
                                    className="w-full h-auto object-contain scale-[1.10]"
                                />
                            </div>
                        </motion.div>

                        {/* LeetCode Stats Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 bg-surface/5 border border-white/5 flex flex-col justify-center h-[450px] overflow-hidden"
                        >
                            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                <Star size={24} className="text-accent1" />
                                <h3 className="text-xl font-bold font-serif italic text-white">LeetCode Stats</h3>
                            </div>
                            {leetcode ? (
                                <div className="flex-1 flex flex-col justify-center gap-6">
                                    {/* Total solved ring */}
                                    <div className="flex items-center justify-center gap-6">
                                        <div className="relative flex items-center justify-center w-28 h-28">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
                                                <circle cx="50" cy="50" r="42" fill="none" stroke="#FF6B00" strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${(leetcode.totalSolved / leetcode.totalQuestions) * 264} 264`}/>
                                            </svg>
                                            <div className="text-center z-10">
                                                <div className="text-2xl font-black text-white">{leetcode.totalSolved}</div>
                                                <div className="text-[10px] text-secondary">Solved</div>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <div className="text-secondary text-xs">of {leetcode.totalQuestions} total</div>
                                            <div className="text-secondary text-xs">Rank <span className="text-white font-bold">#{leetcode.ranking?.toLocaleString()}</span></div>
                                            <div className="text-secondary text-xs">Acceptance <span className="text-white font-bold">{leetcode.acceptanceRate?.toFixed(1)}%</span></div>
                                        </div>
                                    </div>
                                    {/* Difficulty breakdown */}
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Easy', solved: leetcode.easySolved, total: leetcode.totalEasy, color: '#00b8a3' },
                                            { label: 'Medium', solved: leetcode.mediumSolved, total: leetcode.totalMedium, color: '#ffc01e' },
                                            { label: 'Hard', solved: leetcode.hardSolved, total: leetcode.totalHard, color: '#ff375f' },
                                        ].map(({ label, solved, total, color }) => (
                                            <div key={label} className="flex items-center gap-3">
                                                <span className="text-xs w-14 font-bold" style={{ color }}>{label}</span>
                                                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${(solved / total) * 100}%`, backgroundColor: color }}/>
                                                </div>
                                                <span className="text-xs text-secondary w-14 text-right">{solved}/{total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-secondary text-sm">Loading...</div>
                            )}
                        </motion.div>
                    </div>
                </section>

                <GitHubActivity />

                <BehindCurtains />

                <CTASection />
            </div>
        </motion.main >
    );
};

export default AboutPage;


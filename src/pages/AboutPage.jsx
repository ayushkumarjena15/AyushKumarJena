import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, Music, PenTool, Layout, Box, Star, Users, Briefcase, GitBranch, GitCommit } from 'lucide-react';
import ScrollIndicator from '../components/ScrollIndicator';

const AboutPage = () => {
    const [githubUser, setGithubUser] = useState(null);
    const [githubEvents, setGithubEvents] = useState([]);

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
    }, []);

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
                        className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-[-0.02em] uppercase mb-6 drop-shadow-2xl flex flex-col items-center overflow-hidden w-full"
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
                            className="text-4xl md:text-6xl font-serif italic text-accent1 font-light lower-case"
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
            <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-48 pb-32">

                {/* Nice to Meet You Section */}
                <section className="grid lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1">A little about me</p>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                                Nice to meet you. <br />
                                I'm <span className="text-gradient italic font-serif">Ayush</span>
                            </h2>
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

                    {/* Stacked Photos */}
                    <div className="relative h-[600px] flex items-center justify-center" style={{ perspective: 1200 }}>
                        <motion.div
                            initial={{ rotate: -5, x: -20, opacity: 0 }}
                            whileInView={{ rotate: -8, x: -40, opacity: 1 }}
                            whileHover={{ rotate: -10, x: -50, scale: 1.05 }}
                            viewport={{ once: true }}
                            className="absolute w-72 h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 bg-surface/20 backdrop-blur-sm cursor-pointer transition-all duration-300"
                        >
                            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover grayscale opacity-50" alt="Tech" />
                        </motion.div>
                        <motion.div
                            initial={{ rotate: 5, x: 20, opacity: 0 }}
                            whileInView={{ rotate: 8, x: 40, opacity: 1 }}
                            whileHover={{ rotate: 10, x: 50, scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="absolute w-72 h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-0 bg-surface/20 backdrop-blur-sm cursor-pointer transition-all duration-300"
                        >
                            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover grayscale opacity-30" alt="Coding" />
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ rotateY: 180, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            viewport={{ once: true }}
                            className="relative w-80 h-[480px] rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.6)] z-20 cursor-pointer"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <motion.div
                                className="w-full h-full absolute inset-0 bg-surface border-white/10"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img src="/profile.jpg" className="w-full h-full object-cover" alt="Ayush Kumar Jena" />
                            </motion.div>

                            <motion.div
                                className="w-full h-full absolute inset-0 bg-surface flex items-center justify-center border border-white/10 rounded-[2.5rem]"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="text-center space-y-4 p-6">
                                    <div className="w-20 h-20 mx-auto rounded-full border border-white/20 overflow-hidden mb-4 p-2 bg-white/5">
                                        <div className="w-full h-full bg-accent1/20 rounded-full flex items-center justify-center">
                                            <Github size={32} className="text-accent1" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold font-serif italic text-white">@ayushkumarjena15</h3>
                                    <p className="text-xs text-secondary font-mono">Building intelligent systems</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Behind the Curtains */}
                <section>
                    <div className="text-center mb-24 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1/60">Behind the curtains</p>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
                            Decoding logic <br />
                            <span className="text-gradient italic font-serif">&& the lyrics</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* GitHub Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="col-span-1 glass-card p-10 bg-surface/10 border border-white/5 flex flex-col justify-between h-[450px]"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-accent1">
                                    <Github size={32} />
                                    <span className="font-serif italic text-xl">Ayush's Github</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Latest Push • 4h ago</p>
                                    <p className="text-lg font-medium leading-relaxed">
                                        "Refactor core architecture for improved scalability and resilience"
                                    </p>
                                    <p className="text-xs text-secondary font-mono">Repo: <span className="text-accent1 cursor-pointer hover:underline">Private work</span></p>
                                </div>
                            </div>
                            <div className="flex gap-6 text-[18px] text-secondary/50">
                                <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer">
                                    <Github size={20} className="hover:text-white transition-colors cursor-pointer" />
                                </a>
                                <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/" target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={20} className="hover:text-white transition-colors cursor-pointer" />
                                </a>
                                <a href="https://x.com/AyushJena1504" target="_blank" rel="noopener noreferrer">
                                    <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Guestbook/Signature Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="col-span-1 glass-card p-10 bg-surface/10 border border-white/5 flex flex-col justify-between h-[450px]"
                        >
                            <div className="space-y-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Visitors</p>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    Leave your <br />
                                    <span className="text-gradient italic font-serif">signature</span>
                                </h1>
                                <p className="text-secondary text-sm">Let me know you were here.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface/40 overflow-hidden" />
                                    ))}
                                    <div className="flex items-center px-4 text-[10px] font-black text-secondary">Join others</div>
                                </div>
                                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-accent1 transition-colors flex items-center justify-center gap-2 group">
                                    Sign Guestbook
                                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Spotify Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="col-span-1 glass-card relative overflow-hidden bg-surface/10 border border-white/5 h-[450px] group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                                alt="Music"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                            <div className="relative p-10 h-full flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-green-500">
                                        <Music size={24} />
                                        <span className="font-bold uppercase tracking-widest text-[10px]">Last Played</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-secondary leading-relaxed">I recently listened to <span className="text-white font-bold">Bargad</span> by <span className="text-white font-bold">sufr ft Arpit Bala, toorjo dey</span>.</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md animate-spin-slow">
                                        <div className="w-12 h-12 rounded-full bg-accent1 flex items-center justify-center">
                                            <Music size={20} className="text-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Live GitHub Section */}
                <section className="space-y-20">
                    <div className="text-center space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent1/60">My code journey</p>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
                            GitHub <span className="text-gradient italic font-serif">Live</span>
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
                                <span className="text-[10px] font-black uppercase tracking-widest text-accent1 animate-pulse flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent1"></div> Live
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
                                    src="https://github-readme-streak-stats.herokuapp.com/?user=ayushkumarjena15&theme=transparent&hide_border=true&stroke=c2a07a&ring=c2a07a&fire=c2a07a&currStreakNum=e7e5e4&sideNums=e7e5e4&sideLabels=a8a29e&dates=a8a29e"
                                    alt="GitHub Streak"
                                    className="w-full h-auto object-contain scale-[1.10]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Bottom Call to Action */}
                <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-white/5 bg-surface/5 group">
                    <div className="absolute inset-0 hero-glow opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center z-10 space-y-12"
                    >
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden">
                                <img src="/profile.jpg" className="w-full h-full object-cover filter grayscale" alt="Profile" />
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                                Let's create <br /> something real.
                            </h2>
                        </div>
                        <div className="flex justify-center h-20">
                            <div className="relative w-20 h-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border border-white/10 rounded-full border-dashed"
                                />
                                <div className="absolute inset-4 rounded-full bg-accent1 blur-xl opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-accent1 rounded-full shadow-[0_0_15px_rgba(194,160,122,0.8)]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </motion.main >
    );
};

export default AboutPage;


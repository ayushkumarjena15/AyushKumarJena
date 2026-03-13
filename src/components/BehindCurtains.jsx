import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Music, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import shivOfficial from '../assets/shiv_official.png';

const BehindCurtains = () => {
    const [guestbookAvatars, setGuestbookAvatars] = useState([]);
    const [githubUser, setGithubUser] = useState(null);
    const [latestEvent, setLatestEvent] = useState(null);
    const [spotifyTrack, setSpotifyTrack] = useState(null);
    const [spotifyLoaded, setSpotifyLoaded] = useState(false);

    useEffect(() => {
        // Fetch User Profile
        fetch('https://api.github.com/users/ayushkumarjena15')
            .then(res => res.json())
            .then(data => setGithubUser(data))
            .catch(e => console.error(e));

        // Fetch Recent Events
        fetch('https://api.github.com/users/ayushkumarjena15/events/public')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setLatestEvent(data[0]);
                }
            })
            .catch(e => console.error(e));

        const fetchAvatars = async () => {
            const { data } = await supabase.from('guestbook').select('avatar_url').limit(3).order('created_at', { ascending: false });
            if (data) setGuestbookAvatars(data.map(d => d.avatar_url).filter(Boolean));
        };
        fetchAvatars();

        // Fetch Last.fm now playing
        const fetchMusic = async () => {
            try {
                const res = await fetch('/api/now-playing');
                if (!res.ok) throw new Error('Network response was not ok');
                
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                
                const data = await res.json();
                if (data && !data.error) {
                    setSpotifyTrack(data);
                }
            } catch (e) {
                // Silently fail in dev if /api/now-playing is not served as JSON
                // This prevents "SyntaxError: Unexpected token" when Vite serves JS/HTML instead of JSON
                console.log('Music status currently unavailable');
            } finally {
                setSpotifyLoaded(true);
            }
        };

        fetchMusic();
        const musicInterval = setInterval(fetchMusic, 30000);
        return () => clearInterval(musicInterval);
    }, []);

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now - past;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMins / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) return `${diffInDays}d ago`;
        if (diffInHours > 0) return `${diffInHours}h ago`;
        if (diffInMins > 0) return `${diffInMins}m ago`;
        return 'just now';
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            {/* Header */}
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-[11px] uppercase tracking-[0.4em] text-secondary font-bold mb-4">
                    Behind the Curtains
                </p>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white">
                    <span className="font-serif italic">Decoding logic</span>
                </h2>
                <h2 className="text-3xl md:text-4xl font-heading font-black mt-2">
                    <span className="bg-clip-text text-transparent font-serif italic animated-gradient-text">
                        && the lyrics
                    </span>
                </h2>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* GitHub Card */}
                <motion.div
                    className="bento-card p-8 flex flex-col justify-between min-h-[320px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Github size={24} className="text-white" />
                            <h3 className="text-xl font-heading font-bold text-white">
                                Ayush's <span className="font-serif italic text-accent2">Github</span>
                            </h3>
                        </div>
                        {githubUser && (
                            <img src={githubUser.avatar_url} alt="Profile" className="w-8 h-8 rounded-full border border-white/10" />
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-secondary uppercase tracking-wider font-bold">Latest Activity</span>
                            {latestEvent && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full font-bold flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                                    {getTimeAgo(latestEvent.created_at)}
                                </span>
                            )}
                        </div>

                        {latestEvent ? (
                            <div className="space-y-2">
                                <p className="text-primary text-sm leading-relaxed font-light line-clamp-2 italic">
                                    {latestEvent.type === 'PushEvent' && latestEvent.payload.commits?.[0]
                                        ? `"${latestEvent.payload.commits[0].message}"`
                                        : `${latestEvent.type.replace('Event', '')} in ${latestEvent.repo.name.split('/')[1]}`}
                                </p>
                                <p className="text-[10px] text-secondary font-mono tracking-wider">
                                    REPO: <span className="text-accent1">{latestEvent.repo.name.split('/')[1]}</span>
                                </p>
                            </div>
                        ) : (
                            <div className="animate-pulse space-y-2">
                                <div className="h-4 bg-white/5 rounded w-3/4"></div>
                                <div className="h-4 bg-white/5 rounded w-1/2"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://x.com/AyushJena1504" className="text-secondary hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div>
                        <a href="https://github.com/ayushkumarjena15" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-accent1 flex items-center gap-1 hover:text-white transition-colors">
                            View Profile <ExternalLink size={10} />
                        </a>
                    </div>
                </motion.div>

                {/* Guestbook Card */}
                <motion.div
                    className="bento-card p-8 flex flex-col justify-between min-h-[280px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold mb-4">Visitors</p>
                        <h3 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight">
                            Leave your
                        </h3>
                        <p className="text-2xl md:text-3xl font-serif italic bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mt-1">
                            signature.
                        </p>
                    </div>

                    <p className="text-secondary text-sm mt-4">
                        Let me know you were here.
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {guestbookAvatars.length > 0 ? (
                                    guestbookAvatars.map((url, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-[#1a1a1a]">
                                            <img src={url} alt="Guest" className="w-full h-full object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    ['🧑‍💻', '👩‍💻', '👨‍💻'].map((emoji, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center text-[10px]">
                                            {emoji}
                                        </div>
                                    ))
                                )}
                            </div>
                            <span className="text-[10px] text-secondary ml-2 uppercase tracking-widest font-bold">Join others</span>
                        </div>

                        <Link
                            to="/guestbook"
                            className="relative group h-10 px-6 rounded-full overflow-hidden transition-all duration-500"
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d4d] via-[#f731db] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-500 rounded-full" />

                            {/* Content Wrapper */}
                            <div className="relative flex items-center justify-center gap-2 h-full">
                                <span className="text-black group-hover:text-white font-black text-[10px] uppercase tracking-widest transition-colors duration-300">Sign Guestbook</span>
                                <ArrowRight size={12} className="text-black group-hover:text-white transition-colors duration-300" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Spotify / Last Played Card */}
                <motion.div
                    className="bento-card p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden !bg-transparent !backdrop-blur-none"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Album art background */}
                    <motion.div
                        key={spotifyTrack?.albumArt || 'default'}
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {spotifyTrack?.albumArt ? (
                            <img
                                src={spotifyTrack.albumArt}
                                alt=""
                                className="w-full h-full object-cover scale-110"
                                style={{ filter: 'blur(6px) brightness(0.55) saturate(1.6)' }}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-900/40 via-black to-purple-900/30" />
                        )}
                    </motion.div>
                    {/* Ambient glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl pointer-events-none z-[1]" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-[1]" />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#1DB954] flex items-center justify-center shadow-md shadow-green-500/40">
                                <Music size={13} className="text-white" />
                            </div>
                            <h3 className="text-sm font-heading font-bold text-white tracking-wide">
                                {spotifyTrack?.isPlaying ? 'Now Playing' : 'Listening to'}
                            </h3>
                        </div>
                        {/* Animated equalizer */}
                        <div className="flex items-end gap-[3px] h-5">
                            {[6, 12, 8, 14, 7, 10, 5].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-[3px] bg-[#1DB954] rounded-full"
                                    animate={spotifyTrack?.isPlaying ? { scaleY: [1, 2.2, 0.7, 1.8, 1] } : { scaleY: 1 }}
                                    transition={{
                                        duration: 1.1 + i * 0.13,
                                        repeat: spotifyTrack?.isPlaying ? Infinity : 0,
                                        ease: 'easeInOut',
                                        delay: i * 0.07,
                                    }}
                                    style={{ height: `${h}px`, transformOrigin: 'bottom' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Album art + song info */}
                    {spotifyTrack ? (
                        <a
                            href={spotifyTrack.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 items-center relative z-10 group cursor-pointer"
                        >
                            {/* Album art container */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="w-[80px] h-[80px] rounded-2xl overflow-hidden relative shadow-xl border border-white/[0.08] z-10 bg-[#0a0a0a]"
                                    whileHover={{ scale: 1.04 }}
                                >
                                    {spotifyTrack.albumArt ? (
                                        <img
                                            src={spotifyTrack.albumArt}
                                            alt={spotifyTrack.album}
                                            className="w-full h-full object-cover scale-[1.05]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#1a3320] via-[#0d1f14] to-[#0a1a0f] flex items-center justify-center">
                                            {/* Spotify logo */}
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="#1DB954">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                        </div>
                                    )}
                                </motion.div>

                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#111] flex items-center justify-center z-20 bg-white/10">
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-[#1DB954] rounded-full"
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </div>
                            </div>

                            {/* Song info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] text-[#1DB954] uppercase tracking-[0.3em] font-bold mb-1">
                                    {spotifyTrack.isPlaying
                                        ? '● Now Playing'
                                        : spotifyTrack.playedAt
                                            ? `Last played · ${getTimeAgo(spotifyTrack.playedAt)}`
                                            : 'Recently Played'}
                                </p>
                                <h4 className="text-white font-bold text-base leading-tight truncate group-hover:text-accent1 transition-colors">{spotifyTrack.title}</h4>
                                <p className="text-secondary text-xs mt-0.5 truncate">{spotifyTrack.artist}</p>
                                <p className="text-white/20 text-[9px] mt-0.5 truncate font-mono">{spotifyTrack.album}</p>
                            </div>
                        </a>
                    ) : spotifyLoaded ? (
                        <div className="flex gap-4 items-center pl-1">
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold mb-1">Status</p>
                                <p className="text-white/50 text-sm leading-snug italic">Synced with Last.fm...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold mb-1">Status</p>
                                <p className="text-white/50 text-sm leading-snug animate-pulse">Initializing music stream...</p>
                            </div>
                        </div>
                    )}

                    {/* Status label */}
                    <div className="mt-5 relative z-10 flex justify-between items-center text-[10px] font-mono text-white/40 px-1">
                        <span>{spotifyTrack?.isPlaying ? 'LIVE' : 'REC'}</span>
                        <a
                            href={spotifyTrack?.songUrl || "https://www.last.fm/user/ayush099"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-white/25 hover:text-[#1DB954] transition-colors font-mono tracking-wider"
                        >
                            spotify
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BehindCurtains;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Music, GitCommit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

const BehindCurtains = () => {
    const [guestbookAvatars, setGuestbookAvatars] = useState([]);
    const [githubUser, setGithubUser] = useState(null);
    const [latestEvent, setLatestEvent] = useState(null);
    const [lastfmTrack, setLastfmTrack] = useState(null);
    const [lastfmLoaded, setLastfmLoaded] = useState(false);

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

        // Fetch Last.fm recent track
        const fetchLastfm = async () => {
            try {
                const res = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
                );
                const json = await res.json();
                const track = json?.recenttracks?.track?.[0];
                if (track) {
                    setLastfmTrack({
                        name: track.name,
                        artist: track.artist?.['#text'],
                        album: track.album?.['#text'],
                        image: track.image?.find(img => img.size === 'large')?.['#text'] || '',
                        nowPlaying: !!track['@attr']?.nowplaying,
                        date: track.date?.['#text'] || null,
                    });
                }
                setLastfmLoaded(true);
            } catch (e) {
                console.error(e);
                setLastfmLoaded(true);
            }
        };
        fetchLastfm();
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
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            {/* Header */}
            <motion.div
                className="text-center mb-16"
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
                    <span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-serif italic">
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

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
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

                        <Link to="/guestbook" className="px-5 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-accent1 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/5">
                            Sign Guestbook
                            <ArrowRight size={12} />
                        </Link>
                    </div>
                </motion.div>

                {/* Spotify / Last Played Card */}
                <motion.div
                    className="bento-card p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {/* Ambient glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5 relative">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#d51007] flex items-center justify-center shadow-md shadow-red-500/40">
                                <Music size={13} className="text-white" />
                            </div>
                            <h3 className="text-sm font-heading font-bold text-white tracking-wide">
                                {lastfmTrack?.nowPlaying ? 'Now Playing' : 'Last Played'}
                            </h3>
                        </div>
                        {/* Animated equalizer — pulses when now playing, static when not */}
                        <div className="flex items-end gap-[3px] h-5">
                            {[6, 12, 8, 14, 7, 10, 5].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-[3px] bg-[#d51007] rounded-full"
                                    animate={lastfmTrack?.nowPlaying ? { scaleY: [1, 2.2, 0.7, 1.8, 1] } : { scaleY: 1 }}
                                    transition={{
                                        duration: 1.1 + i * 0.13,
                                        repeat: lastfmTrack?.nowPlaying ? Infinity : 0,
                                        ease: 'easeInOut',
                                        delay: i * 0.07,
                                    }}
                                    style={{ height: `${h}px`, transformOrigin: 'bottom' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Album art + song info */}
                    {lastfmTrack ? (
                        <div className="flex gap-4 items-center relative">
                            {/* Album art */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="w-[76px] h-[76px] rounded-2xl overflow-hidden relative shadow-xl border border-white/[0.07]"
                                    whileHover={{ scale: 1.04 }}
                                >
                                    {lastfmTrack.image ? (
                                        <img src={lastfmTrack.image} alt={lastfmTrack.album} className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <div className="w-full h-full bg-gradient-to-br from-[#2a1a5e] via-[#1a1040] to-[#0d0825]" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl">🎵</span>
                                            </div>
                                        </>
                                    )}
                                    {/* Spinning overlay when now playing */}
                                    {lastfmTrack.nowPlaying && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl border-2 border-[#d51007]/40"
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>
                                {/* Status dot */}
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#111] flex items-center justify-center ${lastfmTrack.nowPlaying ? 'bg-[#d51007]' : 'bg-white/20'}`}>
                                    <motion.div
                                        className="w-1.5 h-1.5 bg-white rounded-full"
                                        animate={lastfmTrack.nowPlaying ? { scale: [1, 1.4, 1] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </div>
                            </div>

                            {/* Song info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] text-[#d51007] uppercase tracking-[0.3em] font-bold mb-1">
                                    {lastfmTrack.nowPlaying ? '● Now Playing' : lastfmTrack.date || 'Recently Played'}
                                </p>
                                <h4 className="text-white font-bold text-base leading-tight truncate">{lastfmTrack.name}</h4>
                                <p className="text-secondary text-xs mt-0.5 truncate">{lastfmTrack.artist}</p>
                                <p className="text-white/30 text-[10px] mt-0.5 truncate font-light">{lastfmTrack.album}</p>
                            </div>
                        </div>
                    ) : lastfmLoaded ? (
                        /* No scrobbles yet */
                        <div className="flex gap-4 items-center">
                            <div className="w-[76px] h-[76px] rounded-2xl bg-white/[0.04] border border-white/[0.06] flex-shrink-0 flex items-center justify-center">
                                <Music size={24} className="text-white/20" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold mb-1">Not scrobbling yet</p>
                                <p className="text-white/50 text-sm leading-snug">Connect a music app to Last.fm to see plays here.</p>
                            </div>
                        </div>
                    ) : (
                        /* Skeleton loader */
                        <div className="flex gap-4 items-center">
                            <div className="w-[76px] h-[76px] rounded-2xl bg-white/5 animate-pulse flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-2 bg-white/5 rounded animate-pulse w-1/3" />
                                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                            </div>
                        </div>
                    )}

                    {/* Last.fm attribution */}
                    <div className="mt-5 flex items-center justify-between">
                        <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-[#d51007]"
                                initial={{ width: '0%' }}
                                whileInView={{ width: lastfmTrack?.nowPlaying ? '45%' : '70%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                            />
                        </div>
                        <a
                            href={`https://www.last.fm/user/${LASTFM_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 text-[9px] text-white/25 hover:text-white/60 transition-colors whitespace-nowrap font-mono tracking-wider"
                        >
                            last.fm
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BehindCurtains;

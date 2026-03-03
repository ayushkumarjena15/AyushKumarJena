import { useState } from 'react';
import { Linkedin, Twitter, Instagram, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Socials = () => {
    const [activeTrack, setActiveTrack] = useState(0);
    const tracks = [
        { name: "Attention", url: "https://open.spotify.com/embed/track/5cF0dROlMOK5uNZtivgu50?utm_source=generator" },
        { name: "Perfect", url: "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator" },
        { name: "Cry for Me", url: "https://open.spotify.com/embed/track/2aUln5LVybeBkQJqwdgCNs?utm_source=generator" }
    ];

    return (
        <section id="connect" className="py-32 border-t border-white/5 grid lg:grid-cols-2 gap-24 items-stretch bg-grid relative">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col justify-center"
            >
                <div className="space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                        Digital <span className="text-gradient">Presence</span>
                    </h2>
                    <div className="w-16 h-1.5 bg-accent1 rounded-full shadow-[0_0_15px_rgba(194,160,122,0.4)]" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/ayush-kumar-jena-b19151321/", label: "LinkedIn", color: "hover:bg-accent1/10 hover:text-accent1", sub: "Professional Ecosystem" },
                        { icon: <Twitter size={24} />, url: "https://x.com/AyushJena1504", label: "Twitter", color: "hover:bg-accent1/10 hover:text-accent1", sub: "Conceptual Threads" },
                        { icon: <Instagram size={24} />, url: "https://www.instagram.com/ig_ayush099/", label: "Instagram", color: "hover:bg-accent1/10 hover:text-accent1", sub: "Visual Journal" },
                        { icon: <Mail size={24} />, url: "mailto:ahalyajena28@gmail.com", label: "Email", color: "hover:bg-accent1/10 hover:text-accent1", sub: "Direct Transmission" }
                    ].map((item, i) => (
                        <a key={i} href={item.url} target={item.url.startsWith('http') ? "_blank" : "_self"} rel={item.url.startsWith('http') ? "noopener noreferrer" : ""} className={`p-8 glass-card group transition-all duration-500 ${item.color} flex flex-col gap-6 border-white/5 hover:-translate-y-2 bg-surface/10`}>
                            <div className="p-4 w-fit bg-white/5 rounded-2xl transition-all duration-500 group-hover:scale-110">
                                {item.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-black text-accent2 transition-colors uppercase tracking-widest text-sm">{item.label}</h3>
                                <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em]">{item.sub}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="glass-card p-1 items-stretch flex flex-col relative overflow-hidden group hover:border-accent1/20 transition-all duration-1000 bg-surface/5 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="p-10 pb-6 space-y-8 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent1 animate-pulse shadow-[0_0_10px_rgba(194,160,122,0.8)]" />
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.5em]">Curated Soundscapes</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <MessageSquare size={18} className="text-accent1" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {tracks.map((track, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTrack(idx)}
                                className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all border uppercase tracking-widest ${activeTrack === idx
                                    ? 'bg-accent1 border-accent1 text-background shadow-2xl shadow-accent1/20'
                                    : 'bg-white/5 border-white/5 text-secondary hover:bg-white/10'
                                    }`}
                            >
                                {track.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 p-6 pt-0 z-10">
                    <iframe
                        key={tracks[activeTrack].url}
                        style={{ borderRadius: '32px' }}
                        src={tracks[activeTrack].url}
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/5 saturate-[0.2] transition-all duration-700 group-hover:saturate-100"
                    ></iframe>
                </div>

                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent1/5 blur-[100px] -z-0 pointer-events-none" />
            </motion.div>
        </section>
    );
};

export default Socials;

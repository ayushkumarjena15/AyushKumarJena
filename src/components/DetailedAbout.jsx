import { motion } from 'framer-motion';

const photos = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=600&q=80"
];

const DetailedAbout = () => {
    // Duplicate photos to create seamless scroll loop
    const doubledPhotos = [...photos, ...photos];

    return (
        <section id="detailed-about" className="py-32 border-t border-white/5 relative overflow-hidden bg-grid">
            <div className="grid lg:grid-cols-2 gap-24 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                            The <span className="text-gradient">Philosophy</span>
                        </h2>
                        <div className="w-16 h-1.5 bg-accent1 rounded-full shadow-[0_0_15px_rgba(194,160,122,0.4)]" />
                    </div>

                    <div className="space-y-8 text-primary leading-relaxed text-lg md:text-xl font-light">
                        <p>
                            Beyond the lines of code, I am an avid tech enthusiast and a lifelong learner. I enjoy diving deep into emerging technologies, exploring cutting-edge tools, and understanding modern system architectures.
                        </p>
                        <p>
                            When I am not debugging a complex issue or designing a sleek user interface, you can find me exploring various tech meetups, reading about start-ups, or simply capturing moments and brainstorming the next big idea.
                        </p>
                        <p>
                            I truly believe in the power of <span className="text-accent2 font-bold italic">continuous improvement</span> and the importance of a well-balanced lifestyle. A calm mind, an aesthetic workspace, and a curious spirit build the most scalable solutions.
                        </p>
                    </div>
                </motion.div>

                {/* Vertical Scrolling Photo Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2 }}
                    className="relative h-[640px] overflow-hidden rounded-[3rem] glass-card p-8 border border-white/5 bg-surface/10 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)]"
                >
                    {/* Top and Bottom Gradient Fades for Smooth Illusion */}
                    <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background via-background/60 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none"></div>

                    <div className="animate-scroll-y gap-10 pb-10">
                        {doubledPhotos.map((src, i) => (
                            <div key={i} className="rounded-3xl overflow-hidden border border-white/5 group relative h-80 shrink-0 mt-10 shadow-2xl">
                                <img
                                    src={src}
                                    alt={`Gallery image ${i + 1}`}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter saturate-[0.1] group-hover:saturate-100"
                                />
                                <div className="absolute inset-0 bg-accent1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DetailedAbout;

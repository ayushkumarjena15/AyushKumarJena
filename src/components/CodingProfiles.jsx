import { Code2, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom SVG Icons for accurate brand logos
const LeetCodeIcon = ({ size, className }) => (
    <img src="/leetcode.png" alt="LeetCode" style={{ width: size, height: size }} className={className + " object-contain"} />
);



const HackerRankIcon = ({ size, className }) => (
    <img src="/hackerrank.png" alt="HackerRank" style={{ width: size, height: size }} className={className + " object-contain"} />
);

const GeeksForGeeksIcon = ({ size, className }) => (
    <img src="/gfg.png" alt="GeeksForGeeks" style={{ width: size, height: size }} className={className + " object-contain"} />
);

const GithubIcon = ({ size, className }) => (
    <img src="/github.png" alt="GitHub" style={{ width: size, height: size }} className={className + " object-contain"} />
);

const profiles = [
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/ayushkumarjena15' },
    { name: 'LeetCode', icon: LeetCodeIcon, url: 'https://leetcode.com/u/R57Cb5EtNk/' },
    { name: 'HackerRank', icon: HackerRankIcon, url: 'https://www.hackerrank.com/profile/ahalyajena28' },
    { name: 'GeeksforGeeks', icon: GeeksForGeeksIcon, url: 'https://www.geeksforgeeks.org/profile/ahalyajw0a5' },
];

const CodingProfiles = () => {
    return (
        <section className="py-32 border-t border-white/5 relative bg-grid">
            <div className="mb-20 text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                    Solution <span className="text-gradient">Hubs</span>
                </h2>
                <p className="text-primary max-w-2xl mx-auto text-lg md:text-xl font-light">
                    Aggregated intelligence and problem-solving metrics across primary engineering platforms.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
                {profiles.map((profile, i) => {
                    const Icon = profile.icon;
                    return (
                        <motion.a
                            key={profile.name}
                            href={profile.url}
                            className="glass-card flex items-center justify-center p-12 rounded-[2.5rem] w-52 h-52 flex-col gap-6 text-secondary hover:text-accent1 transition-all duration-700 ease-out hover:-translate-y-4 hover:shadow-[0_48px_96px_-16px_rgba(0,0,0,0.6)] hover:border-accent1/30 group relative overflow-hidden bg-surface/5 border border-white/5"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-accent1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <Icon size={48} className="group-hover:scale-110 transition-all duration-700 relative z-10 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                            <span className="font-black text-[10px] tracking-[0.3em] text-secondary group-hover:text-accent1 transition-all duration-700 relative z-10 uppercase">{profile.name}</span>
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
};

export default CodingProfiles;

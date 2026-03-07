import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const links = [
    { id: '01', name: 'GITHUB', url: 'https://github.com/ayushkumarjena15' },
    { id: '02', name: 'X', url: 'https://x.com/Aksj_15' },
    { id: '03', name: 'LINKEDIN', url: 'https://linkedin.com/in/ayush-kumar-jena' },
    { id: '04', name: 'EMAIL', url: 'mailto:ahalyajena28@gmail.com' },
    { id: '05', name: 'INSTAGRAM', url: 'https://instagram.com/ayushkumarjena15' },
    { id: '06', name: 'LEETCODE', url: 'https://leetcode.com/u/ayushkumarjena15' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const LinksPage = () => {
    return (
        <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-16 mb-2"
            >
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-8 bg-white/20" />
                        <p className="text-secondary text-[11px] font-bold tracking-[0.3em] uppercase">Connect / Follow / Chat</p>
                        <div className="h-[1px] w-8 bg-white/20" />
                    </div>

                    <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tight uppercase font-heading select-none">
                        <span className="block text-white">MY</span>
                        <span className="block text-secondary">DIGITAL</span>
                        <span className="block text-white">PRESENCE</span>
                    </h1>
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-10 md:mt-0 relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border border-white/10 flex-shrink-0 group"
                >
                    <img
                        src="/profile.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                </motion.div>
            </motion.div>

            {/* Links List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col w-full"
            >
                {links.map((link) => (
                    <motion.a
                        variants={itemVariants}
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-white/10 py-10 px-4 md:px-8 hover:bg-white transition-colors duration-500 cursor-pointer w-full"
                    >
                        <div className="flex items-center gap-10 md:gap-20">
                            <span className="text-secondary text-sm font-mono group-hover:text-black/50 transition-colors duration-500">
                                {link.id}
                            </span>
                            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white uppercase group-hover:text-black transition-colors duration-500 font-heading leading-none tracking-tight">
                                {link.name}
                            </h2>
                        </div>

                        <div className="flex items-center gap-6 md:gap-8">
                            <span className="opacity-0 group-hover:opacity-100 uppercase text-[10px] font-black tracking-[0.3em] text-black transition-all duration-500 -translate-x-4 group-hover:translate-x-0 hidden md:block">
                                Visit
                            </span>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 group-hover:border-black flex items-center justify-center transition-all duration-500">
                                <ArrowUpRight className="text-white group-hover:text-black transition-colors duration-500" size={28} strokeWidth={1.5} />
                            </div>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </section>
    );
};

export default LinksPage;

import { Award, Medal, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const achievements = [
    {
        title: "Google Cloud Certified - Associate Cloud Engineer",
        organization: "Google",
        date: "2024",
        description: "Demonstrated ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud.",
        icon: Award,
    },
    {
        title: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        date: "2023",
        description: "Validated expertise in designing distributed systems and deploying applications on the AWS platform.",
        icon: Trophy,
    },
    {
        title: "1st Place - National Hackathon",
        organization: "Tech Innovators",
        date: "2023",
        description: "Led a team of 4 to build an AI-powered healthcare application within 48 hours, winning the grand prize among 500+ teams.",
        icon: Medal,
    },
    {
        title: "Outstanding Performance Award",
        organization: "Previous Company Inc.",
        date: "2022",
        description: "Recognized for delivering a critical microservices migration project 2 months ahead of schedule.",
        icon: Star,
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-32 border-t border-white/5 relative bg-grid">
            <div className="mb-20 text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                    Milestones & <span className="text-gradient">Accolades</span>
                </h2>
                <p className="text-primary max-w-2xl mx-auto text-lg md:text-xl font-light">
                    A curated archive of professional certifications, high-impact awards, and technical milestones.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                {achievements.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={i}
                            className="glass-card p-10 group hover:-translate-y-4 transition-all duration-700 ease-out hover:shadow-[0_48px_96px_-16px_rgba(0,0,0,0.6)] hover:border-accent1/30 flex flex-col sm:flex-row gap-8 items-start relative overflow-hidden bg-surface/5 border border-white/5"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="p-6 bg-background/50 backdrop-blur-xl border border-white/5 rounded-[2rem] text-accent1 group-hover:scale-110 group-hover:bg-accent1 group-hover:text-background transition-all duration-700 relative z-10 shadow-2xl group-hover:shadow-[0_0_30px_rgba(194,160,122,0.4)]">
                                <Icon size={36} />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-accent2 group-hover:text-accent1 transition-all duration-500 font-heading tracking-tight italic">{item.title}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{item.organization}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent1/40" />
                                        <span className="text-xs font-mono text-secondary opacity-60">{item.date}</span>
                                    </div>
                                </div>
                                <p className="text-primary text-base leading-relaxed font-light line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Achievements;

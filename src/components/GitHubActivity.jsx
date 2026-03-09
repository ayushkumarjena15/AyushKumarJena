import React, { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, Star, ArrowRight, GitMerge, FileCode2 } from 'lucide-react';

const GitHubActivity = () => {
    const [recentEvents, setRecentEvents] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [calendarLoading, setCalendarLoading] = useState(true);

    // Exact GitHub contribution colors matching the provided screenshot
    const explicitTheme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    useEffect(() => {
        // Fetch Live Recent Activities from GitHub API
        fetch(`https://api.github.com/users/ayushkumarjena15/events/public?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredEvents = data.filter(event =>
                        ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'WatchEvent'].includes(event.type)
                    ).slice(0, 4);
                    setRecentEvents(filteredEvents);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching github events:', err);
                setLoading(false);
            });

        // Fetch Live Calendar Data manually to bypass cache
        fetch(`https://github-contributions.vercel.app/api/v1/ayushkumarjena15?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.contributions)) {
                    const todayDate = new Date();
                    // Optional: handle timezone, but simple ISO string works for filtering mostly
                    const todayStr = todayDate.toISOString().split('T')[0];

                    const pastYear = data.contributions
                        .filter(c => c.date <= todayStr)
                        .slice(0, 365)
                        .reverse()
                        .map(c => ({
                            date: c.date,
                            count: c.count,
                            level: Number(c.intensity) // Vercel API provides 0-4 intensity
                        }));
                    setCalendarData(pastYear);
                }
                setCalendarLoading(false);
            })
            .catch(err => {
                console.error('Error fetching calendar data:', err);
                // Fallback dummy data if completely dead, but user shouldn't see it if they are online
                setCalendarData([]);
                setCalendarLoading(false);
            });
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

    const getEventIcon = (type) => {
        switch (type) {
            case 'PushEvent': return <GitCommit size={16} className="text-[#39d353]" />;
            case 'PullRequestEvent': return <GitPullRequest size={16} className="text-[#a475f9]" />;
            case 'WatchEvent': return <Star size={16} className="text-[#e3b341]" />;
            case 'CreateEvent': return <FileCode2 size={16} className="text-[#58a6ff]" />;
            case 'IssuesEvent': return <GitMerge size={16} className="text-[#f85149]" />;
            default: return <GitCommit size={16} className="text-gray-400" />;
        }
    };

    const getEventDescription = (event) => {
        const repoName = event.repo.name.split('/')[1] || event.repo.name;
        switch (event.type) {
            case 'PushEvent':
                return (
                    <span>
                        Pushed to <span className="font-bold text-white">{repoName}</span>
                    </span>
                );
            case 'PullRequestEvent':
                return (
                    <span>
                        {event.payload.action} PR in <span className="font-bold text-white">{repoName}</span>
                    </span>
                );
            case 'WatchEvent':
                return (
                    <span>
                        Starred <span className="font-bold text-white">{repoName}</span>
                    </span>
                );
            case 'CreateEvent':
                return (
                    <span>
                        Created {event.payload.ref_type} in <span className="font-bold text-white">{repoName}</span>
                    </span>
                );
            case 'IssuesEvent':
                return (
                    <span>
                        {event.payload.action} issue in <span className="font-bold text-white">{repoName}</span>
                    </span>
                );
            default:
                return <span>Activity in <span className="font-bold text-white">{repoName}</span></span>;
        }
    };

    return (
        <section className="w-full py-16 bg-background relative overflow-hidden flex flex-col items-center">
            {/* Subtle green glow in the background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39d353]/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/60 font-bold text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
                        MY CODE JOURNEY
                    </p>
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-[1] tracking-tight text-white font-heading">
                        GitHub Activity
                    </h2>
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-serif italic text-white/50 leading-[1] tracking-tight flex items-center justify-center gap-3">
                        <span className="text-[#ec4899] font-sans font-black not-italic px-1 tracking-tighter">&amp;&amp;</span>
                        <span className="text-transparent border-none bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#ef4444] stroke-none">
                            Open Source
                        </span>
                    </h2>
                </motion.div>

                {/* Custom Live GitHub Calendar Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center pb-6 overflow-x-auto"
                >
                    <div className="min-w-max">
                        {calendarLoading ? (
                            <div className="h-[120px] flex items-center justify-center text-sm text-secondary animate-pulse gap-3">
                                <GitCommit className="animate-spin-slow text-[#39d353]" size={20} /> Loading live visualizer...
                            </div>
                        ) : calendarData.length > 0 ? (
                            <ActivityCalendar
                                data={calendarData}
                                colorScheme="dark"
                                theme={explicitTheme}
                                blockSize={14}
                                blockMargin={5}
                                fontSize={12}
                                hideMonthLabels={false}
                                hideColorLegend={false}
                                showWeekdayLabels={true}
                            />
                        ) : (
                            <div className="h-[120px] flex items-center justify-center text-sm text-red-400">
                                Live data stream temporarily unavailable. Checking connections...
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Live Recent Open Source Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {loading ? (
                        <div className="md:col-span-2 text-center text-secondary text-sm animate-pulse">
                            Fetching live GitHub activity...
                        </div>
                    ) : recentEvents.length > 0 ? (
                        recentEvents.map((event, idx) => (
                            <a
                                key={event.id || idx}
                                href={`https://github.com/${event.repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0d1117]/80 backdrop-blur-md border border-[#30363d] rounded-2xl p-6 hover:bg-[#161b22] hover:border-[#8b949e] transition-all duration-300 group flex flex-col justify-between shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {getEventIcon(event.type)}
                                        </div>
                                        <div>
                                            <p className="text-[#8b949e] text-[10px] uppercase tracking-widest font-bold mb-1">
                                                {getTimeAgo(event.created_at)}
                                            </p>
                                            <p className="text-[#c9d1d9] text-sm md:text-base font-medium">
                                                {getEventDescription(event)}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-[#8b949e] group-hover:text-white group-hover:-rotate-45 transition-all mt-2" />
                                </div>

                                {event.type === 'PushEvent' && event.payload.commits?.length > 0 ? (
                                    <div className="mt-2 pt-4 border-t border-[#30363d] flex flex-col gap-2">
                                        {event.payload.commits.slice(0, 2).map((commit, cIdx) => (
                                            <p key={commit.sha || cIdx} className="text-[#8b949e] text-xs truncate flex items-center gap-2">
                                                <code className="text-[#39d353] bg-[#161b22] px-1.5 py-0.5 rounded text-[10px]">
                                                    {commit.sha.substring(0, 7)}
                                                </code>
                                                {commit.message.split('\n')[0]}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-2 pt-4 border-t border-[#30363d]/0" />
                                )}
                            </a>
                        ))
                    ) : (
                        <div className="md:col-span-2 text-center text-secondary text-sm">
                            No recent open source activity found.
                        </div>
                    )}
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .react-activity-calendar {
                    font-family: inherit !important;
                }
                .react-activity-calendar text {
                    fill: #8b949e !important;
                }
            `}} />
        </section>
    );
};

export default GitHubActivity;

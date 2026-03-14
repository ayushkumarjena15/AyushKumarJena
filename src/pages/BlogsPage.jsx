import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Search } from 'lucide-react';
import { blogs } from '../data/blogs';

const BlogsPage = () => {
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('All Posts');

    const allTags = useMemo(() => {
        const tags = blogs.flatMap((b) => b.tags);
        return ['All Posts', ...Array.from(new Set(tags))];
    }, []);

    const filtered = useMemo(() => {
        return blogs.filter((b) => {
            const matchesTag = activeTag === 'All Posts' || b.tags.includes(activeTag);
            const matchesSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
            return matchesTag && matchesSearch;
        });
    }, [search, activeTag]);

    return (
        <motion.section
            className="min-h-screen bg-background overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Hero */}
            <div className="relative flex flex-col items-center justify-center text-center pt-36 pb-24 px-6 overflow-hidden">
                {/* Spotlight glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10"
                >
                    <h1 className="text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-tight uppercase text-white font-heading select-none">
                        BLOGS
                    </h1>
                    <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mt-6 mb-2">
                        THOUGHTS, TUTORIALS, AND
                    </p>
                    <p className="text-[clamp(1.5rem,4vw,3rem)] font-serif italic text-white/70 leading-tight">
                        insights i share.
                    </p>
                </motion.div>
            </div>

            {/* Search + Filter */}
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                    {/* Search */}
                    <div className="relative flex-shrink-0 w-full sm:w-72">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full pl-10 pr-4 py-2.5 text-sm text-white/70 placeholder-white/25 focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>

                    {/* Tag filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                                    activeTag === tag
                                        ? 'bg-white text-black'
                                        : 'bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Blog cards */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-white/25 text-sm">No articles found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.08 }}
                            >
                                <Link
                                    to={`/blogs/${blog.slug}`}
                                    className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 p-6 h-full"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-white/30 text-[11px] font-mono tracking-wider uppercase">
                                            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                                            {' • '}
                                            {blog.readTime.toUpperCase()}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors flex-shrink-0">
                                            <ArrowUpRight size={13} className="text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </div>
                                    </div>

                                    {blog.coverImage && (
                                        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4">
                                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                                        </div>
                                    )}

                                    <h2 className="text-white font-bold text-lg leading-snug tracking-tight mb-2 group-hover:text-white/90 transition-colors flex-1">
                                        {blog.title}
                                    </h2>
                                    <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mt-1">
                                        {blog.excerpt}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default BlogsPage;

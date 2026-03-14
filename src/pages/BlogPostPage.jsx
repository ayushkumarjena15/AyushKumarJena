import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, MessageSquare, Send, Loader2, LogOut, Eye, Heart, Sparkles, Share2, MessageCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { blogs, author } from '../data/blogs';
import { supabase } from '../supabaseClient';

// Render inline bold (**text**) and italic (*text*)
const renderInline = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="italic">{part.slice(1, -1)}</em>;
        }
        return part;
    });
};

const renderSection = (section, index) => {
    switch (section.type) {
        case 'intro':
            return (
                <div key={index} className="mb-8">
                    {section.content.split('\n\n').map((para, i) => (
                        <p key={i} className="text-white/75 leading-relaxed text-[1rem] mb-4 text-lg">{renderInline(para)}</p>
                    ))}
                </div>
            );
        case 'heading':
            return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold text-white mt-12 mb-4 tracking-tight">
                    {section.content}
                </h2>
            );
        case 'paragraph':
            return (
                <div key={index} className="mb-5">
                    {section.content.split('\n\n').map((para, i) => (
                        <p key={i} className="text-white/65 leading-relaxed text-[0.95rem] mb-2">{renderInline(para)}</p>
                    ))}
                </div>
            );
        case 'list':
            return (
                <ul key={index} className="mb-5 space-y-2.5 pl-1">
                    {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/65 text-[0.95rem] leading-relaxed">
                            <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'numbered_list':
            return (
                <ol key={index} className="mb-5 space-y-2.5 pl-1 list-none">
                    {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/65 text-[0.95rem] leading-relaxed">
                            <span className="text-primary font-bold font-mono text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ol>
            );
        case 'code':
            return (
                <div key={index} className="mb-6">
                    {section.label && (
                        <p className="text-white/30 text-[10px] font-mono mb-2 tracking-[0.15em] uppercase">{section.label}</p>
                    )}
                    <pre className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm font-mono text-white/80 overflow-x-auto leading-relaxed">
                        {section.content}
                    </pre>
                </div>
            );
        case 'callout':
            return (
                <div key={index} className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-4 pr-5 py-4 flex gap-3 border-l-2 border-l-primary">
                    {section.icon && <span className="text-primary mt-0.5 flex-shrink-0">{section.icon}</span>}
                    <div>
                        {section.label && <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{section.label}</p>}
                        <p className="text-white/70 text-sm leading-relaxed italic">{renderInline(section.content)}</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

// Comment component
const Comment = ({ comment }) => {
    const formattedDate = new Date(comment.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
    return (
        <div className="flex gap-3 py-5 border-b border-white/[0.06] last:border-0">
            <img
                src={comment.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`}
                alt={comment.name}
                className="w-9 h-9 rounded-full bg-white/10 flex-shrink-0 border border-white/10 object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-white text-sm font-semibold">{comment.name}</span>
                    <span className="text-white/25 text-xs font-mono">{formattedDate}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{comment.message}</p>
            </div>
        </div>
    );
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const blog = blogs.find((b) => b.slug === slug);
    const currentIndex = blogs.findIndex((b) => b.slug === slug);
    const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
    const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 2);

    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [stats, setStats] = useState({ views: 0, likes: 0, claps: 0 });
    const [hasLiked, setHasLiked] = useState(false);
    const [hasClapped, setHasClapped] = useState(false);
    const [shareLabel, setShareLabel] = useState('Share');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!blog) return;
        const fetchComments = async () => {
            setIsLoadingComments(true);
            const { data } = await supabase
                .from('blog_comments')
                .select('*')
                .eq('blog_slug', blog.slug)
                .order('created_at', { ascending: false });
            setComments(data || []);
            setIsLoadingComments(false);
        };
        fetchComments();
    }, [blog?.slug]);

    useEffect(() => {
        if (!blog) return;
        setHasLiked(localStorage.getItem(`liked_${blog.slug}`) === '1');
        setHasClapped(localStorage.getItem(`clapped_${blog.slug}`) === '1');
        const loadStats = async () => {
            await supabase.rpc('increment_blog_stat', { p_slug: blog.slug, p_field: 'views' });
            const { data } = await supabase.from('blog_stats').select('views,likes,claps').eq('blog_slug', blog.slug).single();
            if (data) setStats(data);
        };
        loadStats();
    }, [blog?.slug]);

    const handleLike = async () => {
        if (hasLiked) return;
        localStorage.setItem(`liked_${blog.slug}`, '1');
        setHasLiked(true);
        setStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
        await supabase.rpc('increment_blog_stat', { p_slug: blog.slug, p_field: 'likes' });
    };

    const handleClap = async () => {
        if (hasClapped) return;
        localStorage.setItem(`clapped_${blog.slug}`, '1');
        setHasClapped(true);
        setStats((prev) => ({ ...prev, claps: prev.claps + 1 }));
        await supabase.rpc('increment_blog_stat', { p_slug: blog.slug, p_field: 'claps' });
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: blog.title, url });
        } else {
            await navigator.clipboard.writeText(url);
            setShareLabel('Copied!');
            setTimeout(() => setShareLabel('Share'), 2000);
        }
    };

    const handleGoogleSignIn = async () => {
        localStorage.setItem('auth_return_path', window.location.pathname);
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + window.location.pathname },
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;
        setIsSubmitting(true);
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';
        const { data, error } = await supabase.from('blog_comments').insert([{
            blog_slug: blog.slug,
            user_id: user.id,
            name,
            avatar_url: user.user_metadata?.avatar_url || null,
            message: newComment.trim(),
        }]).select().single();
        if (!error && data) {
            setComments((prev) => [data, ...prev]);
            setNewComment('');
        }
        setIsSubmitting(false);
    };

    if (!blog) {
        return (
            <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
                <h1 className="text-4xl font-black text-white mb-4">Post Not Found</h1>
                <Link to="/blogs" className="text-primary hover:underline text-sm">← Back to Blogs</Link>
            </section>
        );
    }

    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <section className="min-h-screen bg-background pb-24">
            <div className="max-w-2xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Back button */}
                    <div className="pt-28 pb-8">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 text-sm transition-colors group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] px-4 py-2 rounded-full"
                        >
                            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                            Back to Blogs
                        </Link>
                    </div>

                    {/* Cover image */}
                    {blog.coverImage ? (
                        <div className="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-full rounded-2xl mb-8 aspect-[16/9] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] flex items-center justify-center">
                            <span className="text-white/10 text-6xl font-black uppercase tracking-tighter select-none">BLOG</span>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {blog.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono tracking-wider uppercase text-white/50 bg-white/[0.06] border border-white/[0.08] px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-5">
                        {blog.title}
                    </h1>

                    {/* Meta + Stats bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-8 border-b border-white/[0.06]">
                        <div className="flex items-center gap-4 text-white/30 text-xs font-mono">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={11} />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Eye size={11} />
                                {stats.views.toLocaleString()} VIEWS
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleLike}
                                title="Like"
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${hasLiked ? 'border-pink-500/50 text-pink-400 bg-pink-500/10' : 'border-white/[0.08] text-white/40 bg-white/[0.03] hover:border-white/20 hover:text-white/60'}`}
                            >
                                <Heart size={12} className={hasLiked ? 'fill-pink-400' : ''} />
                                {stats.likes}
                            </button>
                            <button
                                onClick={handleClap}
                                title="Appreciate"
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${hasClapped ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 'border-white/[0.08] text-white/40 bg-white/[0.03] hover:border-white/20 hover:text-white/60'}`}
                            >
                                <Sparkles size={12} className={hasClapped ? 'fill-yellow-400' : ''} />
                                {stats.claps}
                            </button>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] text-white/40 bg-white/[0.03] text-xs font-mono">
                                <MessageCircle size={12} />
                                {comments.length}
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.07] text-white/70 hover:bg-white/[0.12] hover:text-white text-xs font-semibold transition-all"
                            >
                                <Share2 size={12} />
                                {shareLabel}
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-16">
                        {blog.sections.map((section, index) => renderSection(section, index))}
                    </div>

                    {/* Author card */}
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 flex items-center gap-5 mb-12">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-20 h-20 rounded-full bg-white/10 border border-white/10 object-cover flex-shrink-0"
                            onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`; }}
                        />
                        <div className="flex-1">
                            <p className="text-[0.95rem] mb-1.5">
                                <span className="text-white/50 font-serif italic">Author </span><strong className="text-white font-heading not-italic tracking-wide">{author.name}</strong>
                            </p>
                            <p className="text-white/50 text-sm leading-relaxed mb-3">{author.bio}</p>
                            <div className="flex items-center gap-3">
                                <Link to="/about" className="text-primary text-sm font-medium hover:underline">
                                    More about me →
                                </Link>
                                <span className="flex items-center gap-2.5 text-white/40">
                                    {author.social.github && (
                                        <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                                            <FaGithub size={17} />
                                        </a>
                                    )}
                                    {author.social.linkedin && (
                                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors" title="LinkedIn">
                                            <FaLinkedin size={17} />
                                        </a>
                                    )}
                                    {author.social.twitter && (
                                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
                                            <FaXTwitter size={17} />
                                        </a>
                                    )}
                                    {author.social.leetcode && (
                                        <a href={author.social.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFA116] transition-colors" title="LeetCode">
                                            <SiLeetcode size={17} />
                                        </a>
                                    )}
                                    {author.social.instagram && (
                                        <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors" title="Instagram">
                                            <FaInstagram size={17} />
                                        </a>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Prev / Next navigation */}
                    {(prevBlog || nextBlog) && (
                        <div className="grid grid-cols-2 gap-4 mb-16 border-t border-white/[0.06] pt-8">
                            <div>
                                {prevBlog && (
                                    <Link to={`/blogs/${prevBlog.slug}`} className="group flex flex-col gap-1">
                                        <span className="text-white/30 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1">
                                            <ArrowLeft size={10} />
                                            Previous Article
                                        </span>
                                        <span className="text-white text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {prevBlog.title}
                                        </span>
                                    </Link>
                                )}
                            </div>
                            <div className="text-right">
                                {nextBlog && (
                                    <Link to={`/blogs/${nextBlog.slug}`} className="group flex flex-col gap-1 items-end">
                                        <span className="text-white/30 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1">
                                            Next Article
                                            <ArrowRight size={10} />
                                        </span>
                                        <span className="text-white text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {nextBlog.title}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Discussion */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare size={20} className="text-primary" />
                            <h3 className="text-xl font-bold text-white">Discussion</h3>
                            <span className="text-xs font-mono text-white/30 bg-white/[0.06] rounded-full px-2.5 py-0.5">
                                {comments.length}
                            </span>
                        </div>

                        {!user ? (
                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 flex flex-col items-center text-center gap-4">
                                <p className="text-white font-semibold">Join the conversation</p>
                                <p className="text-white/40 text-sm">Sign in to leave a comment, like, or reply.</p>
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center gap-2.5 bg-white text-black font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors"
                                >
                                    <FcGoogle size={18} />
                                    Sign in with Google
                                </button>
                            </div>
                        ) : (
                            <div>
                                <form onSubmit={handleSubmitComment} className="mb-6">
                                    <div className="flex gap-3">
                                        <img
                                            src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                            alt="You"
                                            className="w-9 h-9 rounded-full bg-white/10 border border-white/10 object-cover flex-shrink-0 mt-1"
                                        />
                                        <div className="flex-1">
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Write a comment..."
                                                rows={3}
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white/80 text-sm placeholder-white/25 resize-none focus:outline-none focus:border-primary/40 transition-colors"
                                            />
                                            <div className="flex items-center justify-between mt-2">
                                                <button
                                                    type="button"
                                                    onClick={handleSignOut}
                                                    className="flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs transition-colors"
                                                >
                                                    <LogOut size={11} />
                                                    Sign out
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={!newComment.trim() || isSubmitting}
                                                    className="flex items-center gap-2 bg-primary text-black font-semibold px-4 py-1.5 rounded-full text-xs disabled:opacity-40 hover:bg-primary/90 transition-colors"
                                                >
                                                    {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                {isLoadingComments ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 size={20} className="animate-spin text-white/20" />
                                    </div>
                                ) : comments.length === 0 ? (
                                    <div className="flex flex-col items-center py-10 text-center">
                                        <MessageSquare size={36} className="text-white/10 mb-3" />
                                        <p className="text-white/30 text-sm italic">No comments yet. Start the discussion!</p>
                                    </div>
                                ) : (
                                    <div>
                                        {comments.map((c) => <Comment key={c.id} comment={c} />)}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Show empty state when signed out and no comments */}
                        {!user && (
                            <div className="mt-6 flex flex-col items-center py-8 text-center">
                                <MessageSquare size={36} className="text-white/10 mb-3" />
                                <p className="text-white/25 text-sm italic">No comments yet. Start the discussion!</p>
                            </div>
                        )}
                    </div>

                    {/* Read This Next */}
                    {relatedBlogs.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Read This Next</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {relatedBlogs.map((b) => (
                                    <Link
                                        key={b.id}
                                        to={`/blogs/${b.slug}`}
                                        className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all p-5 flex flex-col gap-3"
                                    >
                                        <div className="flex items-center justify-between text-white/25 text-xs font-mono">
                                            <span>{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                                            <span className="flex items-center gap-1"><Clock size={10} />{b.readTime}</span>
                                        </div>
                                        <p className="text-white font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                            {b.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPostPage;

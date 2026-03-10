import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Target, Leaf, RefreshCcw, Key, MessageSquare, EyeOff, Server,
    BookOpen, UserCog, TrendingUp, Mail, Zap, Cookie, ToggleLeft,
    Github, Globe, Database, Cloud, Trash2, UserX, Download, Edit3,
    Lock, Shield, Users, AlertTriangle, Calendar, Flag, Clock, AtSign,
    ScrollText, Activity, BarChart2, Share2, SlidersHorizontal
} from 'lucide-react';

const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            number: '01',
            title: 'Introduction',
            titleIcon: <ScrollText size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Your privacy is important. This policy explains how I collect, use, and protect your information.',
            items: [
                {
                    icon: <Heart size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Our Commitment',
                    content: 'I, Ayush Kumar Jena ("I", "me", "my"), am committed to protecting your privacy and ensuring transparency in how your data is handled. This Privacy Policy applies to all visitors and users of my portfolio and its subdomains.'
                },
                {
                    icon: <Target size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Scope of Policy',
                    content: 'This Privacy Policy covers all data collected through the website, including: authentication data from the Guestbook feature, user-generated content (messages), and anonymous analytics data. This policy does not apply to third-party websites linked from this site.'
                },
                {
                    icon: <Leaf size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Minimal Data Philosophy',
                    content: 'I believe in collecting only the minimum data necessary for functionality. I do not sell, trade, or rent your personal information to third parties. Your data is used solely to provide and improve the website experience.'
                },
                {
                    icon: <RefreshCcw size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Policy Updates',
                    content: 'This policy may be updated periodically to reflect changes in practices or legal requirements. The "Last Updated" date at the bottom indicates the most recent revision. Continued use of the site constitutes acceptance of any changes.'
                }
            ]
        },
        {
            number: '02',
            title: 'Data We Collect',
            titleIcon: <Database size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Transparency about exactly what information is collected and how.',
            items: [
                {
                    icon: <Key size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Authentication Data',
                    content: 'When you sign in via GitHub or Google OAuth to use the Guestbook, I receive ONLY: your display name and profile picture (avatar URL). Your email is used solely for account identification and is never shared or displayed publicly. Your passwords are NEVER accessible to me.'
                },
                {
                    icon: <MessageSquare size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Guestbook Messages',
                    content: 'When you post in the Guestbook, the following is stored: your display name, your avatar, and your message content with a timestamp. This data is publicly visible to all website visitors. No sensitive or private information is collected beyond what you voluntarily post.'
                },
                {
                    icon: <EyeOff size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'No Sensitive Data',
                    content: 'I do NOT collect: passwords, payment information, precise location data, contacts, phone numbers, government IDs, health information, or any other sensitive personal data. Authentication is handled entirely by GitHub/Google OAuth providers.'
                },
                {
                    icon: <Server size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Automatic Data',
                    content: 'Standard technical data may be logged by hosting infrastructure including: IP addresses (anonymized), browser type, device information, pages visited, and timestamps. This data is used only for security, debugging, and aggregate analytics.'
                }
            ]
        },
        {
            number: '03',
            title: 'How Data Is Used',
            titleIcon: <Activity size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Specific purposes for which collected data is processed.',
            items: [
                {
                    icon: <BookOpen size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Guestbook Functionality',
                    content: 'Your name and avatar are displayed alongside your Guestbook messages to identify you to other visitors. This is the primary use of your authentication data.'
                },
                {
                    icon: <UserCog size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Account Management',
                    content: 'Your user ID (provided by OAuth) is used to allow you to edit or delete your own messages. As the site owner, I also retain the ability to moderate and remove content that violates usage policies.'
                },
                {
                    icon: <TrendingUp size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Analytics & Improvement',
                    content: 'Anonymous, aggregated data helps me understand how visitors use the site, which pages are popular, and where improvements can be made. Individual users are not personally identifiable through analytics.'
                },
                {
                    icon: <Mail size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Communication',
                    content: 'I will not contact you via email unless you explicitly reach out first or if required for critical security notifications related to your account.'
                }
            ]
        },
        {
            number: '04',
            title: 'Analytics & Tracking',
            titleIcon: <BarChart2 size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Tools used to understand website performance and usage patterns.',
            items: [
                {
                    icon: <Zap size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Vercel Analytics',
                    content: 'Vercel Analytics measures page performance metrics including load times, server response times, and Core Web Vitals. This data is fully aggregated and contains no personal identifiers. It helps optimize website speed and reliability.'
                },
                {
                    icon: <EyeOff size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'No Invasive Tracking',
                    content: 'I do NOT use session recordings, heatmaps, keystroke logging, or any invasive tracking technologies. Your interactions on this site are not individually monitored or analyzed.'
                },
                {
                    icon: <Cookie size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Cookie Use',
                    content: 'Cookies are used only for: maintaining authentication sessions, remembering theme preferences (dark/light mode), and basic analytics. No advertising or cross-site tracking cookies are used.'
                },
                {
                    icon: <ToggleLeft size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Opt-Out Options',
                    content: 'You can block analytics cookies using browser extensions like uBlock Origin without affecting core site functionality. Authentication cookies are essential and cannot be disabled if you wish to use the Guestbook.'
                }
            ]
        },
        {
            number: '05',
            title: 'Third-Party Services',
            titleIcon: <Share2 size={28} className="text-white" strokeWidth={1.5} />,
            description: 'External services integrated into the website and their data practices.',
            items: [
                {
                    icon: <Github size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'GitHub OAuth',
                    content: 'GitHub OAuth is used for authentication. When you sign in with GitHub, they share only your public profile information (name, avatar). GitHub\'s own Privacy Policy governs their data practices: https://docs.github.com/privacy'
                },
                {
                    icon: <Globe size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Google OAuth',
                    content: 'Google OAuth is an alternative sign-in method. Google shares only your basic profile information (name, avatar). Google\'s Privacy Policy applies: https://policies.google.com/privacy'
                },
                {
                    icon: <Database size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Appwrite (Backend)',
                    content: 'User data and messages are stored using Appwrite, a secure backend service. Appwrite stores data in encrypted databases with role-based access control. Only authorized operations are permitted.'
                },
                {
                    icon: <Cloud size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Vercel (Hosting)',
                    content: 'This website is hosted on Vercel. Vercel may log standard HTTP request data (IP, User-Agent) for security and operational purposes. See Vercel\'s Privacy Policy: https://vercel.com/legal/privacy-policy'
                }
            ]
        },
        {
            number: '06',
            title: 'Your Rights & Control',
            titleIcon: <SlidersHorizontal size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Full control over your data. Here are your rights and how to exercise them.',
            items: [
                {
                    icon: <Trash2 size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Delete Your Messages',
                    content: 'You can delete any of your Guestbook messages at any time directly from the website by clicking the delete button on your own messages. No request to me is necessary for this.'
                },
                {
                    icon: <UserX size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Account Deletion',
                    content: 'To completely remove your account and all associated data, contact me at ahalyajena28@gmail.com. I will delete your user profile and all messages within 30 days of receiving your request.'
                },
                {
                    icon: <Download size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Data Access',
                    content: 'You may request a copy of all personal data I hold about you. Contact me at ahalyajena28@gmail.com and I will provide your data in a portable format within 30 days.'
                },
                {
                    icon: <Edit3 size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Data Correction',
                    content: 'If any information is inaccurate, you can update your display name by editing your profile. For other corrections, contact me directly via email.'
                }
            ]
        },
        {
            number: '07',
            title: 'Data Security',
            titleIcon: <Lock size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Measures taken to protect your information from unauthorized access.',
            items: [
                {
                    icon: <Shield size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Encryption',
                    content: 'All data transmitted between your browser and this website is encrypted using HTTPS/TLS. Data at rest is stored in encrypted databases with access controls.'
                },
                {
                    icon: <Users size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Access Control',
                    content: 'Only I (the site owner) have administrative access to the backend database. User data is protected by role-based permissions ensuring users can only modify their own content.'
                },
                {
                    icon: <Lock size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'OAuth Security',
                    content: 'By using GitHub/Google OAuth, your password is never shared with or stored on this website. Authentication tokens are securely managed and sessions expire appropriately.'
                },
                {
                    icon: <AlertTriangle size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Security Limitations',
                    content: 'While I implement reasonable security measures, no internet transmission is 100% secure. I cannot guarantee absolute security but will promptly notify affected users in the event of any data breach.'
                }
            ]
        },
        {
            number: '08',
            title: 'Children & GDPR',
            titleIcon: <Globe size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Compliance with child protection and international privacy regulations.',
            items: [
                {
                    icon: <Calendar size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Age Requirement',
                    content: 'This website is not directed at children under 13 years of age. By using the Guestbook feature, you confirm that you are at least 13 years old or have parental consent.'
                },
                {
                    icon: <Flag size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'GDPR Compliance',
                    content: 'For users in the European Economic Area: you have rights under GDPR including access, rectification, erasure, and portability. These rights can be exercised by contacting me directly.'
                },
                {
                    icon: <Clock size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Data Retention',
                    content: 'Guestbook messages are retained indefinitely unless you delete them or request account deletion. Analytics data is aggregated and retained for up to 12 months.'
                },
                {
                    icon: <AtSign size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Contact for Privacy',
                    content: 'For any privacy-related inquiries, requests, or complaints, contact: ahalyajena28@gmail.com. I aim to respond to all privacy requests within 30 days.'
                }
            ]
        }
    ];

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-black text-[#d1d5db] font-sans selection:bg-accent1/30"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                {/* Header Content */}
                <div className="text-center mb-32 relative pt-12">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280] mb-6">Legal Notice</p>
                    <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-heading font-black tracking-tighter leading-[0.85] text-white uppercase break-words">
                        Privacy Policy
                    </h1>
                </div>

                {/* Sections */}
                <div className="space-y-32">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            {/* Huge Background Number */}
                            <div className="absolute -top-[4rem] sm:-top-[8rem] md:-top-[12rem] -left-4 sm:-left-8 select-none pointer-events-none z-0">
                                <span className="text-[7rem] sm:text-[16rem] md:text-[24rem] font-heading font-black text-[#111] leading-none tracking-tighter mix-blend-screen opacity-60">
                                    {section.number}
                                </span>
                            </div>

                            <div className="relative z-10 pt-4 px-2 sm:px-8">
                                <div className="mb-12">
                                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-white mb-6 tracking-tight flex items-center gap-4">
                                        {section.title}
                                        <div className="mt-2 text-white/50">{section.titleIcon}</div>
                                    </h2>
                                    <p className="text-[#9ca3af] text-[15px] md:text-[17px] font-normal max-w-2xl leading-relaxed">
                                        {section.description}
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="mb-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <h3 className="text-xl md:text-[22px] font-bold text-white tracking-tight">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-[#9ca3af] text-[15px] md:text-base leading-[1.8] font-normal max-w-4xl">
                                                {item.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thin gray divider line, matching the screenshots */}
                            {index < sections.length - 1 && (
                                <div className="w-full h-[1px] bg-white/[0.05] mt-32" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Contact Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-2 sm:px-8"
                >
                    <div className="space-y-2">
                        <p className="text-[#6b7280] text-[15px] font-medium">Have questions about this policy?</p>
                        <a href="mailto:ahalyajena28@gmail.com" className="text-xl md:text-[22px] font-bold text-white hover:text-gray-300 transition-colors block">
                            ahalyajena28@gmail.com
                        </a>
                    </div>
                    <div className="text-left md:text-right space-y-2">
                        <p className="text-[#6b7280] text-[15px] font-medium">Last updated</p>
                        <p className="text-xl md:text-[22px] font-bold text-white">January 1, 2026</p>
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
};

export default PrivacyPolicyPage;

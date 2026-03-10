import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Sprout, Handshake, User, FileEdit, Globe,
    Copyright, Crown, Shield, Ban, AlertTriangle,
    Hammer, FileX, Briefcase, AlertOctagon, Search,
    Key, Eye, Lightbulb, Link as LinkIcon, XCircle,
    Users, MessageSquare, CheckSquare, Settings,
    ShieldOff, XSquare, TrendingDown, ExternalLink, Info,
    Scale, ShieldCheck, MessageCircle, UserMinus, Scissors
} from 'lucide-react';

const TermsOfUsePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            number: '01',
            title: 'General Provisions',
            titleIcon: <Sprout size={28} className="text-white" strokeWidth={1.5} />,
            description: 'The foundation of our legally binding agreement. By accessing this site, you agree to these terms.',
            items: [
                {
                    icon: <Handshake size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Binding Agreement',
                    content: 'These Terms of Use ("Terms") constitute a legally binding contract between you ("User", "You") and Ayush Kumar Jena ("Owner", "I", "Me"). By accessing, browsing, or using my portfolio and its subdomains, you acknowledge that you have read, understood, and unconditionally agree to be bound by these Terms.'
                },
                {
                    icon: <User size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Legal Capacity',
                    content: 'By using this website, you represent and warrant that you are at least 13 years of age and have the legal capacity to enter into binding agreements. If you do not agree with any provision of these Terms, you must immediately cease all use of this website.'
                },
                {
                    icon: <FileEdit size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Right to Modify',
                    content: 'I reserve the exclusive right to modify, amend, or update these Terms at any time without prior notice. The "Last Updated" date at the bottom of this page indicates the most recent revision. Your continued use of the site following any changes constitutes acceptance of the modified Terms.'
                },
                {
                    icon: <Globe size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Jurisdiction',
                    content: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in India.'
                }
            ]
        },
        {
            number: '02',
            title: 'Intellectual Property Rights',
            titleIcon: <Copyright size={28} className="text-white" strokeWidth={1.5} />,
            description: 'All creative works, designs, code, and assets on this website are protected by copyright and intellectual property laws.',
            items: [
                {
                    icon: <Crown size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Exclusive Ownership',
                    content: 'All content on this website including but not limited to: source code, UI/UX designs, animations, visual elements, graphics, SVGs, typography arrangements, color schemes, layout architecture, components, and overall aesthetics are the exclusive intellectual property of Ayush Kumar Jena, protected under international copyright laws.'
                },
                {
                    icon: <Shield size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Copyright Protection',
                    content: 'This work is protected under the Indian Copyright Act, 1957, the Digital Millennium Copyright Act (DMCA) of 1998, and applicable international copyright treaties including the Berne Convention. Unauthorized reproduction, distribution, or derivative works are strictly prohibited.'
                },
                {
                    icon: <Ban size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Prohibited Actions',
                    content: 'You are expressly prohibited from: copying, cloning, or reproducing any part of this website; creating derivative works; redistributing source code or design elements; using designs, components, or assets for commercial purposes; reverse engineering any proprietary techniques; claiming ownership of any content.'
                },
                {
                    icon: <AlertTriangle size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Design Theft Warning',
                    content: 'THIS IS NOT AN OPEN-SOURCE PROJECT. Any unauthorized use, reproduction, or distribution of this website\'s designs, components, animations, or visual assets constitutes copyright infringement and will be pursued with full legal action including DMCA takedown notices, cease and desist orders, and civil litigation.'
                }
            ]
        },
        {
            number: '03',
            title: 'Copyright Enforcement',
            titleIcon: <Hammer size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Legal measures and remedies I will pursue against violators of intellectual property rights.',
            items: [
                {
                    icon: <FileX size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'DMCA Takedowns',
                    content: 'Any unauthorized reproduction of this website\'s content will be subject to immediate DMCA takedown notices filed with hosting providers, domain registrars, and search engines. Repeat offenders will be reported to the US Copyright Office.'
                },
                {
                    icon: <Briefcase size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Legal Action',
                    content: 'I reserve the right to pursue full legal remedies including injunctive relief, statutory damages (up to $150,000 per willful infringement under US law), actual damages, lost profits, and attorney\'s fees against any party that infringes upon my intellectual property rights.'
                },
                {
                    icon: <AlertOctagon size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'IT Act 2000 (India)',
                    content: 'Under the Information Technology Act, 2000 of India, unauthorized access, copying, or extraction of computer source code is a punishable offense under Sections 43 and 66, with penalties including imprisonment and fines up to ₹1 crore.'
                },
                {
                    icon: <Search size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Evidence Collection',
                    content: 'All website access is logged. In cases of suspected infringement, screenshots, timestamps, IP addresses, and other digital evidence will be preserved and used in legal proceedings. Archived versions of infringing content may be obtained from web archives as evidence.'
                }
            ]
        },
        {
            number: '04',
            title: 'Limited License',
            titleIcon: <Key size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Specific permissions granted for viewing and limited inspiration purposes only.',
            items: [
                {
                    icon: <Eye size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Viewing Rights',
                    content: 'You are granted a limited, non-exclusive, non-transferable, revocable license to view and browse this website for personal, non-commercial purposes only. This license does not include any right to copy, reproduce, or create derivatives.'
                },
                {
                    icon: <Lightbulb size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Inspiration Guidelines',
                    content: 'You may study specific UI patterns or techniques for educational purposes. However, you may NOT: replicate the overall design aesthetic, copy component structures, use similar visual styling, or create any work that appears substantially similar to this website.'
                },
                {
                    icon: <LinkIcon size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Attribution Requirements',
                    content: 'Any limited, permissible use of concepts or techniques learned from this site requires explicit written permission and must include a visible, clickable dofollow backlink to this website with proper attribution to "Ayush Kumar Jena".'
                },
                {
                    icon: <XCircle size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'License Termination',
                    content: 'This license is automatically terminated if you violate any of these Terms. Upon termination, you must immediately cease all use and destroy any downloaded or cached copies of any website content.'
                }
            ]
        },
        {
            number: '05',
            title: 'Guestbook & User Conduct',
            titleIcon: <Users size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Rules governing user behavior and content posted on interactive features.',
            items: [
                {
                    icon: <MessageSquare size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Content Standards',
                    content: 'All content you post must be lawful, respectful, and appropriate. You agree not to post content that is: defamatory, harmful, threatening, abusive, harassing, vulgar, obscene, sexually explicit, racially offensive, or otherwise objectionable. Zero tolerance policy for hate speech, discrimination, or harmful content.'
                },
                {
                    icon: <Ban size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Prohibited Conduct',
                    content: 'You shall not: post spam or promotional content; impersonate others; post malicious links; attempt to exploit security vulnerabilities; harvest user data; use automated bots; engage in any activity that disrupts or interferes with the website\'s operation.'
                },
                {
                    icon: <CheckSquare size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Content License',
                    content: 'By posting content in the Guestbook, you grant me a non-exclusive, worldwide, royalty-free license to display your content on the website. You retain ownership of your content and may delete your messages at any time.'
                },
                {
                    icon: <Settings size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Moderation Rights',
                    content: 'I reserve the absolute right to remove, edit, refuse, or delete any user-generated content at my sole discretion and without prior notice or explanation. Violations may result in permanent bans and potential legal action for severe offenses.'
                }
            ]
        },
        {
            number: '06',
            title: 'Disclaimers & Limitations',
            titleIcon: <ShieldOff size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Important limitations on warranties, liability, and damages.',
            items: [
                {
                    icon: <XSquare size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'No Warranties',
                    content: 'THIS WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. I disclaim all warranties including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, availability, and security.'
                },
                {
                    icon: <TrendingDown size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Limitation of Liability',
                    content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, I SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, PROFITS, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THIS WEBSITE.'
                },
                {
                    icon: <ExternalLink size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'External Links',
                    content: 'This site may contain links to third-party websites. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. You access external links at your own risk.'
                },
                {
                    icon: <Info size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'No Professional Advice',
                    content: 'Nothing on this website constitutes professional advice (legal, financial, or otherwise). Any reliance on information presented is at your own risk. For professional matters, consult qualified professionals.'
                }
            ]
        },
        {
            number: '07',
            title: 'Indemnification & Disputes',
            titleIcon: <Scale size={28} className="text-white" strokeWidth={1.5} />,
            description: 'Your obligations to defend and hold harmless against claims.',
            items: [
                {
                    icon: <ShieldCheck size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Indemnification',
                    content: 'You agree to indemnify, defend, and hold harmless Ayush Kumar Jena from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from: your use of this website; your violation of these Terms; your violation of any third-party rights; or any content you post.'
                },
                {
                    icon: <MessageCircle size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Dispute Resolution',
                    content: 'Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be settled by binding arbitration in accordance with Indian arbitration laws.'
                },
                {
                    icon: <UserMinus size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Class Action Waiver',
                    content: 'YOU AGREE THAT ANY CLAIMS WILL BE BROUGHT SOLELY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING.'
                },
                {
                    icon: <Scissors size={20} className="text-white/60" strokeWidth={1.5} />,
                    title: 'Severability',
                    content: 'If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.'
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
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280] mb-6">Legal Agreement</p>
                    <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-heading font-black tracking-tighter leading-[0.85] text-white uppercase break-words">
                        Terms of Use
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
                        <p className="text-[#6b7280] text-[15px] font-medium">Have questions about these terms?</p>
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

export default TermsOfUsePage;

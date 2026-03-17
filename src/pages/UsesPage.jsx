import { motion } from 'framer-motion';
import {
    SiArc, SiRaycast, SiLinear, SiGithub, SiVercel, SiFigma,
    SiFramer, SiObsidian, SiNotion, Si1Password, SiSpotify, SiX, SiPeerlist,
    SiAnthropic, SiHuggingface, SiGooglegemini, SiOpenai
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Layers } from 'lucide-react';
import CTASection from '../components/CTASection';

const softwareTools = [
    { name: 'VS Code', icon: VscVscode, color: 'text-blue-500', description: 'Primary IDE' },
    { name: 'Cursor', icon: Layers, color: 'text-white', description: 'AI Code Editor' },
    { name: 'Arc', icon: SiArc, color: 'text-pink-500', description: 'The Internet Computer' },
    { name: 'Raycast', icon: SiRaycast, color: 'text-red-500', description: 'Launcher & Extensions' },
    { name: 'Linear', icon: SiLinear, color: 'text-indigo-500', description: 'Project Tracking' },
    { name: 'GitHub', icon: SiGithub, color: 'text-white', description: 'Code Hosting' },
    { name: 'Vercel', icon: SiVercel, color: 'text-white', description: 'Deployment' },
    { name: 'Figma', icon: SiFigma, color: 'text-orange-400', description: 'Interface Design' },
    { name: 'Framer', icon: SiFramer, color: 'text-white', description: 'No-Code Sites' },
    { name: 'Obsidian', icon: SiObsidian, color: 'text-purple-500', description: 'Second Brain' },
    { name: 'Notion', icon: SiNotion, color: 'text-white', description: 'Team Knowledge Base' },
    { name: '1Password', icon: Si1Password, color: 'text-[#00b0ba]', description: 'Secrets Manager' },
];

const integrations = [
    { name: 'ChatGPT', icon: SiOpenai, color: 'text-white', description: 'AI Assistant' },
    { name: 'Claude', icon: SiAnthropic, color: 'text-[#d97757]', description: 'Advanced Reasoning' },
    { name: 'Gemini', icon: SiGooglegemini, color: 'text-blue-400', description: 'Multimodal AI' },
    { name: 'Hugging Face', icon: SiHuggingface, color: 'text-yellow-400', description: 'AI Models' },
    { name: 'Spotify', icon: SiSpotify, color: 'text-green-500', description: 'Audio Streaming' },
    { name: 'X', icon: SiX, color: 'text-white', description: 'Tech Twitter' },
    { name: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-600', description: 'Professional Network' },
    { name: 'Peerlist', icon: SiPeerlist, color: 'text-green-600', description: 'Developer Network' },
];

const Section = ({ number, title, subtitle, description, children }) => (
    <div className="mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        <div className="lg:w-[35%] flex flex-col gap-6 lg:sticky lg:top-32 h-fit">
            <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/20"></div>
                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{number}. {title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading">{subtitle}</h2>
            <p className="text-white/50 leading-relaxed text-sm md:text-base lg:pr-4">
                {description}
            </p>
        </div>
        <div className="lg:w-[65%] mt-8 lg:mt-0">
            {children}
        </div>
    </div>
);

const AppGrid = ({ items }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => {
            const Icon = item.icon;
            return (
                <div key={item.name} className="bg-[#0a0a0b] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] hover:border-white/10 transition-colors cursor-default group">
                    <div className={`text-2xl min-h-12 w-12 rounded-xl bg-white/[0.03] flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                        <Icon />
                    </div>
                    <div className="text-center">
                        <h4 className="text-white/90 font-bold text-sm mb-1">{item.name}</h4>
                        <p className="text-white/40 text-[10px] uppercase font-mono">{item.description}</p>
                    </div>
                </div>
            );
        })}
    </div>
);

const UsesPage = () => {
    return (
        <main className="bg-[#000000] min-h-screen">
            <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto relative">
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 pt-16 relative z-10 border-b border-white/10 pb-16">
                    <div className="flex flex-col">
                        <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-8">SYSTEM INVENTORY</span>
                        <h1 className="text-[clamp(5rem,15vw,12rem)] font-black leading-[0.8] tracking-tight uppercase font-heading text-white">
                            USES
                        </h1>
                    </div>
                    <div className="md:w-[40%] mt-8 md:mt-0 xl:mr-16">
                        <p className="text-white/50 text-xl leading-relaxed">
                            A curated manifest of the hardware, software, and everyday carry that I use to design and build products.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                <div className="relative z-10 mt-20 md:mt-32">
                    <Section
                        number="01"
                        title="SOFTWARE"
                        subtitle="DEV TOOLS"
                        description="A highly optimized, blazingly fast software stack. I rely heavily on VS Code/Cursor for primary development, Arc for fluid browsing, and an ensemble of productivity tools like Raycast and Obsidian. My digital workspace is strictly curated—if an app doesn't serve a critical function or sparks joy with its UI, it doesn't stay."
                    >
                        <AppGrid items={softwareTools} />
                    </Section>

                    <Section
                        number="02"
                        title="INTEGRATIONS"
                        subtitle="AI & SOCIALS"
                        description="Beyond bare metal and development tools, these are the platforms powering my daily workflows. I leverage advanced LLMs for rapid prototyping, reasoning, and context analysis, while staying connected across professional design networks. Every API and social integration is meticulously selected to amplify productivity."
                    >
                        <AppGrid items={integrations} />
                    </Section>
                </div>
            </section>
            <CTASection />
        </main>
    );
};

export default UsesPage;

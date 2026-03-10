import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Command, Globe, Code, FileText, Book, Brain, Database, Music,
    PenTool, CheckSquare, Calendar, Lock, Layout, Camera, Maximize, Zap,
    Cpu, Keyboard, Mouse, Smartphone, HardDrive
} from 'lucide-react';
import CTASection from '../components/CTASection';

const softwareInventory = [
    { id: '01', name: 'Raycast', icon: Command, type: 'PRODUCTIVITY', description: 'Launcher & Extensions' },
    { id: '02', name: 'Arc', icon: Globe, type: 'BROWSER', description: 'The Internet Computer' },
    { id: '03', name: 'VS Code', icon: Code, type: 'EDITOR', description: 'Primary IDE' },
    { id: '04', name: 'Obsidian', icon: FileText, type: 'NOTES', description: 'Second Brain' },
    { id: '05', name: 'Notion', icon: Book, type: 'WORKSPACE', description: 'Team Knowledge Base' },
    { id: '06', name: 'mymind', icon: Brain, type: 'INSPIRATION', description: 'Visual Storage' },
    { id: '07', name: 'Tana', icon: Database, type: 'DATABASE', description: 'Ontology Graph' },
    { id: '08', name: 'Spotify', icon: Music, type: 'MUSIC', description: 'Audio Streaming' },
    { id: '09', name: 'Figma', icon: PenTool, type: 'DESIGN', description: 'Interface Design' },
    { id: '10', name: 'Things 3', icon: CheckSquare, type: 'TASKS', description: 'Task Management' },
    { id: '11', name: 'Fantastical', icon: Calendar, type: 'CALENDAR', description: 'Time Management' },
    { id: '12', name: '1Password', icon: Lock, type: 'SECURITY', description: 'Secrets Manager' },
    { id: '13', name: 'Framer', icon: Layout, type: 'WEB BUILDER', description: 'No-Code Sites' },
    { id: '14', name: 'Cleanshot X', icon: Camera, type: 'UTILITY', description: 'Screen Capture' },
    { id: '15', name: 'PixelSnap', icon: Maximize, type: 'UTILITY', description: 'Screen Measurement' },
    { id: '16', name: 'Linear', icon: Zap, type: 'ISSUES', description: 'Project Tracking' },
];

const hardwareInventory = [
    { id: 'H1', name: 'Lenovo LOQ 15IRX9', icon: Cpu, type: 'WORKSTATION', description: 'i5-13450HX · RTX 3050 6GB · 16GB DDR5 · 512GB SSD · 15.6" 144Hz' },
    { id: 'H2', name: 'EvoFox FireBlade', icon: Keyboard, type: 'INPUT', description: 'TKL Semi-Mechanical · Rainbow Backlit & Breathing Effect · Floating Keycaps · 19 Anti-Ghosting & 12 Multimedia Keys · Windows Lock Key · Braided Cable (Black)' },
    { id: 'H3', name: 'Cosmic Byte Firestorm', icon: Mouse, type: 'INPUT', description: 'RGB Wired Gaming Mouse · 67 Grams · 12400DPI · 1000Hz Polling · Pixart 3327 Sensor · 10M Switches · Paracord Cable · Software Support · Upgraded PTFE Feet (White) · Honeycomb Design' },
    { id: 'H4', name: 'Vivo V27', icon: Smartphone, type: 'MOBILE', description: '6.78" 120Hz AMOELD · Dimensity 7200 · 50MP Sony IMX766 · 4600mAh / 66W Fast Charging · 5G & Funtouch OS' },
    { id: 'H5', name: 'Oppo K10 5G', icon: Smartphone, type: 'MOBILE', description: '6.56" 90Hz HD+ · Dimensity 810 · Dual AI Camera · 5000mAh Fast Charging · 5G' },
    { id: 'H6', name: 'Crucial BX500', icon: HardDrive, type: 'STORAGE', description: '240GB 2.5" SATA III SSD · Micron 3D NAND · Up to 540 MB/s Sequential Read' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const InventoryTable = ({ title, status, items, accentColor, setHoveredItem }) => (
    <div className="mb-24">
        {/* Table Header Section */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
            <h3 className={`text-sm font-mono tracking-widest uppercase ${accentColor}`}>
                {title}
            </h3>
            <span className="text-white/40 text-xs font-mono">Status: {status}</span>
        </div>

        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-white/40 text-xs font-mono uppercase tracking-widest pl-4">
            <div className="col-span-1">ID</div>
            <div className="col-span-5 md:col-span-4">NAME</div>
            <div className="col-span-3">TYPE</div>
            <div className="col-span-3 md:col-span-4 text-right pr-4">DESCRIPTION</div>
        </div>

        {/* Table Rows */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
        >
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        variants={itemVariants}
                        key={item.id}
                        className="flex flex-col md:grid md:grid-cols-12 gap-4 py-6 md:py-5 border-b border-white/5 items-start md:items-center hover:bg-white/5 transition-colors duration-300 px-4 rounded-lg -mx-4 group cursor-default"
                        onMouseEnter={() => setHoveredItem && setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem && setHoveredItem(null)}
                    >
                        <div className="hidden md:block col-span-1 text-white/40 text-xs font-mono group-hover:text-white/80 transition-colors">
                            {item.id}
                        </div>
                        <div className="col-span-12 md:col-span-4 flex items-center gap-4 w-full">
                            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/30 transition-all flex-shrink-0">
                                <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden">
                                <span className="text-white font-bold text-lg md:text-xl group-hover:translate-x-1 transition-transform truncate">{item.name}</span>
                                <span className="md:hidden text-white/40 text-[10px] tracking-widest uppercase font-mono">{item.type}</span>
                            </div>
                        </div>
                        <div className="hidden md:block col-span-3 text-white/40 text-xs tracking-widest uppercase font-mono group-hover:text-white/80 transition-colors">
                            {item.type}
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right text-white/50 text-xs md:text-sm font-mono group-hover:text-white/90 transition-colors">
                            {item.description}
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    </div>
);

const UsesPage = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const hardwareGalleries = {
        'H1': {
            title: 'Lenovo LOQ 15IRX9 Gallery',
            images: [
                '/loq/81sI6re6MPL._SL1500_.jpg',
                '/loq/71odZ2qL+uL._SL1080_.jpg',
                '/loq/71br1pV8EML._SL1080_.jpg',
                '/loq/61Mh9FUUR6L._SL1080_.jpg',
                '/loq/61gOjU+BfhL._SL1500_.jpg',
                '/loq/61COcSY6SFL._SL1500_.jpg'
            ]
        },
        'H2': {
            title: 'EvoFox FireBlade Gallery',
            images: [
                '/keyboard/a98fd6ccbe1d4e3bb2e1be7396620f2b_190c5a2f42a_123.webp',
                '/keyboard/48372d2898064c379dcd359d8798743a_190c5a327b9_324.webp',
                '/keyboard/d64c6b746b114a6284728f449130c892_190c5a355aa_424.webp',
                '/keyboard/9df738267e0e452db5ce07d9e6a96d2a_190c5a39e55_524.webp'
            ]
        },
        'H3': {
            title: 'Cosmic Byte Firestorm Gallery',
            images: [
                '/mouse.jpeg',
                '/mouse/download (1).jpeg',
                '/mouse/download.jpeg',
                '/mouse/download.png',
                '/mouse/images (1).jpeg',
                '/mouse/images.jpeg',
                '/mouse/shopping.webp'
            ]
        }
    };

    const activeGallery = hoveredItem && hardwareGalleries[hoveredItem.id] ? hardwareGalleries[hoveredItem.id] : null;

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        let interval;
        if (activeGallery && activeGallery.images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % activeGallery.images.length);
            }, 1000); // Change image every 1 second
        } else {
            setCurrentImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [activeGallery]);

    return (
        <main className="bg-background">
            <section className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto relative overflow-hidden">
                {/* Very faint background glow */}
                <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="font-mono text-sm tracking-widest flex flex-col gap-2 relative">
                            {/* Connecting line */}
                            <div className="absolute left-0 top-12 bottom-[-40px] w-[1px] bg-white/10" />

                            <p className="text-[#3bda7e] ml-6">// SYSTEM_CONFIGURATION_V.25</p>
                            <p className="text-white/50 ml-6">USER: AYUSH_JENA</p>
                        </div>

                        <div className="pt-8 ml-6 relative">
                            {/* Connecting horizontal line */}
                            <div className="absolute left-0 top-0 w-full h-[1px] bg-white/10" />

                            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.8] tracking-tight uppercase font-heading text-white mt-12 mb-6">
                                USES
                            </h1>
                            <p className="text-white/60 text-xl md:text-3xl max-w-2xl leading-tight">
                                A curated manifest of hardware, software, and everyday carry.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 w-full">
                    <InventoryTable
                        title="01 / SOFTWARE_INVENTORY"
                        status="Active"
                        items={softwareInventory}
                        accentColor="text-[#3bda7e]"
                        setHoveredItem={setHoveredItem}
                    />

                    <InventoryTable
                        title="02 / HARDWARE_INVENTORY"
                        status="Deployed"
                        items={hardwareInventory}
                        accentColor="text-[#ff9500]"
                        setHoveredItem={setHoveredItem}
                    />
                </div>

                <AnimatePresence>
                    {activeGallery && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)',
                                x: mousePos.x + 40,
                                y: mousePos.y - 120
                            }}
                            exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                y: { type: "spring", stiffness: 300, damping: 30 }
                            }}
                            className="fixed top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center w-[350px]"
                        >
                            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl drop-shadow-[0_0_30px_rgba(255,149,0,0.3)] flex items-center justify-center">
                                <AnimatePresence mode="popLayout">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={activeGallery.images[currentImageIndex]}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full object-contain p-2"
                                        alt={activeGallery.title}
                                    />
                                </AnimatePresence>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-4 flex items-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            >
                                <div className="h-[1px] w-8 bg-white/20" />
                                <p className="text-[#ff9500] font-mono text-xs tracking-[0.3em] uppercase font-bold text-center">
                                    {activeGallery.title} <br className="hidden md:block" />({currentImageIndex + 1} / {activeGallery.images.length})
                                </p>
                                <div className="h-[1px] w-8 bg-white/20" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <CTASection />
        </main>
    );
};

export default UsesPage;

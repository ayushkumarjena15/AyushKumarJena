import { motion } from 'framer-motion';
import {
    Command, Globe, Code, FileText, Book, Brain, Database, Music,
    PenTool, CheckSquare, Calendar, Lock, Layout, Camera, Maximize, Zap,
    Cpu, Monitor, Keyboard, Mouse, Smartphone, Tablet, Headphones
} from 'lucide-react';

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
    { id: 'H1', name: 'MSI GF65 Thin', icon: Cpu, type: 'WORKSTATION', description: 'Intel i7, RTX 3060' },
    { id: 'H2', name: 'LG Ultrafine', icon: Monitor, type: 'DISPLAY', description: '5K External Monitor' },
    { id: 'H3', name: 'Red Gear 673', icon: Keyboard, type: 'INPUT', description: 'Mechanical Keyboard' },
    { id: 'H4', name: 'MX Master 3S', icon: Mouse, type: 'INPUT', description: 'Ergonomic Mouse' },
    { id: 'H5', name: 'iPhone 17 Pro', icon: Smartphone, type: 'MOBILE', description: 'Primary Device' },
    { id: 'H6', name: 'iPad 11th Gen', icon: Tablet, type: 'TABLET', description: 'Secondary Display' },
    { id: 'H7', name: 'AirPods Pro 2', icon: Headphones, type: 'AUDIO', description: 'Noise Cancellation' },
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

const InventoryTable = ({ title, status, items, accentColor }) => (
    <div className="mb-24">
        {/* Table Header Section */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
            <h3 className={`text-sm font-mono tracking-widest uppercase ${accentColor}`}>
                {title}
            </h3>
            <span className="text-white/40 text-xs font-mono">Status: {status}</span>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-white/40 text-xs font-mono uppercase tracking-widest pl-4">
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
                        className="grid grid-cols-12 gap-4 py-5 border-b border-white/5 items-center hover:bg-white/5 transition-colors duration-300 px-4 rounded-lg -mx-4 group cursor-default"
                    >
                        <div className="col-span-1 text-white/40 text-xs font-mono group-hover:text-white/80 transition-colors">
                            {item.id}
                        </div>
                        <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/30 transition-all">
                                <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-white font-bold text-lg md:text-xl group-hover:translate-x-1 transition-transform">{item.name}</span>
                        </div>
                        <div className="col-span-3 text-white/40 text-xs tracking-widest uppercase font-mono group-hover:text-white/80 transition-colors">
                            {item.type}
                        </div>
                        <div className="col-span-3 md:col-span-4 text-right text-white/50 text-xs md:text-sm font-mono group-hover:text-white/90 transition-colors">
                            {item.description}
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    </div>
);

const UsesPage = () => {
    return (
        <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-5xl mx-auto relative overflow-hidden">
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

                        <h1 className="text-[clamp(4rem,10vw,8rem)] font-black leading-[0.8] tracking-tight uppercase font-heading text-white mt-12 mb-6">
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
                />

                <InventoryTable
                    title="02 / HARDWARE_INVENTORY"
                    status="Deployed"
                    items={hardwareInventory}
                    accentColor="text-[#ff9500]"
                />
            </div>
        </section>
    );
};

export default UsesPage;

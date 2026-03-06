import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageSquare, Clock, Video, Globe2, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const CalendarUI = () => {
    // Generate dates for March 2026 starting on Sunday (March 1st is Sunday)
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl mx-auto bg-[#1a1a1a] rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl mt-8"
        >
            {/* Left Column: Details */}
            <div className="w-full md:w-[30%] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-6">
                <div>
                    <img
                        src="/profile.jpeg"
                        alt="Ayush Kumar Jena"
                        className="w-12 h-12 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-white/60 font-medium text-sm mb-1">Ayush Kumar Jena</h3>
                    <h2 className="text-white text-2xl font-bold mb-6">30 Min Meeting</h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-white/70">
                            <Clock size={18} className="text-white/50" />
                            <span className="text-sm font-medium">30m</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <Video size={18} className="text-[#3bda7e]" />
                            <span className="text-sm font-medium">Google Meet</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <Globe2 size={18} className="text-white/50" />
                            <span className="text-sm font-medium">Asia/Kolkata <span className="text-[10px] ml-1">▼</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Column: Calendar */}
            <div className="w-full md:w-[45%] p-8 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white font-bold text-lg">March <span className="text-white/40 font-normal">2026</span></h3>
                    <div className="flex gap-4 text-white/40">
                        <button className="hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                        <button className="hover:text-white transition-colors"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-2">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-white/50 text-[10px] font-bold tracking-wider">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                    {/* March 2026 starts on Sunday, so no empty slots needed before 1 */}
                    {dates.map(date => {
                        const isSelected = date === 9;
                        const isPast = date < 9; // Let's pretend today is the 9th
                        return (
                            <div key={date} className="flex justify-center">
                                <button
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all relative
                                        ${isSelected ? 'bg-white text-black font-bold' :
                                            isPast ? 'text-white/20' :
                                                'text-white/80 hover:bg-white/10 bg-[#222]'}`}
                                >
                                    {date}
                                    {/* Small dot under current date */}
                                    {date === 6 && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white/50"></span>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column: Time Slots */}
            <div className="w-full md:w-[25%] p-8 flex flex-col h-[500px] overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white font-medium">Mon <span className="text-white/40">09</span></h3>
                    <div className="flex bg-[#222] rounded-lg p-1 text-xs font-medium">
                        <button className="px-2 py-1 bg-white/10 rounded-md text-white">12h</button>
                        <button className="px-2 py-1 text-white/50 hover:text-white transition-colors">24h</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
                    {['9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm'].map(time => (
                        <button
                            key={time}
                            className="w-full border border-white/10 rounded-lg py-3 text-white/80 text-sm font-medium hover:border-white/30 hover:text-white transition-colors relative"
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ContactFormUI = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Send me a message</h2>
                <p className="text-white/60">Have a question or want to work together? Drop me a message!</p>
            </div>

            <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/90 ml-1">Name <span className="text-white/40 font-normal">(optional)</span></label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/90 ml-1">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-bold text-white/90">Message <span className="text-red-500">*</span></label>
                        <span className="text-xs text-white/30">0/1000</span>
                    </div>
                    <textarea
                        placeholder="What would you like to discuss?"
                        required
                        rows={6}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-black font-bold text-lg rounded-xl py-4 mt-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.98]"
                >
                    <Send size={18} /> Send Message
                </button>
            </form>
        </motion.div>
    );
};

const BookCallPage = () => {
    const [activeTab, setActiveTab] = useState('book'); // 'book' or 'message'

    return (
        <section className="min-h-screen bg-background pt-32 pb-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 pb-16"
            >
                <div className="flex-1 mt-8">
                    <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mb-8 pl-1">SCHEDULE / CONNECT / COLLABORATE</p>
                    <h1 className="text-[clamp(4.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-tight uppercase text-white font-heading select-none">
                        <span className="block">BOOK A</span>
                        <span className="block text-white/30">CALL</span>
                        <span className="block">WITH ME</span>
                    </h1>
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-4 lg:mt-0 relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden flex-shrink-0 group mx-auto lg:mx-0 shadow-2xl"
                >
                    <img
                        src="/profile.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                </motion.div>
            </motion.div>

            {/* Toggle Container */}
            <div className="w-full flex justify-center mb-12 relative z-20">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 shadow-lg ${activeTab === 'book'
                            ? 'bg-white text-black'
                            : 'bg-[#111] text-white hover:bg-[#222] border border-white/5'
                            }`}
                    >
                        <PhoneCall size={18} /> Book a Call
                    </button>

                    <button
                        onClick={() => setActiveTab('message')}
                        className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 shadow-lg ${activeTab === 'message'
                            ? 'bg-white text-black'
                            : 'bg-[#111] text-white hover:bg-[#222] border border-white/5'
                            }`}
                    >
                        <MessageSquare size={18} /> Send a Message
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[550px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'book' ? (
                        <CalendarUI key="calendar" />
                    ) : (
                        <ContactFormUI key="contact" />
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </section>
    );
};

export default BookCallPage;

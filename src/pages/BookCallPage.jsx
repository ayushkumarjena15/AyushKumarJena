import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageSquare, Clock, Video, Globe2, ChevronLeft, ChevronRight, Send, CheckCircle2, Loader2, UserPlus } from 'lucide-react';
import { supabase } from '../supabaseClient';

const CalendarUI = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, onNext }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // Start at March 2026 as per design
    const [showTimezone, setShowTimezone] = useState(false);
    const [timeFormat, setTimeFormat] = useState('12h');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Calendar Logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const timezones = [
        "Asia/Kolkata GMT +05:30",
        "Asia/Dubai GMT +04:00",
        "Europe/London GMT +00:00",
        "America/New_York GMT -05:00",
        "Asia/Tokyo GMT +09:00"
    ];

    const slots = ['9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm'];

    const formatTimeDisplay = (timeStr) => {
        if (timeFormat === '12h') return timeStr;

        let [time, modifier] = timeStr.split(/(am|pm)/);
        let [hours, minutes] = time.split(':');
        let h = parseInt(hours, 10);

        if (modifier === 'pm' && h < 12) h += 12;
        if (modifier === 'am' && h === 12) h = 0;

        return `${h.toString().padStart(2, '0')}:${minutes}`;
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setTimeout(() => onNext(), 300); // Small delay for visual feedback
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-5xl mx-auto bg-[#141414] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl mt-4"
        >
            {/* Details Panel */}
            <div className="w-full md:w-[32%] p-10 border-r border-white/5 bg-[#181818]/50 flex flex-col gap-10">
                <div className="space-y-6">
                    <img src="/profile.jpeg" className="w-14 h-14 rounded-full border border-white/10 shadow-2xl" alt="Ayush" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Ayush Kumar Jena</p>
                        <h2 className="text-3xl font-black text-white tracking-tighter leading-tight">30 Min Meeting</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3 text-white/60">
                            <Clock size={16} className="text-white/30" />
                            <span className="text-[13px] font-bold">30m</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60">
                            <Video size={16} className="text-[#3bda7e]" />
                            <span className="text-[13px] font-bold">Google Meet</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowTimezone(!showTimezone)}
                                className="flex items-center gap-3 text-white/60 hover:text-white transition-all group"
                            >
                                <Globe2 size={16} className="text-white/30 group-hover:text-white" />
                                <span className="text-[13px] font-bold">Asia/Kolkata</span>
                                <span className="text-[8px] opacity-40 translate-y-[1px]">▼</span>
                            </button>
                            <AnimatePresence>
                                {showTimezone && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-4 w-72 bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 z-50 shadow-2xl"
                                    >
                                        {timezones.map(tz => (
                                            <button
                                                key={tz}
                                                onClick={() => setShowTimezone(false)}
                                                className="w-full text-left px-5 py-3.5 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-white rounded-xl transition-all flex items-center justify-between"
                                            >
                                                {tz}
                                                {tz.includes('Kolkata') && <CheckCircle2 size={14} className="text-white/30" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Panel */}
            <div className="w-full md:w-[43%] p-10 border-r border-white/5">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-white font-black text-xl tracking-tight">{monthNames[month]} <span className="text-white/20 font-light">{year}</span></h3>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"><ChevronLeft size={20} /></button>
                        <button onClick={handleNextMonth} className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-y-6 gap-x-1 mb-4">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-white/30 text-[10px] font-black tracking-[0.2em]">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                    {blanks.map(i => <div key={`blank-${i}`} />)}
                    {dates.map(date => {
                        const isSelected = selectedDate === date;
                        const isToday = date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                        const isPast = new Date(year, month, date) < new Date().setHours(0, 0, 0, 0);

                        return (
                            <div key={date} className="flex justify-center">
                                <button
                                    onClick={() => !isPast && setSelectedDate(date)}
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold transition-all relative
                                        ${isSelected ? 'bg-white text-black shadow-xl' :
                                            isPast ? 'text-white/10 cursor-not-allowed opacity-50' :
                                                'text-white/60 hover:bg-white/5 bg-[#1a1a1a] border border-white/[0.02]'}`}
                                >
                                    {date}
                                    {isToday && !isSelected && <span className="absolute bottom-2 w-1 h-1 rounded-full bg-white/40"></span>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slots Panel */}
            <div className="w-full md:w-[25%] p-10 bg-[#121212] flex flex-col h-[580px]">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-white font-bold tracking-tight">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(year, month, selectedDate).getDay()]} <span className="text-white/30 font-light">{selectedDate.toString().padStart(2, '0')}</span>
                    </h3>
                    <div className="flex bg-white/5 rounded-xl p-1 text-[10px] font-black">
                        <button
                            onClick={() => setTimeFormat('12h')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${timeFormat === '12h' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}
                        >
                            12H
                        </button>
                        <button
                            onClick={() => setTimeFormat('24h')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${timeFormat === '24h' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}
                        >
                            24H
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar flex flex-col gap-3">
                    {slots.map(time => (
                        <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`w-full border border-white/5 rounded-xl py-4 text-xs font-black transition-all uppercase tracking-widest
                                ${selectedTime === time ? 'bg-white text-black border-white' : 'text-white/40 hover:border-white/20 hover:text-white bg-[#1a1a1a]'}`}
                        >
                            {formatTimeDisplay(time)}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ConfirmBookingUI = ({ selectedDate, selectedTime, onBack }) => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', notes: '' });

    const handleConfirm = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl mx-auto mt-12 bg-[#141414] rounded-[3rem] p-16 border border-white/5 text-center flex flex-col items-center gap-10 shadow-2xl"
            >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                    <CheckCircle2 size={42} className="text-green-500" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Booking Confirmed!</h2>
                    <p className="text-white/40 text-lg font-medium">Check your inbox for the calendar invite.</p>
                </div>
                <div className="bg-white/5 rounded-[2rem] p-8 w-full border border-white/[0.05]">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-3">Event Detail</p>
                    <p className="text-xl font-bold text-white tracking-tight">March {selectedDate}, 2026 at {selectedTime}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-white text-black font-black px-12 py-5 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                    Return to Portal
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto mt-4 bg-[#141414] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
            <div className="w-full md:w-[40%] p-10 bg-[#181818]/50 border-r border-white/5 flex flex-col gap-10">
                <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all -ml-2">
                    <ChevronLeft size={24} />
                </button>
                <div className="space-y-8">
                    <img src="/profile.jpeg" className="w-16 h-16 rounded-full border border-white/10" alt="Ayush" />
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Ayush Kumar Jena</p>
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">30 Min Meeting</h2>
                    </div>
                    <div className="space-y-5 pt-4">
                        <div className="flex items-center gap-3 text-white/60">
                            <Clock size={16} />
                            <span className="text-sm font-bold tracking-tight">30m</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60">
                            <Video size={16} className="text-[#3bda7e]" />
                            <span className="text-sm font-bold tracking-tight">Google Meet</span>
                        </div>
                        <div className="flex flex-col gap-2 p-5 bg-white/5 rounded-2xl border border-white/[0.05]">
                            <p className="text-sm font-bold text-white">Selected Date: March {selectedDate}, 2026</p>
                            <p className="text-sm font-bold text-white/60">{selectedTime}</p>
                        </div>
                        <div className="flex items-center gap-3 text-white/30 pt-2 ml-1">
                            <Globe2 size={14} />
                            <span className="text-[10px] font-black tracking-widest uppercase">Asia/Kolkata</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-12 flex flex-col gap-10">
                <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Confirm Details</h3>
                <form className="space-y-8" onSubmit={handleConfirm}>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Your Name *</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                            placeholder="Alex Riverside"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Email Address *</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                            placeholder="alex@domain.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Additional Notes</label>
                        <textarea
                            rows={4}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm resize-none"
                            placeholder="Share anything that will help prepare for the call."
                        />
                    </div>

                    <button type="button" className="text-[11px] font-black text-white/40 hover:text-white flex items-center gap-2 transition-all group ml-1">
                        <UserPlus size={16} className="text-white/20 group-hover:text-white transition-all" /> Add guests
                    </button>

                    <div className="pt-4 text-[10px] text-white/10 font-medium leading-relaxed">
                        By proceeding, you agree to Cal.com's <span className="underline cursor-pointer hover:text-white/30">Terms</span> and <span className="underline cursor-pointer hover:text-white/30">Privacy Policy</span>.
                    </div>

                    <div className="flex items-center justify-end gap-10 pt-4">
                        <button type="button" onClick={onBack} className="text-xs font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">Back</button>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-white text-black font-black px-12 py-5 rounded-2xl hover:bg-gray-200 transition-all shadow-2xl uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

const ContactFormUI = () => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl mx-auto mt-12 flex flex-col items-center text-center p-16 bg-[#141414] rounded-[3rem] border border-white/5 shadow-2xl"
            >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-10 border border-white/10">
                    <Send size={32} className="text-white animate-pulse" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tight">Signal Received</h2>
                <p className="text-white/40 mb-10 max-w-md font-medium text-lg">Your transmission has been propagated successfully.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="bg-white text-black font-black px-12 py-5 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-[10px]"
                >
                    New Transmission
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-3xl mx-auto mt-8 bg-[#141414] rounded-[2.5rem] p-16 border border-white/5 shadow-2xl"
        >
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Initialize <span className="text-gradient">Contact</span></h2>
                <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Curated technical discourse & deep-dives.</p>
            </div>

            <form className="grid gap-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Identity</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Full Name"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Message</label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Primary transmission payload content..."
                        rows={6}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4.5 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl py-6 mt-4 flex items-center justify-center gap-4 hover:bg-gray-200 transition-all shadow-2xl active:scale-[0.98]"
                >
                    Propagate Signal
                    <Send size={18} />
                </button>
            </form>
        </motion.div>
    );
};

const BookCallPage = () => {
    const [activeTab, setActiveTab] = useState('book'); // 'book' or 'message'
    const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Confirm
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedTime, setSelectedTime] = useState(null);

    return (
        <section className="min-h-screen bg-background pt-32 pb-40 max-w-7xl mx-auto relative overflow-visible px-4">
            <div className="absolute inset-0 hero-glow opacity-30 pointer-events-none" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 pb-20 px-6"
            >
                <div className="flex-1 mt-8">
                    <p className="text-white/20 text-[10px] font-black tracking-[0.6em] uppercase mb-10 pl-1">SCHEDULE / CONNECT / COLLABORATE</p>
                    <h1 className="text-[clamp(4.5rem,10vw,10rem)] font-black leading-[0.8] tracking-tighter uppercase text-white font-heading select-none">
                        <span className="block">BOOK A</span>
                        <span className="block text-white/20">CALL</span>
                        <span className="block italic font-serif text-white lowercase tracking-widest translate-y-4">with me.</span>
                    </h1>
                </div>

                <motion.div
                    className="mt-4 lg:mt-0 relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-[3.5rem] overflow-hidden flex-shrink-0 group mx-auto lg:mx-0 shadow-2xl border border-white/5"
                >
                    <img
                        src="/profile.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </motion.div>
            </motion.div>

            {/* Toggle Container - Cal.com Style */}
            <div className="w-full flex justify-center mb-16 relative z-20">
                <div className="flex bg-[#111] p-1.5 rounded-[1.8rem] border border-white/5 shadow-2xl backdrop-blur-xl">
                    <button
                        onClick={() => { setActiveTab('book'); setBookingStep(1); }}
                        className={`px-10 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all duration-700 ${activeTab === 'book'
                            ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)]'
                            : 'text-white/30 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <PhoneCall size={16} /> Book a Call
                    </button>

                    <button
                        onClick={() => setActiveTab('message')}
                        className={`px-10 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all duration-700 ${activeTab === 'message'
                            ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)]'
                            : 'text-white/30 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <MessageSquare size={16} /> Send a Message
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 px-4">
                <AnimatePresence mode="wait">
                    {activeTab === 'book' ? (
                        bookingStep === 1 ? (
                            <CalendarUI
                                key="calendar"
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime}
                                onNext={() => setBookingStep(2)}
                            />
                        ) : (
                            <ConfirmBookingUI
                                key="confirm"
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onBack={() => setBookingStep(1)}
                            />
                        )
                    ) : (
                        <ContactFormUI key="contact" />
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                .text-gradient {
                    background: linear-gradient(135deg, #fff 0%, #ffffff60 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
};

export default BookCallPage;

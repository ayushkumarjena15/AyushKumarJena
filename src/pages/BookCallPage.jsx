import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { PhoneCall, MessageSquare, Clock, Video, Globe2, ChevronLeft, ChevronRight, Send, CheckCircle2, Loader2, UserPlus, Search, X } from 'lucide-react';

// ── Comprehensive timezone list ──────────────────────────────────────────────
const ALL_TIMEZONES = [
    // Asia
    { id: 'Asia/Kolkata', label: 'India — Kolkata / Mumbai / Delhi', gmt: '+05:30', region: 'Asia' },
    { id: 'Asia/Colombo', label: 'Sri Lanka — Colombo', gmt: '+05:30', region: 'Asia' },
    { id: 'Asia/Kathmandu', label: 'Nepal — Kathmandu', gmt: '+05:45', region: 'Asia' },
    { id: 'Asia/Dhaka', label: 'Bangladesh — Dhaka', gmt: '+06:00', region: 'Asia' },
    { id: 'Asia/Karachi', label: 'Pakistan — Karachi', gmt: '+05:00', region: 'Asia' },
    { id: 'Asia/Kabul', label: 'Afghanistan — Kabul', gmt: '+04:30', region: 'Asia' },
    { id: 'Asia/Tashkent', label: 'Uzbekistan — Tashkent', gmt: '+05:00', region: 'Asia' },
    { id: 'Asia/Yangon', label: 'Myanmar — Yangon', gmt: '+06:30', region: 'Asia' },
    { id: 'Asia/Bangkok', label: 'Thailand — Bangkok', gmt: '+07:00', region: 'Asia' },
    { id: 'Asia/Ho_Chi_Minh', label: 'Vietnam — Ho Chi Minh City', gmt: '+07:00', region: 'Asia' },
    { id: 'Asia/Jakarta', label: 'Indonesia — Jakarta', gmt: '+07:00', region: 'Asia' },
    { id: 'Asia/Shanghai', label: 'China — Beijing / Shanghai', gmt: '+08:00', region: 'Asia' },
    { id: 'Asia/Singapore', label: 'Singapore', gmt: '+08:00', region: 'Asia' },
    { id: 'Asia/Kuala_Lumpur', label: 'Malaysia — Kuala Lumpur', gmt: '+08:00', region: 'Asia' },
    { id: 'Asia/Manila', label: 'Philippines — Manila', gmt: '+08:00', region: 'Asia' },
    { id: 'Asia/Taipei', label: 'Taiwan — Taipei', gmt: '+08:00', region: 'Asia' },
    { id: 'Asia/Seoul', label: 'South Korea — Seoul', gmt: '+09:00', region: 'Asia' },
    { id: 'Asia/Tokyo', label: 'Japan — Tokyo', gmt: '+09:00', region: 'Asia' },
    { id: 'Asia/Dubai', label: 'UAE — Dubai / Abu Dhabi', gmt: '+04:00', region: 'Asia' },
    { id: 'Asia/Riyadh', label: 'Saudi Arabia — Riyadh', gmt: '+03:00', region: 'Asia' },
    { id: 'Asia/Kuwait', label: 'Kuwait', gmt: '+03:00', region: 'Asia' },
    { id: 'Asia/Qatar', label: 'Qatar — Doha', gmt: '+03:00', region: 'Asia' },
    { id: 'Asia/Baghdad', label: 'Iraq — Baghdad', gmt: '+03:00', region: 'Asia' },
    { id: 'Asia/Tehran', label: 'Iran — Tehran', gmt: '+03:30', region: 'Asia' },
    { id: 'Asia/Beirut', label: 'Lebanon — Beirut', gmt: '+02:00', region: 'Asia' },
    { id: 'Asia/Jerusalem', label: 'Israel — Jerusalem / Tel Aviv', gmt: '+02:00', region: 'Asia' },
    { id: 'Asia/Amman', label: 'Jordan — Amman', gmt: '+02:00', region: 'Asia' },
    { id: 'Asia/Almaty', label: 'Kazakhstan — Almaty', gmt: '+06:00', region: 'Asia' },
    { id: 'Asia/Baku', label: 'Azerbaijan — Baku', gmt: '+04:00', region: 'Asia' },
    { id: 'Asia/Tbilisi', label: 'Georgia — Tbilisi', gmt: '+04:00', region: 'Asia' },
    { id: 'Asia/Yerevan', label: 'Armenia — Yerevan', gmt: '+04:00', region: 'Asia' },
    // Pacific / Oceania
    { id: 'Pacific/Auckland', label: 'New Zealand — Auckland', gmt: '+13:00', region: 'Pacific' },
    { id: 'Australia/Sydney', label: 'Australia — Sydney / Canberra', gmt: '+11:00', region: 'Pacific' },
    { id: 'Australia/Melbourne', label: 'Australia — Melbourne', gmt: '+11:00', region: 'Pacific' },
    { id: 'Australia/Brisbane', label: 'Australia — Brisbane / Queensland', gmt: '+10:00', region: 'Pacific' },
    { id: 'Australia/Adelaide', label: 'Australia — Adelaide', gmt: '+10:30', region: 'Pacific' },
    { id: 'Australia/Perth', label: 'Australia — Perth', gmt: '+08:00', region: 'Pacific' },
    { id: 'Pacific/Fiji', label: 'Fiji', gmt: '+12:00', region: 'Pacific' },
    { id: 'Pacific/Guam', label: 'Guam / Saipan', gmt: '+10:00', region: 'Pacific' },
    { id: 'Pacific/Honolulu', label: 'USA — Hawaii (Honolulu)', gmt: '-10:00', region: 'Pacific' },
    // Americas
    { id: 'America/New_York', label: 'USA — New York / Miami / Atlanta', gmt: '-05:00', region: 'Americas' },
    { id: 'America/Chicago', label: 'USA — Chicago / Dallas / Houston', gmt: '-06:00', region: 'Americas' },
    { id: 'America/Denver', label: 'USA — Denver / Phoenix', gmt: '-07:00', region: 'Americas' },
    { id: 'America/Los_Angeles', label: 'USA — Los Angeles / San Francisco', gmt: '-08:00', region: 'Americas' },
    { id: 'America/Anchorage', label: 'USA — Alaska (Anchorage)', gmt: '-09:00', region: 'Americas' },
    { id: 'America/Toronto', label: 'Canada — Toronto / Ottawa', gmt: '-05:00', region: 'Americas' },
    { id: 'America/Vancouver', label: 'Canada — Vancouver', gmt: '-08:00', region: 'Americas' },
    { id: 'America/Mexico_City', label: 'Mexico — Mexico City', gmt: '-06:00', region: 'Americas' },
    { id: 'America/Bogota', label: 'Colombia — Bogotá', gmt: '-05:00', region: 'Americas' },
    { id: 'America/Lima', label: 'Peru — Lima', gmt: '-05:00', region: 'Americas' },
    { id: 'America/Caracas', label: 'Venezuela — Caracas', gmt: '-04:00', region: 'Americas' },
    { id: 'America/Sao_Paulo', label: 'Brazil — São Paulo / Rio', gmt: '-03:00', region: 'Americas' },
    { id: 'America/Santiago', label: 'Chile — Santiago', gmt: '-03:00', region: 'Americas' },
    { id: 'America/Argentina/Buenos_Aires', label: 'Argentina — Buenos Aires', gmt: '-03:00', region: 'Americas' },
    // Europe
    { id: 'Europe/London', label: 'UK — London / Edinburgh', gmt: '+00:00', region: 'Europe' },
    { id: 'Europe/Lisbon', label: 'Portugal — Lisbon', gmt: '+00:00', region: 'Europe' },
    { id: 'Europe/Paris', label: 'France — Paris', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Berlin', label: 'Germany — Berlin / Frankfurt', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Rome', label: 'Italy — Rome / Milan', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Madrid', label: 'Spain — Madrid / Barcelona', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Amsterdam', label: 'Netherlands — Amsterdam', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Brussels', label: 'Belgium — Brussels', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Zurich', label: 'Switzerland — Zurich / Geneva', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Vienna', label: 'Austria — Vienna', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Stockholm', label: 'Sweden — Stockholm', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Oslo', label: 'Norway — Oslo', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Copenhagen', label: 'Denmark — Copenhagen', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Warsaw', label: 'Poland — Warsaw', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Prague', label: 'Czech Republic — Prague', gmt: '+01:00', region: 'Europe' },
    { id: 'Europe/Athens', label: 'Greece — Athens', gmt: '+02:00', region: 'Europe' },
    { id: 'Europe/Helsinki', label: 'Finland — Helsinki', gmt: '+02:00', region: 'Europe' },
    { id: 'Europe/Bucharest', label: 'Romania — Bucharest', gmt: '+02:00', region: 'Europe' },
    { id: 'Europe/Kiev', label: 'Ukraine — Kyiv', gmt: '+02:00', region: 'Europe' },
    { id: 'Europe/Istanbul', label: 'Turkey — Istanbul / Ankara', gmt: '+03:00', region: 'Europe' },
    { id: 'Europe/Moscow', label: 'Russia — Moscow / St. Petersburg', gmt: '+03:00', region: 'Europe' },
    // Africa
    { id: 'Africa/Cairo', label: 'Egypt — Cairo', gmt: '+02:00', region: 'Africa' },
    { id: 'Africa/Johannesburg', label: 'South Africa — Johannesburg / Cape Town', gmt: '+02:00', region: 'Africa' },
    { id: 'Africa/Nairobi', label: 'Kenya — Nairobi', gmt: '+03:00', region: 'Africa' },
    { id: 'Africa/Lagos', label: 'Nigeria — Lagos / Abuja', gmt: '+01:00', region: 'Africa' },
    { id: 'Africa/Accra', label: 'Ghana — Accra', gmt: '+00:00', region: 'Africa' },
    { id: 'Africa/Casablanca', label: 'Morocco — Casablanca / Rabat', gmt: '+01:00', region: 'Africa' },
    { id: 'Africa/Addis_Ababa', label: 'Ethiopia — Addis Ababa', gmt: '+03:00', region: 'Africa' },
    { id: 'Africa/Dar_es_Salaam', label: 'Tanzania — Dar es Salaam', gmt: '+03:00', region: 'Africa' },
    { id: 'Atlantic/Reykjavik', label: 'Iceland — Reykjavik', gmt: '+00:00', region: 'Europe' },
];

// India slots: 9:00 AM – 2:00 PM IST
const INDIA_SLOTS = [
    { istHour: 9, istMin: 0 },
    { istHour: 9, istMin: 30 },
    { istHour: 10, istMin: 0 },
    { istHour: 10, istMin: 30 },
    { istHour: 11, istMin: 0 },
    { istHour: 11, istMin: 30 },
    { istHour: 12, istMin: 0 },
    { istHour: 12, istMin: 30 },
    { istHour: 13, istMin: 0 },
    { istHour: 13, istMin: 30 },
    { istHour: 14, istMin: 0 },
];

// Convert an IST time to the displayed timezone
const convertISTtoTZ = (istHour, istMin, tzId, is12h) => {
    const utcMinutes = istHour * 60 + istMin - 330; // IST = UTC+5:30 → subtract 330 min
    let utcM = utcMinutes % (24 * 60);
    if (utcM < 0) utcM += 24 * 60;
    const utcH = Math.floor(utcM / 60);
    const utcMin2 = utcM % 60;

    const today = new Date();
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), utcH, utcMin2));

    return new Intl.DateTimeFormat('en-US', {
        timeZone: tzId,
        hour: 'numeric',
        minute: '2-digit',
        hour12: is12h,
    }).format(d);
};

// Get live GMT offset string for a timezone
const getLiveGMT = (tzId) => {
    try {
        const parts = new Intl.DateTimeFormat('en', { timeZone: tzId, timeZoneName: 'shortOffset' }).formatToParts(new Date());
        const off = parts.find(p => p.type === 'timeZoneName');
        return off ? off.value.replace('GMT', 'GMT ') : '';
    } catch { return ''; }
};

// Get current time in IST (UTC+5:30)
const nowIST = () => {
    const d = new Date();
    const utcMs = d.getTime() + d.getTimezoneOffset() * 60000;
    const ist = new Date(utcMs + 330 * 60000);
    return { hour: ist.getHours(), minute: ist.getMinutes() };
};

// Is a given date a weekend?
const isWeekend = (year, month, date) => {
    const day = new Date(year, month, date).getDay();
    return day === 0 || day === 6;
};

// Is this slot in the past (for today in IST)?
const isSlotPast = (slot, selDate, year, month) => {
    const today = new Date();
    const isToday = selDate === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    if (!isToday) return false;
    const { hour, minute } = nowIST();
    return slot.istHour * 60 + slot.istMin <= hour * 60 + minute;
};

// ── CalendarUI ───────────────────────────────────────────────────────────────
const CalendarUI = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedTimezone, setSelectedTimezone, onNext }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
    const [showTimezone, setShowTimezone] = useState(false);
    const [tzSearch, setTzSearch] = useState('');
    const [timeFormat, setTimeFormat] = useState('12h');
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, () => null);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const handleTimeSelect = (slot) => {
        setSelectedTime(slot);
        setTimeout(() => onNext(), 300);
    };

    const handleTzSelect = (tz) => {
        setSelectedTimezone(tz);
        setShowTimezone(false);
        setTzSearch('');
    };

    // Focus search when dropdown opens
    useEffect(() => {
        if (showTimezone && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 100);
        }
    }, [showTimezone]);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowTimezone(false);
                setTzSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const activeTz = ALL_TIMEZONES.find(t => t.id === selectedTimezone) || ALL_TIMEZONES[0];
    const liveOffset = getLiveGMT(selectedTimezone);

    const filteredTz = ALL_TIMEZONES.filter(tz => {
        const q = tzSearch.toLowerCase();
        return !q ||
            tz.label.toLowerCase().includes(q) ||
            tz.id.toLowerCase().includes(q) ||
            tz.region.toLowerCase().includes(q) ||
            tz.gmt.includes(q);
    });

    // Group filtered timezones by region
    const regions = [...new Set(filteredTz.map(t => t.region))];

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

                        {/* Timezone Selector */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowTimezone(!showTimezone)}
                                className="flex items-center gap-3 text-white/60 hover:text-white transition-all group text-left"
                            >
                                <Globe2 size={16} className="text-white/30 group-hover:text-white flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[13px] font-bold block truncate max-w-[160px]">{activeTz.id.split('/').pop().replace(/_/g, ' ')}</span>
                                    <span className="text-[10px] text-white/30">{liveOffset}</span>
                                </div>
                                <span className="text-[8px] opacity-40 translate-y-[1px] flex-shrink-0">▼</span>
                            </button>

                            <AnimatePresence>
                                {showTimezone && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-3 w-80 bg-[#1a1a1a] border border-white/10 rounded-2xl z-50 shadow-2xl overflow-hidden"
                                        style={{ maxHeight: '320px' }}
                                    >
                                        {/* Search */}
                                        <div className="p-3 border-b border-white/5 sticky top-0 bg-[#1a1a1a]">
                                            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
                                                <Search size={13} className="text-white/30 flex-shrink-0" />
                                                <input
                                                    ref={searchRef}
                                                    type="text"
                                                    value={tzSearch}
                                                    onChange={e => setTzSearch(e.target.value)}
                                                    placeholder="Search city, country, GMT..."
                                                    className="bg-transparent text-white text-xs font-medium outline-none w-full placeholder-white/20"
                                                />
                                                {tzSearch && (
                                                    <button onClick={() => setTzSearch('')} className="text-white/30 hover:text-white text-xs leading-none">✕</button>
                                                )}
                                            </div>
                                        </div>

                                        {/* List */}
                                        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '240px' }}>
                                            {regions.length === 0 ? (
                                                <p className="text-center text-white/20 text-xs py-8">No results</p>
                                            ) : regions.map(region => (
                                                <div key={region}>
                                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.25em] px-4 pt-3 pb-1">{region}</p>
                                                    {filteredTz.filter(t => t.region === region).map(tz => (
                                                        <button
                                                            key={tz.id}
                                                            onClick={() => handleTzSelect(tz.id)}
                                                            className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-white/60 hover:bg-white/5 hover:text-white transition-all flex items-center justify-between gap-2"
                                                        >
                                                            <span className="truncate">{tz.label}</span>
                                                            <span className="text-white/25 flex-shrink-0 font-mono text-[10px]">
                                                                {tz.id === selectedTimezone ? <CheckCircle2 size={12} className="text-white/50" /> : <span>{tz.gmt}</span>}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {selectedTimezone !== 'Asia/Kolkata' && (
                        <p className="text-[10px] text-white/20 font-medium leading-relaxed border-t border-white/5 pt-4">
                            Slots shown in your timezone.<br />Meeting hosted in India (IST UTC+5:30).
                        </p>
                    )}
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
                    {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                    {dates.map(date => {
                        const isSelected = selectedDate === date;
                        const isToday = date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                        const isPast = new Date(year, month, date) < new Date().setHours(0, 0, 0, 0);
                        const isWeekendDay = isWeekend(year, month, date);
                        const isDisabled = isPast || isWeekendDay;
                        return (
                            <div key={date} className="flex justify-center">
                                <button
                                    onClick={() => !isDisabled && setSelectedDate(date)}
                                    title={isWeekendDay ? 'Weekends unavailable' : undefined}
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold transition-all relative
                                        ${isSelected ? 'bg-white text-black shadow-xl' :
                                            isDisabled ? 'text-white/10 cursor-not-allowed opacity-40' :
                                                'text-white/60 hover:bg-white/5 bg-[#1a1a1a] border border-white/[0.02]'}`}
                                >
                                    {date}
                                    {isToday && !isSelected && <span className="absolute bottom-2 w-1 h-1 rounded-full bg-white/40"></span>}
                                    {isWeekendDay && !isPast && <span className="absolute top-1 right-1.5 w-1 h-1 rounded-full bg-red-500/40"></span>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slots Panel */}
            <div className="w-full md:w-[25%] p-10 bg-[#121212] flex flex-col h-[580px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold tracking-tight">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(year, month, selectedDate).getDay()]}{' '}
                        <span className="text-white/30 font-light">{selectedDate.toString().padStart(2, '0')}</span>
                    </h3>
                    <div className="flex bg-white/5 rounded-xl p-1 text-[10px] font-black">
                        <button onClick={() => setTimeFormat('12h')} className={`px-3 py-1.5 rounded-lg transition-all ${timeFormat === '12h' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>12H</button>
                        <button onClick={() => setTimeFormat('24h')} className={`px-3 py-1.5 rounded-lg transition-all ${timeFormat === '24h' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>24H</button>
                    </div>
                </div>

                {selectedTimezone !== 'Asia/Kolkata' && (
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.15em] mb-4">
                        Your time ({activeTz.id.split('/').pop().replace(/_/g, ' ')})
                    </p>
                )}

                <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar flex flex-col gap-3">
                    {isWeekend(year, month, selectedDate) ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-2">
                            <span className="text-2xl">🚫</span>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Weekends Off</p>
                            <p className="text-white/15 text-[10px]">Pick a Mon–Fri date</p>
                        </div>
                    ) : (
                        INDIA_SLOTS.map((slot) => {
                            const displayTime = convertISTtoTZ(slot.istHour, slot.istMin, selectedTimezone, timeFormat === '12h');
                            const isSelected = selectedTime && selectedTime.istHour === slot.istHour && selectedTime.istMin === slot.istMin;
                            const isPast = isSlotPast(slot, selectedDate, year, month);
                            return (
                                <button
                                    key={`${slot.istHour}-${slot.istMin}`}
                                    onClick={() => !isPast && handleTimeSelect(slot)}
                                    disabled={isPast}
                                    className={`w-full border rounded-xl py-3.5 text-xs font-black transition-all flex flex-col items-center gap-0.5
                                        ${isPast ? 'opacity-25 cursor-not-allowed border-white/5 text-white/20 bg-transparent' :
                                            isSelected ? 'bg-white text-black border-white' :
                                                'text-white/40 hover:border-white/20 hover:text-white bg-[#1a1a1a] border-white/5'}`}
                                >
                                    <span className="uppercase tracking-widest">{displayTime}</span>
                                    {selectedTimezone !== 'Asia/Kolkata' && !isPast && (
                                        <span className={`text-[9px] font-medium ${isSelected ? 'text-black/40' : 'text-white/20'}`}>
                                            {`${slot.istHour.toString().padStart(2, '0')}:${slot.istMin.toString().padStart(2, '0')} IST`}
                                        </span>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ── ConfirmBookingUI ─────────────────────────────────────────────────────────
const ConfirmBookingUI = ({ selectedDate, selectedTime, selectedTimezone, onBack }) => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', notes: '', topic: '' });
    const [guestEmails, setGuestEmails] = useState([]);
    const [showGuests, setShowGuests] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const timeLocal = convertISTtoTZ(selectedTime.istHour, selectedTime.istMin, selectedTimezone, false);
            const timeIST = `${selectedTime.istHour.toString().padStart(2, '0')}:${selectedTime.istMin.toString().padStart(2, '0')} IST`;
            const date = `March ${selectedDate}, 2026`;
            const filteredGuests = guestEmails.filter(g => g.trim());

            const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    topic: formData.topic,
                    notes: formData.notes || null,
                    guests: filteredGuests,
                    date,
                    timeIST,
                    timeLocal,
                    timezone: selectedTimezone,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            setStatus('success');
        } catch (err) {
            console.error('Booking failed:', err);
            setStatus('error');
        }
    };

    const activeTz = ALL_TIMEZONES.find(t => t.id === selectedTimezone) || ALL_TIMEZONES[0];
    const displayTime = selectedTime
        ? convertISTtoTZ(selectedTime.istHour, selectedTime.istMin, selectedTimezone, true)
        : '';
    const istStr = selectedTime
        ? `${selectedTime.istHour.toString().padStart(2, '0')}:${selectedTime.istMin.toString().padStart(2, '0')} IST`
        : '';

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl mx-auto mt-12 relative"
            >

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#141414] rounded-[3rem] p-16 border border-white/5 text-center flex flex-col items-center gap-10 shadow-2xl relative z-20 overflow-hidden"
                >
                    {/* Background glow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.15, 0.08] }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 30%, rgba(34,197,94,0.2) 0%, transparent 60%)',
                        }}
                    />

                    {/* Animated Checkmark */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        className="relative"
                    >
                        {/* Outer ring pulse */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 2], opacity: [0.4, 0.1, 0] }}
                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                            className="absolute inset-0 rounded-full border-2 border-green-500"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.3, 1.6], opacity: [0.3, 0.1, 0] }}
                            transition={{ delay: 0.7, duration: 1.5, ease: 'easeOut' }}
                            className="absolute inset-0 rounded-full border border-green-400"
                        />
                        {/* Main circle */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(34,197,94,0)',
                                    '0 0 30px 10px rgba(34,197,94,0.15)',
                                    '0 0 20px 5px rgba(34,197,94,0.08)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 relative"
                        >
                            <motion.div
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <CheckCircle2 size={48} className="text-green-500" strokeWidth={2} />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Title with staggered reveal */}
                    <div className="space-y-4 relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                            className="text-5xl font-black text-white tracking-tight uppercase italic"
                        >
                            Booking Request{' '}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                                className="text-green-400"
                            >
                                Sent!
                            </motion.span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="text-white/40 text-lg font-medium"
                        >
                            Your booking request has been sent. Confirmation within 24 hours.
                        </motion.p>
                    </div>

                    {/* Event detail card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="bg-white/[0.03] rounded-[2rem] p-8 w-full border border-white/[0.06] space-y-3 relative overflow-hidden"
                    >
                        {/* Shimmer effect on card */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ delay: 1.5, duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                                width: '50%',
                            }}
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4"
                        >
                            Event Detail
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3, duration: 0.4 }}
                            className="text-2xl font-bold text-white tracking-tight"
                        >
                            March {selectedDate}, 2026
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4, duration: 0.4 }}
                            className="text-white/60 font-semibold text-lg"
                        >
                            {displayTime} ({activeTz.id.split('/').pop().replace(/_/g, ' ')})
                        </motion.p>
                        {selectedTimezone !== 'Asia/Kolkata' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-white/30 text-sm"
                            >
                                {istStr} — India Standard Time
                            </motion.p>
                        )}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6 }}
                            className="flex items-center justify-center gap-2 pt-3 mt-2 border-t border-white/5"
                        >
                            <Video size={14} className="text-green-500/60" />
                            <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Google Meet · 30 min</span>
                        </motion.div>
                    </motion.div>

                    {/* Info notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        className="bg-blue-500/[0.06] border border-blue-500/10 rounded-2xl px-6 py-4 w-full"
                    >
                        <p className="text-[11px] text-white/30 font-medium leading-relaxed">
                            📌 <strong className="text-white/50">Pending Confirmation</strong> — I'll review and confirm within 24 hours.
                            You'll receive a confirmation email with the Google Meet link.
                        </p>
                    </motion.div>

                    {/* Return button with shimmer */}
                    <motion.button
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                        whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => window.location.reload()}
                        className="bg-white text-black font-black px-14 py-5 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-[0.2em] text-[10px] relative overflow-hidden group"
                    >
                        <span className="relative z-10">Return to Portal</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ delay: 2.5, duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
                        />
                    </motion.button>
                </motion.div>
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
                            <p className="text-sm font-bold text-white">March {selectedDate}, 2026</p>
                            <p className="text-sm font-bold text-white/80">{displayTime}</p>
                            <p className="text-xs text-white/40">{activeTz.label}</p>
                            {selectedTimezone !== 'Asia/Kolkata' && (
                                <p className="text-[11px] text-white/25 border-t border-white/5 pt-2 mt-1">{istStr} — India Standard Time</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-white/30 pt-2 ml-1">
                            <Globe2 size={14} />
                            <span className="text-[10px] font-black tracking-widest uppercase">{activeTz.id.split('/').pop().replace(/_/g, ' ')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-12 flex flex-col gap-10">
                <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Confirm Details</h3>
                <form className="space-y-8" onSubmit={handleConfirm}>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Your Name *</label>
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                            placeholder="" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Email Address *</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                            placeholder="" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">What would you like to discuss? *</label>
                        <input required type="text" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                            placeholder="e.g. Collaboration, Project review, Career advice..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Additional Notes</label>
                        <textarea rows={4} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm resize-none"
                            placeholder="Share anything that will help prepare for our call." />
                    </div>
                    {/* Add Guests */}
                    {showGuests ? (
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Add Guests</label>
                            {guestEmails.map((email, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            const updated = [...guestEmails];
                                            updated[idx] = e.target.value;
                                            setGuestEmails(updated);
                                        }}
                                        className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                                        placeholder=""
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setGuestEmails(guestEmails.filter((_, i) => i !== idx))}
                                        className="w-10 h-10 flex items-center justify-center rounded-full text-white/20 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setGuestEmails([...guestEmails, ''])}
                                className="flex items-center gap-2 text-[11px] font-black text-white/30 hover:text-white transition-all ml-1 mt-1"
                            >
                                <UserPlus size={14} /> Add another
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => { setShowGuests(true); setGuestEmails(['']); }}
                            className="text-[11px] font-black text-white/40 hover:text-white flex items-center gap-2 transition-all group ml-1">
                            <UserPlus size={16} className="text-white/20 group-hover:text-white transition-all" /> Add guests
                        </button>
                    )}
                    <div className="pt-4 text-[10px] text-white/10 font-medium leading-relaxed">
                        By proceeding, you agree to the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">Terms</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">Privacy Policy</a>.
                    </div>
                    {status === 'error' && (
                        <p className="text-red-400 text-xs font-semibold text-center">Something went wrong. Please try again or email me directly.</p>
                    )}
                    <div className="flex items-center justify-end gap-10 pt-4">
                        <button type="button" onClick={onBack} className="text-xs font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">Back</button>
                        <button type="submit" disabled={status === 'loading'}
                            className="bg-white text-black font-black px-12 py-5 rounded-2xl hover:bg-gray-200 transition-all shadow-2xl uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 disabled:opacity-50">
                            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

// ── ContactFormUI ────────────────────────────────────────────────────────────
const ContactFormUI = () => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            setStatus('success');
        } catch (err) {
            console.error('Message failed:', err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl mx-auto mt-12"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center p-16 bg-[#141414] rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
                >
                    {/* Background glow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.15, 0.08] }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 30%, rgba(59,130,246,0.2) 0%, transparent 60%)',
                        }}
                    />

                    {/* Animated Send Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        className="relative mb-10"
                    >
                        {/* Outer ring pulse */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 2], opacity: [0.4, 0.1, 0] }}
                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                            className="absolute inset-0 rounded-full border-2 border-blue-500"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.3, 1.6], opacity: [0.3, 0.1, 0] }}
                            transition={{ delay: 0.7, duration: 1.5, ease: 'easeOut' }}
                            className="absolute inset-0 rounded-full border border-blue-400"
                        />
                        {/* Main circle */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(59,130,246,0)',
                                    '0 0 30px 10px rgba(59,130,246,0.15)',
                                    '0 0 20px 5px rgba(59,130,246,0.08)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30"
                        >
                            {/* Paper plane fly-in animation */}
                            <motion.div
                                initial={{ x: -20, y: 20, opacity: 0, rotate: -45 }}
                                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Send size={36} className="text-blue-400" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Title with staggered reveal */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                        className="text-5xl font-black text-white mb-4 uppercase italic tracking-tight relative z-10"
                    >
                        Signal{' '}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="text-blue-400"
                        >
                            Received
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="text-white/40 mb-8 max-w-md font-medium text-lg relative z-10"
                    >
                        Your message has been transmitted successfully.
                    </motion.p>

                    {/* Info notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="bg-blue-500/[0.06] border border-blue-500/10 rounded-2xl px-6 py-4 w-full mb-10 relative overflow-hidden"
                    >
                        {/* Shimmer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ delay: 1.5, duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                                width: '50%',
                            }}
                        />
                        <p className="text-[11px] text-white/30 font-medium leading-relaxed">
                            ✉️ <strong className="text-white/50">Message Sent!</strong> — I'll get back to you as soon as possible.
                            You can also reach me directly at <span className="text-blue-400/60">ahalyajena28@gmail.com</span>
                        </p>
                    </motion.div>

                    {/* Button with shimmer */}
                    <motion.button
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                        whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStatus('idle')}
                        className="bg-white text-black font-black px-14 py-5 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-[0.2em] text-[10px] relative overflow-hidden"
                    >
                        <span className="relative z-10">New Transmission</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ delay: 2, duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
                        />
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-3xl mx-auto mt-8 bg-[#141414] rounded-[2.5rem] p-16 border border-white/5 shadow-2xl">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Initialize <span className="text-gradient">Contact</span></h2>
                <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Curated technical discourse & deep-dives.</p>
            </div>
            <form className="grid gap-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Identity</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Address</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com"
                            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all" />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Message</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Primary transmission payload content..." rows={6}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:outline-none focus:border-white/20 transition-all resize-none" />
                </div>
                {status === 'error' && (
                    <p className="text-red-400 text-xs font-semibold text-center">Something went wrong. Please try again or email me directly.</p>
                )}
                <button type="submit" disabled={status === 'loading'} className="w-full bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl py-6 mt-4 flex items-center justify-center gap-4 hover:bg-gray-200 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50">
                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <><span>Propagate Signal</span> <Send size={18} /></>}
                </button>
            </form>
        </motion.div>
    );
};

// ── BookCallPage ─────────────────────────────────────────────────────────────
const BookCallPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') === 'message' ? 'message' : 'book';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata');
    const contentRef = useRef(null);

    const switchTab = (tab) => {
        setActiveTab(tab);
        if (tab === 'book') setBookingStep(1);
        setSearchParams({ tab });
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    };

    return (
        <section className="min-h-screen bg-background pt-32 pb-40 max-w-7xl mx-auto relative overflow-visible px-4">
            <div className="absolute inset-0 hero-glow opacity-30 pointer-events-none" />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 pb-20 px-6">
                <div className="flex-1 mt-8">
                    <p className="text-white/20 text-[10px] font-black tracking-[0.6em] uppercase mb-10 pl-1">SCHEDULE / CONNECT / COLLABORATE</p>
                    <h1 className="text-[clamp(4.5rem,10vw,10rem)] font-black leading-[0.8] tracking-tighter uppercase text-white font-heading select-none">
                        <span className="block">BOOK A</span>
                        <span className="block text-white/20">CALL</span>
                        <span className="block italic font-serif text-white lowercase tracking-widest translate-y-4">with me.</span>
                    </h1>
                </div>
                <motion.div className="mt-4 lg:mt-0 relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-[3.5rem] overflow-hidden flex-shrink-0 group mx-auto lg:mx-0 shadow-2xl border border-white/5">
                    <img src="/profile.jpeg" alt="Profile" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-2" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </motion.div>
            </motion.div>

            <div className="w-full flex justify-center mb-16 relative z-20">
                <div className="flex bg-[#111] p-1.5 rounded-[1.8rem] border border-white/5 shadow-2xl backdrop-blur-xl">
                    <button onClick={() => switchTab('book')}
                        className={`px-10 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all duration-700 ${activeTab === 'book' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                        <PhoneCall size={16} /> Book a Call
                    </button>
                    <button onClick={() => switchTab('message')}
                        className={`px-10 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all duration-700 ${activeTab === 'message' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.15)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                        <MessageSquare size={16} /> Send a Message
                    </button>
                </div>
            </div>

            <div className="relative z-10 px-4" ref={contentRef}>
                <AnimatePresence mode="wait">
                    {activeTab === 'book' ? (
                        bookingStep === 1 ? (
                            <CalendarUI key="calendar"
                                selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                                selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                                selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone}
                                onNext={() => setBookingStep(2)} />
                        ) : (
                            <ConfirmBookingUI key="confirm"
                                selectedDate={selectedDate} selectedTime={selectedTime}
                                selectedTimezone={selectedTimezone}
                                onBack={() => setBookingStep(1)} />
                        )
                    ) : (
                        <ContactFormUI key="contact" />
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
                .text-gradient { background: linear-gradient(135deg, #fff 0%, #ffffff60 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            `}</style>
        </section>
    );
};

export default BookCallPage;

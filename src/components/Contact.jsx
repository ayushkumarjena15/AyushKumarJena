import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            // Simulate submission
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <section id="contact" className="py-32 border-t border-white/5 relative bg-grid">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-accent2 tracking-tighter font-heading italic">
                        Initialize <span className="text-gradient">Contact</span>
                    </h2>
                    <p className="text-primary max-w-lg mx-auto text-lg md:text-xl font-light">
                        Open for strategic collaborations, architectural deep-dives, or curated technical discourse.
                    </p>
                </div>

                <motion.div
                    className="glass-card p-12 border border-white/5 hover:border-accent1/20 transition-all duration-1000 bg-surface/10 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="grid md:grid-cols-2 gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-[10px] font-black text-secondary tracking-[0.4em] uppercase mb-2">Subject Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-primary focus:outline-none focus:border-accent1 focus:ring-1 focus:ring-accent1/20 transition-all duration-500 placeholder:text-secondary/30"
                                        placeholder="Identification"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-[10px] font-black text-secondary tracking-[0.4em] uppercase mb-2">Electronic Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-primary focus:outline-none focus:border-accent1 focus:ring-1 focus:ring-accent1/20 transition-all duration-500 placeholder:text-secondary/30"
                                        placeholder="sender@domain.tld"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label htmlFor="message" className="block text-[10px] font-black text-secondary tracking-[0.4em] uppercase mb-2">Transmission Data</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-primary focus:outline-none focus:border-accent1 focus:ring-1 focus:ring-accent1/20 transition-all duration-500 resize-none placeholder:text-secondary/30"
                                        placeholder="Primary payload content..."
                                    ></textarea>
                                </div>
                                <motion.button
                                    type="submit"
                                    className="md:col-span-2 w-full bg-accent1 hover:bg-gold-light text-background font-black py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 group shadow-2xl shadow-accent1/20 uppercase tracking-widest text-xs"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Broadcast Signal
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                className="text-center py-20 flex flex-col items-center justify-center space-y-8"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="w-24 h-24 bg-accent1/10 rounded-full flex items-center justify-center border border-accent1/20">
                                    <Send size={32} className="text-accent1 animate-pulse" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-accent2 font-heading uppercase tracking-widest italic">Signal Propagated</h3>
                                    <p className="text-primary font-light text-lg">Transmission successfully received. Anticipate response within 24-48 standard orbital hours.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section >
    );
};

export default Contact;

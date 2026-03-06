import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Pin, Heart } from 'lucide-react';

const signatures = [
    { id: 1, name: 'Ayush Kumar Jena', date: 'JAN 1', message: 'Welcome ❤️', isPinned: true, seed: 'Ayush1' },
    { id: 2, name: 'Laura', date: 'FEB 22', message: 'Amazing UI and smooth interactions! Loved it!', seed: 'LauraX' },
    { id: 3, name: 'Kaushal S', date: 'FEB 22', message: 'Nice Site !', seed: 'Kaushal1' },
    { id: 4, name: 'Dhruv Sharma', date: 'FEB 21', message: 'Great and inspiring work buddy ! 🤙', seed: 'Dhruv1' },
    { id: 5, name: 'Prashant Chouhan', date: 'FEB 21', message: 'lovelyyyy', seed: 'Prashant2' },
    { id: 6, name: 'chintan', date: 'FEB 16', message: 'Lovely site bro', seed: 'Chintan1' },
    { id: 7, name: 'Omkar', date: 'FEB 16', message: 'Kindly provide me with the code, sir.', seed: 'Omkar1' },
    { id: 8, name: 'Sameer Sahu', date: 'FEB 4', message: 'Great work dude keep inspiring. Looking at ur UI design and smooth motions i must say u have great taste in designing. HOPE U DO GOOD.....', likedBy: 'Ayush', seed: 'Sameer1' },
    { id: 9, name: 'Wade Namada', date: 'FEB 2', message: 'blown away this is mad impressive', seed: 'Wade1' },
    { id: 10, name: 'Srimadhavan G', date: 'FEB 2', message: 'Mythical portfolio pull', seed: 'Sri3' },
    { id: 11, name: 'harshit yadav', date: 'FEB 1', message: 'It\'s cool , very very cool website', seed: 'Harshit2' },
    { id: 12, name: 'Mr Diggaj', date: 'FEB 1', message: 'nice tho', seed: 'Diggaj1' },
    { id: 13, name: 'Varun', date: 'FEB 1', message: 'This is such a high-quality premium portfolio 🚀', seed: 'Varun1' },
    { id: 14, name: 'bhavneet singh', date: 'JAN 31', message: 'Cool portfolio bhai nice use of motions 🤩', seed: 'Bhavneet1' },
    { id: 15, name: 'Sweety Nagar', date: 'JAN 31', message: 'Woohoo! 🤩 Your portfolio is LIIKEEE 🔥! The animation is so smooth, it\'s like art in motion! 🎨', likedBy: 'Ayush', seed: 'Sweety1' },
    { id: 16, name: 'Vanshika Yadav', date: 'JAN 30', message: 'Animations are so smooth , loved it 💖', seed: 'Vanshika1' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
};

const SignatureCard = ({ name, date, message, isPinned, likedBy, seed }) => (
    <motion.div
        variants={itemVariants}
        className={`relative bg-[#0d0d0d] rounded-2xl p-6 flex flex-col h-full ${isPinned ? 'border border-[#2563eb] shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-1 ring-[#2563eb]/50' : 'border border-white/5 hover:border-white/10 transition-colors duration-300'}`}
    >
        {isPinned && (
            <div className="absolute -top-3 -right-3 bg-[#2563eb] w-7 h-7 rounded-full flex items-center justify-center z-10 shadow-lg">
                <Pin size={12} className="text-white fill-white" />
            </div>
        )}

        {/* Giant Quote mark in the background */}
        <div className="absolute top-2 right-4 text-white/[0.04] font-serif text-8xl leading-none italic pointer-events-none select-none">
            "
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
            <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`}
                alt={name}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/5"
            />
            <div>
                <h4 className="text-white font-bold text-sm">{name}</h4>
                <p className="text-white/30 text-[10px] uppercase font-mono mt-0.5 tracking-wider">{date}</p>
            </div>
        </div>

        <p className="text-white/70 text-sm leading-relaxed flex-grow relative z-10 mb-2">
            {message}
        </p>

        {(isPinned || likedBy) && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                {isPinned && (
                    <div className="flex items-center gap-2 text-[#2563eb]">
                        <Pin size={12} className="fill-[#2563eb]" />
                        <span className="text-xs font-bold">Pinned</span>
                    </div>
                )}
                {likedBy && !isPinned && (
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[#ec4899] text-[11px] italic font-medium">Liked by {likedBy}</span>
                        <Heart size={14} className="text-[#ec4899] fill-[#ec4899]" />
                    </div>
                )}
            </div>
        )}
    </motion.div>
);

const GuestbookPage = () => {
    return (
        <section className="min-h-screen bg-background pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-12 pb-24"
            >
                <div className="flex-1 mt-8 lg:mt-16">
                    <p className="text-white/40 text-[11px] font-mono tracking-[0.3em] uppercase mb-8 pl-1">LEAVE YOUR SIGNATURE</p>
                    <h1 className="flex flex-col">
                        <span className="text-[clamp(4.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-tight uppercase text-white font-heading select-none">
                            GUEST
                        </span>
                        <span className="text-[clamp(4.5rem,10vw,8.5rem)] font-serif italic text-white/[0.35] leading-[0.85] tracking-tight pl-2 md:pl-6 -mt-3 select-none">
                            book
                        </span>
                    </h1>
                </div>

                <div className="w-full lg:w-[420px] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-10 flex-shrink-0 relative">
                    <h2 className="text-3xl font-bold text-white mb-0.5 tracking-tight">Leave your</h2>
                    <h3 className="text-[2.5rem] font-serif italic text-white/50 mb-6">Signature!</h3>

                    <p className="text-white/50 text-[13px] mb-10 leading-relaxed max-w-[90%]">
                        Sign in to leave your mark, customize your profile, and connect with other visitors.
                    </p>

                    <div className="flex flex-col gap-4">
                        <button className="w-full bg-white text-black py-3.5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20">
                            <FcGoogle size={20} /> <span className="text-[15px]">Google</span>
                        </button>
                        <button className="w-full bg-[#1a1a1a] border border-white/10 text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#222] transition-colors shadow-lg shadow-black/50">
                            <FaGithub size={20} /> <span className="text-[15px]">GitHub</span>
                        </button>
                    </div>

                    <p className="text-center text-white/30 text-[10px] mt-8 font-medium">
                        By joining, you agree to our Terms of Service.
                    </p>
                </div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-[1px] w-8 md:w-24 bg-white/5"></div>
                <p className="text-white/30 text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase whitespace-nowrap">RECENT SIGNATURES</p>
                <div className="h-[1px] w-8 md:w-24 bg-white/5"></div>
            </div>

            {/* Masonry-like Grid for Signatures */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {signatures.map((sig) => (
                    <SignatureCard key={sig.id} {...sig} />
                ))}
            </motion.div>

            {/* Load More Button */}
            <div className="w-full flex justify-center mt-16">
                <button className="px-8 py-3 bg-transparent border border-white/10 rounded-full text-white/70 text-sm font-bold hover:bg-white/5 hover:text-white transition-colors duration-300">
                    Load More
                </button>
            </div>
        </section>
    );
};

export default GuestbookPage;

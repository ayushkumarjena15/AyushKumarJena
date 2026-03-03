import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let hue = 0;

        const resize = () => {
            canvas.width = 200;
            canvas.height = 200;
        };
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, 200, 200);
            const cx = 100;
            const cy = 100;
            const r = 70;

            // Glowing ring
            for (let i = 0; i < 360; i += 2) {
                const angle = (i * Math.PI) / 180;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);

                const colorHue = (hue + i) % 360;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${colorHue}, 70%, 60%, 0.6)`;
                ctx.fill();
            }

            // Inner glow
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            gradient.addColorStop(0, `hsla(${hue}, 60%, 50%, 0.05)`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 200, 200);

            hue = (hue + 0.5) % 360;
            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Text */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight flex items-start gap-4">
                        <span className="text-3xl mt-2">👋</span>
                        <span>
                            Let's create<br />
                            <span className="text-secondary font-light">something real.</span>
                        </span>
                    </h2>
                </motion.div>

                {/* Animated Ring */}
                <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-40 h-40 md:w-48 md:h-48"
                        style={{ imageRendering: 'auto' }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;

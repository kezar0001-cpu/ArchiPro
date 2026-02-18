import { motion } from 'framer-motion';
import { MapPin, Clock, Activity } from 'lucide-react';

export default function Hero() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-end pb-16 pt-24 px-8
                 max-w-[1440px] mx-auto overflow-hidden"
        >
            {/* ── Blueprint Grid Overlay ── */}
            <div className="grid-overlay" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} />
                ))}
            </div>

            {/* ── Decorative Grid Coordinates ── */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute top-24 right-8 font-mono text-xs text-muted tracking-[0.2em] uppercase select-none"
                aria-hidden="true"
            >
                X: 00 &nbsp; Y: 00 &nbsp; Z: 01
            </motion.span>

            {/* ── Main Content ── */}
            <div className="relative z-10 flex flex-col gap-8">

                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-3"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                    </span>
                    <span className="font-mono text-sm text-accent tracking-[0.2em] uppercase">
                        Currently Building
                    </span>
                </motion.div>

                {/* Headline */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                        className="font-sans font-bold text-ink uppercase leading-[0.9]
                       text-[clamp(3rem,8vw,8rem)] tracking-[-0.02em]"
                    >
                        HADI LAL
                    </motion.h1>
                </div>
                <div className="overflow-hidden -mt-6">
                    <motion.h1
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.45 }}
                        className="font-sans font-bold text-ink uppercase leading-[0.9]
                       text-[clamp(3rem,8vw,8rem)] tracking-[-0.02em]"
                    >
                        DULEIMI<span className="text-accent">.</span>
                    </motion.h1>
                </div>

                {/* Animated Divider */}
                <motion.hr
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
                    className="brutal-divider origin-left w-full max-w-2xl"
                />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="font-mono text-base md:text-lg text-muted tracking-[0.25em] uppercase"
                >
                    LAUNCHING SOON — PORTFOLIO IN CONSTRUCTION
                </motion.p>

                {/* ── Title Block (Architectural Drawing Style) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-8 w-full max-w-md border-[3px] border-ink bg-paper"
                >
                    {/* Title block header */}
                    <div className="border-b-[3px] border-ink px-4 py-2">
                        <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
                            PROJECT INFO
                        </span>
                    </div>

                    {/* Title block rows */}
                    <div className="grid grid-cols-2 divide-x-[3px] divide-ink">
                        <div className="px-4 py-3 border-b-[3px] border-ink">
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin size={12} strokeWidth={3} className="text-accent" />
                                <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
                                    Location
                                </span>
                            </div>
                            <span className="font-sans text-sm font-semibold text-ink">
                                Melbourne, AU
                            </span>
                        </div>

                        <div className="px-4 py-3 border-b-[3px] border-ink">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock size={12} strokeWidth={3} className="text-accent" />
                                <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
                                    Local Time
                                </span>
                            </div>
                            <span className="font-sans text-sm font-semibold text-ink">
                                {timeString} AEST
                            </span>
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Activity size={12} strokeWidth={3} className="text-accent" />
                            <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
                                Status
                            </span>
                        </div>
                        <span className="font-sans text-sm font-semibold text-accent">
                            ● Under Construction
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Vertical Section Label ── */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-16 right-8 font-mono text-xs text-muted tracking-[0.15em] uppercase
                   origin-bottom-right -rotate-90 select-none hidden md:block"
                aria-hidden="true"
            >
                SECTION 001 — HERO
            </motion.span>
        </section>
    );
}

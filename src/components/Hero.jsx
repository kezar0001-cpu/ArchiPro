import { motion } from 'framer-motion';
import { MapPin, Clock, Activity } from 'lucide-react';

/**
 * Hero Section — Grayscale Video Background
 *
 * Displays a muted, autoplay, looping video rendered through a grayscale(100%)
 * CSS filter. A gradient overlay (stronger at the bottom) ensures white
 * typography remains crisp and readable.
 *
 * Props are CMS-driven (Supabase):
 *   - videoUrl:       CDN URL to the hero video file
 *   - headline:       Use \n for line breaks
 *   - subheadline:    Tagline text
 *   - overlayOpacity: 0–1 value controlling overlay darkness (default 0.55)
 */
export default function Hero({
    videoUrl = null,
    headline = null,
    subheadline = null,
    overlayOpacity = 0.55,
    heroStatus = null,
}) {
    const displayHeadline = headline || 'HADIL AL-\nDULEIMI';
    const displaySub = subheadline || 'ARCHITECT & DESIGNER — SYDNEY, AU';
    const displayStatus = heroStatus || 'Available for Projects';
    const headlineLines = displayHeadline.split('\n');

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    // Build dynamic overlay gradient from the overlayOpacity prop
    const overlayStyle = {
        background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, ${overlayOpacity * 0.6}) 0%,
      rgba(0, 0, 0, ${overlayOpacity * 0.85}) 50%,
      rgba(0, 0, 0, ${Math.min(overlayOpacity * 1.3, 0.95)}) 100%
    )`,
    };

    return (
        <section id="hero" className="hero-video-container">
            {/* ── Grayscale Video / Black Fallback ── */}
            {videoUrl ? (
                <video
                    className="hero-video"
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            ) : (
                <div className="hero-video bg-black" />
            )}

            {/* ── Monochrome Gradient Overlay ── */}
            <div className="hero-overlay" style={overlayStyle} />

            {/* ── Content ── */}
            <div className="hero-content min-h-screen flex flex-col justify-end pb-16 pt-24 section-px max-w-[1400px] mx-auto">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white status-dot" />
                    </span>
                    <span className="font-mono text-sm text-white tracking-[0.2em] uppercase">
                        {displayStatus}
                    </span>
                </motion.div>

                {/* Headline — massively typeset, white text */}
                {headlineLines.map((line, idx) => (
                    <div key={idx} className="overflow-hidden">
                        <motion.h1
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.33, 1, 0.68, 1],
                                delay: 0.3 + idx * 0.15,
                            }}
                            className="font-sans font-bold text-white uppercase leading-[0.9]
                         text-[clamp(3rem,8vw,8rem)] tracking-[-0.02em]
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                        >
                            {line}
                            {idx === headlineLines.length - 1 && (
                                <span className="text-grey">.</span>
                            )}
                        </motion.h1>
                    </div>
                ))}

                {/* Animated Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
                    className="origin-left w-full max-w-2xl mt-8 h-[3px] bg-white"
                />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="font-mono text-base md:text-lg text-grey tracking-[0.25em] uppercase mt-6"
                >
                    {displaySub}
                </motion.p>

                {/* ── Title Block (Architectural Drawing Style) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-10 w-full max-w-md border-[3px] border-white/80
                     backdrop-blur-sm bg-black/20"
                >
                    {/* Title block header */}
                    <div className="border-b-[3px] border-white/80 px-4 py-2">
                        <span className="font-mono text-xs text-grey tracking-[0.2em] uppercase">
                            PROJECT INFO
                        </span>
                    </div>

                    {/* Title block rows */}
                    <div className="grid grid-cols-2 divide-x-[3px] divide-white/80">
                        <div className="px-4 py-3 border-b-[3px] border-white/80">
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin size={12} strokeWidth={3} className="text-grey" />
                                <span className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase">
                                    Location
                                </span>
                            </div>
                            <span className="font-sans text-sm font-semibold text-white">
                                Sydney, AU
                            </span>
                        </div>

                        <div className="px-4 py-3 border-b-[3px] border-white/80">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock size={12} strokeWidth={3} className="text-grey" />
                                <span className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase">
                                    Local Time
                                </span>
                            </div>
                            <span className="font-sans text-sm font-semibold text-white">
                                {timeString} AEST
                            </span>
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Activity size={12} strokeWidth={3} className="text-grey" />
                            <span className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase">
                                Status
                            </span>
                        </div>
                        <span className="font-sans text-sm font-semibold text-white">
                            ● {displayStatus}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Vertical Section Label ── */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-16 right-8 font-mono text-xs text-grey tracking-[0.15em] uppercase
                   origin-bottom-right -rotate-90 select-none hidden md:block z-10"
                aria-hidden="true"
            >
                SECTION 001 — HERO
            </motion.span>
        </section>
    );
}

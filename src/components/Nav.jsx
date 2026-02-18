import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
];

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* ── Desktop Nav ── */}
            <nav
                id="main-nav"
                className="fixed top-0 left-0 right-0 z-50 bg-paper border-b-[3px] border-ink"
            >
                <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
                    {/* Logotype */}
                    <a
                        href="/"
                        id="nav-logo"
                        className="font-sans font-bold text-ink text-lg tracking-[0.15em] uppercase select-none
                       hover:text-accent transition-colors duration-150"
                    >
                        HADI<span className="text-accent">.</span>
                    </a>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="font-mono text-sm text-ink tracking-[0.1em] uppercase
                             relative group transition-colors duration-150 hover:text-accent"
                                >
                                    {link.label}
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-[3px] bg-accent
                               group-hover:w-full transition-all duration-300 ease-out"
                                    />
                                </a>
                            </li>
                        ))}
                        {/* CTA */}
                        <li>
                            <a
                                href="mailto:hello@hadilalduleimi.com"
                                id="nav-cta"
                                className="inline-flex items-center gap-1 px-4 py-2
                           bg-ink text-paper font-mono text-sm tracking-[0.1em] uppercase
                           border-[3px] border-ink brutal-hover brutal-shadow-sm
                           hover:bg-accent hover:border-accent"
                            >
                                LET'S TALK
                                <ArrowUpRight size={14} strokeWidth={3} />
                            </a>
                        </li>
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        id="nav-mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-50 p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X size={24} strokeWidth={3} className="text-paper" />
                        ) : (
                            <Menu size={24} strokeWidth={3} className="text-ink" />
                        )}
                    </button>
                </div>
            </nav>

            {/* ── Mobile Overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-12"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.08 }}
                                className="text-paper font-sans font-bold text-5xl tracking-[0.15em] uppercase
                           hover:text-accent transition-colors duration-150"
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        <motion.a
                            href="mailto:hello@hadilalduleimi.com"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            onClick={() => setIsOpen(false)}
                            className="mt-8 inline-flex items-center gap-2 px-6 py-3
                         bg-accent text-ink font-mono text-lg tracking-[0.1em] uppercase
                         border-[3px] border-accent"
                        >
                            LET'S TALK
                            <ArrowUpRight size={20} strokeWidth={3} />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

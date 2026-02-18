import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
];

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ── Desktop Nav ── */}
            <nav
                id="main-nav"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-grey-light border-b-[3px] border-black'
                        : 'bg-transparent border-b-[3px] border-transparent'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
                    {/* Logotype */}
                    <a
                        href="/"
                        id="nav-logo"
                        className={`font-sans font-bold text-lg tracking-[0.15em] uppercase select-none
                       transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'
                            } hover:text-grey`}
                    >
                        HADI<span className="text-grey">.</span>
                    </a>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={`font-mono text-sm tracking-[0.1em] uppercase
                             relative group transition-colors duration-300
                             ${scrolled ? 'text-black' : 'text-white'}
                             hover:text-grey`}
                                >
                                    {link.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 w-0 h-[3px]
                               ${scrolled ? 'bg-black' : 'bg-white'}
                               group-hover:w-full transition-all duration-300 ease-out`}
                                    />
                                </a>
                            </li>
                        ))}
                        {/* CTA */}
                        <li>
                            <a
                                href="mailto:hello@hadilalduleimi.com"
                                id="nav-cta"
                                className={`inline-flex items-center gap-1 px-4 py-2
                           font-mono text-sm tracking-[0.1em] uppercase
                           border-[3px] brutal-hover brutal-shadow-sm
                           transition-colors duration-300
                           ${scrolled
                                        ? 'bg-black text-white border-black hover:bg-grey hover:border-grey'
                                        : 'bg-white text-black border-white hover:bg-grey-light hover:border-grey-light'
                                    }`}
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
                            <X size={24} strokeWidth={3} className="text-white" />
                        ) : (
                            <Menu
                                size={24}
                                strokeWidth={3}
                                className={scrolled ? 'text-black' : 'text-white'}
                            />
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
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.08 }}
                                className="text-white font-sans font-bold text-5xl tracking-[0.15em] uppercase
                           hover:text-grey transition-colors duration-150"
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
                         bg-white text-black font-mono text-lg tracking-[0.1em] uppercase
                         border-[3px] border-white"
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

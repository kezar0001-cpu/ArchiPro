import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

/**
 * Footer — Neo-Brutalist Site Footer
 *
 * Full-width black background with white text:
 * - Left: Copyright + domain link
 * - Right: Social media icons
 * - Grayscale only (no color accents)
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            label: 'Email',
            href: 'mailto:hello@hadilalduleimi.com',
            icon: Mail,
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/hadilalduleimi',
            icon: Linkedin,
        },
        {
            label: 'Instagram',
            href: 'https://instagram.com/hadilalduleimi',
            icon: Instagram,
        },
        {
            label: 'GitHub',
            href: 'https://github.com/hadilalduleimi',
            icon: Github,
        },
    ];

    return (
        <footer className="bg-black text-white border-t-[3px] border-black">
            <div className="max-w-[1440px] mx-auto px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Copyright + Domain */}
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                        <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                            © {currentYear} Hadil Al-Duleimi
                        </span>
                        <span className="hidden md:block text-grey">·</span>
                        <a
                            href="https://hadilalduleimi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-white hover:text-grey transition-colors duration-300 tracking-[0.15em] uppercase"
                        >
                            hadilalduleimi.com
                        </a>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-10 h-10 border-[3px] border-white bg-transparent
                                        flex items-center justify-center
                                        transition-all duration-300
                                        hover:bg-white hover:border-white group"
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={3}
                                        className="text-white group-hover:text-black transition-colors duration-300"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Legal Text */}
                <div className="mt-6 pt-6 border-t-[3px] border-white/20">
                    <p className="font-mono text-[10px] text-grey text-center tracking-[0.15em] uppercase">
                        Built with React · Vite · Tailwind CSS · Sanity.io · Deployed on Vercel
                    </p>
                </div>
            </div>
        </footer>
    );
}

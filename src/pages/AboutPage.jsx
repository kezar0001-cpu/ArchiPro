import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllSiteContent } from '../lib/queries';
import { getPublicUrl } from '../lib/supabase';

/**
 * AboutPage — Full-page dark brutalist layout
 * Sections: Page Header → Hero Bio Split → Skills Bar → Interests → Contact → CTA
 */
export default function AboutPage() {
    const [sc, setSc] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSiteContent()
            .then(setSc)
            .catch(() => setSc({}))
            .finally(() => setLoading(false));
    }, []);

    const name = sc.resume_name || 'Hadil Alduleimi';
    const title = sc.resume_title || 'Architectural Designer';
    const summary = sc.resume_summary || 'Architectural Designer with experience in residential design, concept development, interior layouts, client presentations, and drafting. Skilled in Revit, Rhino, and Adobe, with strong communication skills, site experience, and a portfolio of custom homes, duplexes, and interior concepts.';
    const interests = sc.resume_interests || 'Interior Design · Architectural Photography · Urban Design · Sustainable Concepts';
    const phoneNum = sc.resume_phone || '+61 411 148 777';
    const address = sc.resume_address || 'Sydney, AU';
    const contactEmail = sc.contact_email || 'hadilalduleimi2@gmail.com';

    const photoUrl = sc.profile_photo_path ? getPublicUrl('profile-photo', sc.profile_photo_path) : null;
    const cvUrl = sc.resume_file_path ? getPublicUrl('resume-documents', sc.resume_file_path) : null;

    const skillsData = [
        { label: 'Location', value: 'Sydney, AU' },
        { label: 'Experience', value: '8+ Years' },
        { label: 'Specialisation', value: 'Residential · Interior · Urban' },
        { label: 'Software', value: 'Revit · Rhino · Adobe Suite' },
    ];

    const contactItems = [
        { label: 'Phone', value: phoneNum, href: `tel:${phoneNum.replace(/\s/g, '')}` },
        { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
        { label: 'Address', value: address, href: null },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Nav />

            {/* ── SECTION 1: PAGE HEADER ── */}
            <section className="pt-36 pb-16 section-px bg-black">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            003 — About
                        </span>
                        <h1 className="font-sans font-bold text-white uppercase text-6xl md:text-8xl tracking-[-0.02em] mb-6">
                            ABOUT<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Architect · Designer · Sydney · Dubai
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: HERO BIO SPLIT ── */}
            <section className="bg-black border-t border-white/10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* LEFT — Portrait Photo */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="overflow-hidden bg-[#111]"
                            style={{ aspectRatio: '2/3', minHeight: '500px' }}
                        >
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={name}
                                    className="w-full h-full object-cover object-top grayscale"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="font-sans font-bold text-[10rem] text-white/5 leading-none tracking-[-0.04em] uppercase select-none">
                                        H.A
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* RIGHT — Bio Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col justify-center section-px py-16 lg:py-20"
                        >
                            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white tracking-[-0.02em] uppercase mb-3">
                                {name.toUpperCase()}
                            </h2>
                            <p className="font-mono text-xs text-grey tracking-[0.25em] uppercase mb-8">
                                {title.toUpperCase()}
                            </p>
                            <p className="font-sans text-lg text-grey leading-[1.8] mb-10 max-w-[520px]">
                                {summary}
                            </p>
                            {cvUrl && (
                                <div>
                                    <a
                                        href={cvUrl}
                                        download
                                        className="inline-flex items-center gap-3 px-8 py-4
                                            bg-transparent text-white font-mono text-xs tracking-[0.15em] uppercase
                                            border-[3px] border-white
                                            transition-all duration-300
                                            hover:bg-white hover:text-black"
                                    >
                                        <Download size={16} strokeWidth={3} />
                                        Download CV
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: SKILLS & INFO BAR ── */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-black border-y border-white/10"
            >
                <div className="max-w-[1400px] mx-auto section-px">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {skillsData.map((item, idx) => (
                            <div
                                key={idx}
                                className={`py-8 ${
                                    idx < skillsData.length - 1
                                        ? 'lg:border-r border-b lg:border-b-0 border-white/10'
                                        : ''
                                } ${idx > 0 ? 'lg:pl-8' : ''}`}
                            >
                                <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-2">
                                    {item.label}
                                </span>
                                <span className="font-mono text-sm text-white tracking-[0.1em] uppercase">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── SECTION 4: INTERESTS ROW ── */}
            <section className="bg-[#1a1a1a]">
                <div className="max-w-[1400px] mx-auto section-px py-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <span className="font-mono text-[10px] text-grey tracking-[0.25em] uppercase shrink-0">
                            Interests
                        </span>
                        <span className="hidden md:block text-white/20">|</span>
                        <p className="font-mono text-sm text-white/70 tracking-[0.1em] uppercase">
                            {interests}
                        </p>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: CONTACT DETAILS ── */}
            <section className="bg-black border-t border-white/10">
                <div className="max-w-[1400px] mx-auto section-px">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {contactItems.map((item, idx) => (
                            <div
                                key={idx}
                                className={`py-8 ${
                                    idx < contactItems.length - 1
                                        ? 'md:border-r border-b md:border-b-0 border-white/10'
                                        : ''
                                } ${idx > 0 ? 'md:pl-8' : ''}`}
                            >
                                <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-2">
                                    {item.label}
                                </span>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="font-mono text-sm text-white tracking-[0.1em] uppercase hover:text-grey transition-colors duration-300"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="font-mono text-sm text-white tracking-[0.1em] uppercase">
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="section-px py-24 bg-black border-t border-white/10">
                <div className="max-w-[1400px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.25em] uppercase block mb-4">
                            Get in Touch
                        </span>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6 uppercase tracking-[0.02em]">
                            Let's Collaborate<span className="text-grey">.</span>
                        </h2>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-10 max-w-lg mx-auto">
                            {sc.contact_cta || 'Ready to bring your project to life?'}
                        </p>
                        <a
                            href={`mailto:${contactEmail}`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black
                                font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                                brutal-shadow btn-fill btn-fill-dark"
                        >
                            {contactEmail}
                            <ArrowUpRight size={18} strokeWidth={3} />
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

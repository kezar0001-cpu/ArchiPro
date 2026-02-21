import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllSiteContent } from '../lib/queries';
import { getPublicUrl } from '../lib/supabase';

/**
 * AboutPage — Two-column resume layout (sidebar 30% + main 70%)
 * All content CMS-driven from site_content table.
 */

/* ── Parsers ── */

function parseList(raw) {
    if (!raw) return [];
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function parseExperience(raw) {
    if (!raw) return [];
    return raw.split('---').map((block) => {
        const lines = block.trim().split('\n').filter(Boolean);
        if (lines.length === 0) return null;
        const headerParts = lines[0].split('|').map((s) => s.trim());
        return {
            title: headerParts[0] || '',
            company: headerParts[1] || '',
            period: headerParts[2] || '',
            bullets: lines.slice(1).map((l) => l.replace(/^[-•]\s*/, '').trim()).filter(Boolean),
        };
    }).filter(Boolean);
}

function parseEducation(raw) {
    if (!raw) return [];
    return raw.split('\n').filter(Boolean).map((line) => {
        const parts = line.split('|').map((s) => s.trim());
        return { degree: parts[0] || '', institution: parts[1] || '', period: parts[2] || '' };
    });
}

/* ── Reusable components ── */

function SectionLabel({ children }) {
    return (
        <h3
            className="font-mono uppercase mb-4"
            style={{
                fontSize: '11px',
                color: '#555',
                letterSpacing: '0.2em',
                borderLeft: '2px solid #fff',
                paddingLeft: '10px',
            }}
        >
            {children}
        </h3>
    );
}

function SidebarLabel({ children }) {
    return (
        <h3
            className="font-mono uppercase mb-3"
            style={{ fontSize: '11px', color: '#555', letterSpacing: '0.2em' }}
        >
            {children}
        </h3>
    );
}

function PillTag({ children }) {
    return (
        <span
            className="font-mono inline-block"
            style={{
                border: '1px solid #333',
                padding: '2px 8px',
                fontSize: '11px',
                margin: '2px',
                color: '#ccc',
            }}
        >
            {children}
        </span>
    );
}

function Divider() {
    return <hr className="border-0" style={{ borderTop: '1px solid #222' }} />;
}

export default function AboutPage() {
    const [sc, setSc] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSiteContent()
            .then(setSc)
            .catch(() => setSc({}))
            .finally(() => setLoading(false));
    }, []);

    /* ── CMS data mapping ── */
    const name = sc.full_name || 'Hadil Alduleimi';
    const jobTitle = sc.job_title || 'Architectural Designer';
    const phone = sc.phone_number || '+61 411 148 777';
    const address = sc.address || 'Sydney, AU';
    const email = sc.contact_email || 'hadilalduleimi2@gmail.com';
    const summary = sc.professional_summary || 'Architectural Designer with experience in residential design, concept development, interior layouts, client presentations, and drafting. Skilled in Revit, Rhino, and Adobe, with strong communication skills, site experience, and a portfolio of custom homes, duplexes, and interior concepts.';

    const interestsList = parseList(sc.interests || 'Interior Design, Architectural Photography, Urban Design, Sustainable Concepts');
    const techSkills = parseList(sc.technical_skills || 'Revit, Rhino, AutoCAD, SketchUp, Adobe Photoshop, Adobe InDesign, Adobe Illustrator, Lumion, Enscape');
    const profSkills = parseList(sc.professional_skills || 'Client Presentations, Project Management, Team Collaboration, Site Analysis');
    const designSkills = parseList(sc.design_skills || 'Residential Design, Interior Design, Urban Design, Concept Development');

    const experience = parseExperience(sc.professional_experience);
    const education = parseEducation(sc.education);

    const photoUrl = sc.profile_photo_path ? getPublicUrl('profile-photo', sc.profile_photo_path) : null;
    const cvUrl = sc.resume_file_path ? getPublicUrl('resume-documents', sc.resume_file_path) : null;

    const specialisations = [...designSkills, ...profSkills];

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

            {/* ── PAGE HEADER ── */}
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

            {/* ── RESUME BODY: Sidebar + Main ── */}
            <section className="section-px pb-24 bg-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[30%_1fr]"
                    style={{ border: '1px solid #222' }}
                >
                    {/* ════════ LEFT SIDEBAR ════════ */}
                    <aside style={{ background: '#0a0a0a', borderRight: '1px solid #222' }}>
                        {/* Profile Photo */}
                        <div className="overflow-hidden" style={{ aspectRatio: '2/3' }}>
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={name}
                                    className="w-full h-full object-cover object-top grayscale"
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ background: '#111' }}
                                >
                                    <span className="font-sans font-bold text-[6rem] leading-none tracking-[-0.04em] uppercase select-none"
                                        style={{ color: 'rgba(255,255,255,0.04)' }}>
                                        H.A
                                    </span>
                                </div>
                            )}
                        </div>

                        <Divider />

                        {/* Name + Title */}
                        <div className="px-6 py-6">
                            <h2
                                className="font-sans font-bold text-white uppercase mb-1"
                                style={{ fontSize: '28px', lineHeight: 1.1 }}
                            >
                                {name.toUpperCase()}
                            </h2>
                            <p
                                className="font-mono uppercase"
                                style={{ fontSize: '11px', color: '#888', letterSpacing: '0.15em' }}
                            >
                                {jobTitle.toUpperCase()}
                            </p>
                        </div>

                        <Divider />

                        {/* Contact Block */}
                        <div className="px-6 py-6">
                            <SidebarLabel>Contact</SidebarLabel>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                        Phone
                                    </span>
                                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-mono text-white text-sm hover:text-grey transition-colors">
                                        {phone}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                        Email
                                    </span>
                                    <a href={`mailto:${email}`} className="font-mono text-white text-sm hover:text-grey transition-colors break-all">
                                        {email}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                        Address
                                    </span>
                                    <span className="font-mono text-white text-sm">{address}</span>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Skills Block */}
                        <div className="px-6 py-6">
                            <SidebarLabel>Skills</SidebarLabel>
                            <div className="space-y-5">
                                {techSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                            Technical
                                        </span>
                                        <div className="flex flex-wrap">
                                            {techSkills.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                        </div>
                                    </div>
                                )}
                                {profSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                            Professional
                                        </span>
                                        <div className="flex flex-wrap">
                                            {profSkills.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                        </div>
                                    </div>
                                )}
                                {designSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>
                                            Design
                                        </span>
                                        <div className="flex flex-wrap">
                                            {designSkills.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Divider />

                        {/* Interests Block */}
                        <div className="px-6 py-6">
                            <SidebarLabel>Interests</SidebarLabel>
                            <div className="flex flex-wrap">
                                {interestsList.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                            </div>
                        </div>
                    </aside>

                    {/* ════════ MAIN CONTENT ════════ */}
                    <div className="bg-black" style={{ paddingLeft: '40px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            {/* PROFILE */}
                            <div>
                                <SectionLabel>Profile</SectionLabel>
                                <p
                                    className="font-sans"
                                    style={{ color: '#ddd', fontSize: '15px', lineHeight: 1.8 }}
                                >
                                    {summary}
                                </p>
                            </div>

                            <Divider />

                            {/* EXPERIENCE */}
                            {experience.length > 0 && (
                                <div>
                                    <SectionLabel>Experience</SectionLabel>
                                    <div className="space-y-6">
                                        {experience.map((exp, idx) => (
                                            <div key={idx}>
                                                {idx > 0 && (
                                                    <hr className="border-0 mb-6" style={{ borderTop: '1px solid #1a1a1a' }} />
                                                )}
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                                                    <div>
                                                        <h4 className="font-sans font-bold text-white" style={{ fontSize: '16px' }}>
                                                            {exp.title}
                                                        </h4>
                                                        {exp.company && (
                                                            <span className="font-mono" style={{ fontSize: '13px', color: '#aaa' }}>
                                                                {exp.company}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {exp.period && (
                                                        <span
                                                            className="font-mono shrink-0"
                                                            style={{ fontSize: '12px', color: '#555' }}
                                                        >
                                                            {exp.period}
                                                        </span>
                                                    )}
                                                </div>
                                                {exp.bullets.length > 0 && (
                                                    <div className="mt-3 space-y-2">
                                                        {exp.bullets.map((b, bIdx) => (
                                                            <p
                                                                key={bIdx}
                                                                className="font-sans"
                                                                style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.7 }}
                                                            >
                                                                {b}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Divider />

                            {/* EDUCATION */}
                            {education.length > 0 && (
                                <div>
                                    <SectionLabel>Education</SectionLabel>
                                    <div className="space-y-4">
                                        {education.map((edu, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-sans font-bold text-white" style={{ fontSize: '15px' }}>
                                                    {edu.degree}
                                                </h4>
                                                <span className="font-mono" style={{ fontSize: '13px', color: '#aaa' }}>
                                                    {edu.institution}
                                                    {edu.period ? ` · ${edu.period}` : ''}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Divider />

                            {/* SPECIALISATIONS */}
                            {specialisations.length > 0 && (
                                <div>
                                    <SectionLabel>Specialisations</SectionLabel>
                                    <div className="grid grid-cols-2 gap-1">
                                        {specialisations.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                    </div>
                                </div>
                            )}

                            {/* DOWNLOAD CV */}
                            {cvUrl && (
                                <>
                                    <Divider />
                                    <div>
                                        <a
                                            href={cvUrl}
                                            download
                                            className="block w-full text-center font-mono uppercase transition-all duration-300 hover:bg-white hover:text-black"
                                            style={{
                                                border: '1px solid #fff',
                                                background: 'transparent',
                                                color: '#fff',
                                                padding: '14px 0',
                                                fontSize: '13px',
                                                letterSpacing: '0.15em',
                                            }}
                                        >
                                            ↓ Download CV
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
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
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black
                                font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                                brutal-shadow btn-fill btn-fill-dark"
                        >
                            {email}
                            <ArrowUpRight size={18} strokeWidth={3} />
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

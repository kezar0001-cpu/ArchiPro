import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Instagram } from 'lucide-react';
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
    const entries = [];
    const blocks = raw.trim().split(/\n(?=[A-Za-z])/);
    blocks.forEach((block) => {
        const lines = block.trim().split('\n').filter(Boolean);
        if (lines.length === 0) return;
        const headerParts = lines[0].split('|').map((s) => s.trim());
        const title = headerParts[0] || '';
        const period = headerParts[1] || '';
        const company = headerParts[2] || '';
        const bullets = lines
            .slice(1)
            .filter((l) => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim().length > 0)
            .map((l) => l.replace(/^[\s•\-]+/, '').trim())
            .filter(Boolean);
        entries.push({ title, period, company, bullets });
    });
    return entries;
}

function parseEducation(raw) {
    if (!raw) return [];
    return raw.trim().split('\n').filter(Boolean).map((line) => {
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
                color: '#888',
                letterSpacing: '0.25em',
                borderLeft: '2px solid #111',
                paddingLeft: '10px',
                lineHeight: 1.6,
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
            style={{ fontSize: '11px', color: '#999', letterSpacing: '0.2em' }}
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
                border: '1px solid #ccc',
                padding: '2px 8px',
                fontSize: '11px',
                margin: '2px',
                color: '#333',
            }}
        >
            {children}
        </span>
    );
}

function Divider() {
    return <hr className="border-0" style={{ borderTop: '1px solid #ddd' }} />;
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

    /* ── CMS data mapping (new keys with old-key fallbacks) ── */
    const name = sc.full_name || sc.resume_name || 'Hadil Alduleimi';
    const jobTitle = sc.job_title || sc.resume_title || 'Architectural Designer';
    const phone = sc.phone_number || sc.resume_phone || '+61 411 148 777';
    const address = sc.address || sc.resume_address || 'Sydney, AU';
    const email = sc.contact_email || 'hadilalduleimi2@gmail.com';
    const summary = sc.professional_summary || sc.resume_summary || sc.about_intro || 'Architectural Designer with experience in residential design, concept development, interior layouts, client presentations, and drafting.';

    const interestsList = parseList(sc.interests || sc.resume_interests || 'Interior Design, Architectural Photography, Urban Design, Sustainable Concepts');
    const techSkills = parseList(sc.technical_skills || sc.resume_skills_technical || '');
    const profSkills = parseList(sc.professional_skills || sc.resume_skills_professional || '');
    const designSkills = parseList(sc.design_skills || sc.resume_skills_design || '');

    const experience = parseExperience(sc.professional_experience || sc.resume_experience || '');
    const education = parseEducation(sc.education || sc.resume_education || '');

    const photoUrl = sc.profile_photo_path ? getPublicUrl('profile-photo', sc.profile_photo_path) : null;
    const cvUrl = sc.resume_file_path ? getPublicUrl('resume-documents', sc.resume_file_path) : null;

    const linkedinUrl = sc.social_linkedin || sc.linkedin_url || null;
    const instagramUrl = sc.social_instagram || sc.instagram_url || null;

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
            <section className="section-px bg-black" style={{ paddingTop: '160px', paddingBottom: '40px' }}>
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            003 — About
                        </span>
                        <h1
                            className="font-sans font-bold text-white uppercase tracking-[-0.02em] mb-6"
                            style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}
                        >
                            ABOUT<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Architect · Designer · Sydney · Dubai
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* dark→light transition divider */}
            <div style={{ height: '1px', background: '#ddd' }} />

            {/* ── RESUME BODY: Sidebar + Main ── */}
            <section className="section-px bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[33%_1fr]"
                >
                    {/* ════════ LEFT SIDEBAR ════════ */}
                    <aside style={{ background: '#fff', borderRight: '1px solid #ddd', paddingRight: '0' }}>
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
                                    style={{ background: '#f0f0f0' }}
                                >
                                    <span className="font-sans font-bold text-[6rem] leading-none tracking-[-0.04em] uppercase select-none"
                                        style={{ color: 'rgba(0,0,0,0.06)' }}>
                                        H.A
                                    </span>
                                </div>
                            )}
                        </div>

                        <Divider />

                        {/* Name + Title */}
                        <div className="px-6" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                            <h2
                                className="font-sans font-bold uppercase mb-1"
                                style={{ fontSize: '22px', lineHeight: 1.1, color: '#000' }}
                            >
                                {name.toUpperCase()}
                            </h2>
                            <p
                                className="font-mono uppercase"
                                style={{ fontSize: '11px', color: '#666', letterSpacing: '0.15em' }}
                            >
                                {jobTitle.toUpperCase()}
                            </p>
                        </div>

                        <Divider />

                        {/* Contact Block */}
                        <div className="px-6 py-6">
                            <SidebarLabel>Contact</SidebarLabel>
                            <div className="space-y-4" style={{ marginTop: '8px' }}>
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
                                        Phone
                                    </span>
                                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-mono text-sm transition-colors" style={{ color: '#111' }}>
                                        {phone}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
                                        Email
                                    </span>
                                    <a href={`mailto:${email}`} className="font-mono text-sm transition-colors break-all" style={{ color: '#111' }}>
                                        {email}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block mb-1" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
                                        Address
                                    </span>
                                    <span className="font-mono text-sm" style={{ color: '#111' }}>{address}</span>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Skills Block */}
                        <div className="px-6 py-6">
                            <SidebarLabel>Skills</SidebarLabel>
                            <div className="space-y-5" style={{ marginTop: '8px' }}>
                                {techSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
                                            Technical
                                        </span>
                                        <div className="flex flex-wrap">
                                            {techSkills.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                        </div>
                                    </div>
                                )}
                                {profSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
                                            Professional
                                        </span>
                                        <div className="flex flex-wrap">
                                            {profSkills.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                                        </div>
                                    </div>
                                )}
                                {designSkills.length > 0 && (
                                    <div>
                                        <span className="font-mono uppercase block mb-2" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em' }}>
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
                            <div className="flex flex-wrap" style={{ marginTop: '8px' }}>
                                {interestsList.map((s, i) => <PillTag key={i}>{s}</PillTag>)}
                            </div>
                        </div>

                        {/* Links Block */}
                        {(linkedinUrl || instagramUrl) && (
                            <>
                                <Divider />
                                <div className="px-6 py-6">
                                    <SidebarLabel>Links</SidebarLabel>
                                    <div className="flex gap-2" style={{ marginTop: '8px' }}>
                                        {linkedinUrl && (
                                            <a
                                                href={linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn"
                                                className="flex items-center justify-center transition-colors"
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    border: '1px solid #ccc',
                                                    color: '#555',
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#555'; }}
                                            >
                                                <Linkedin size={16} strokeWidth={1.5} />
                                            </a>
                                        )}
                                        {instagramUrl && (
                                            <a
                                                href={instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram"
                                                className="flex items-center justify-center transition-colors"
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    border: '1px solid #ccc',
                                                    color: '#555',
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#555'; }}
                                            >
                                                <Instagram size={16} strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>

                    {/* ════════ MAIN CONTENT ════════ */}
                    <div className="bg-white" style={{ paddingLeft: '40px', paddingRight: '24px' }}>

                        {/* PROFILE */}
                        <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                            <SectionLabel>Profile</SectionLabel>
                            <p
                                className="font-sans"
                                style={{ color: '#444', fontSize: '15px', lineHeight: 1.8 }}
                            >
                                {summary}
                            </p>
                        </div>
                        <Divider />

                        {/* EXPERIENCE */}
                        {experience.length > 0 && (
                            <>
                                <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                                    <SectionLabel>Experience</SectionLabel>
                                    <div>
                                        {experience.map((exp, idx) => (
                                            <div key={idx}>
                                                {idx > 0 && (
                                                    <hr className="border-0" style={{ borderTop: '1px dashed #e5e5e5', margin: '32px 0' }} />
                                                )}
                                                <h4
                                                    className="font-sans font-bold"
                                                    style={{ fontSize: '16px', marginBottom: '4px', color: '#111' }}
                                                >
                                                    {exp.title}
                                                </h4>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'baseline',
                                                        marginBottom: '12px',
                                                    }}
                                                >
                                                    {exp.company && (
                                                        <span className="font-mono" style={{ fontSize: '13px', color: '#666' }}>
                                                            {exp.company}
                                                        </span>
                                                    )}
                                                    {exp.period && (
                                                        <span className="font-mono" style={{ fontSize: '12px', color: '#999', flexShrink: 0, marginLeft: '16px' }}>
                                                            {exp.period}
                                                        </span>
                                                    )}
                                                </div>
                                                {exp.bullets.length > 0 && (
                                                    <div className="space-y-2">
                                                        {exp.bullets.map((b, bIdx) => (
                                                            <p
                                                                key={bIdx}
                                                                className="font-sans"
                                                                style={{ color: '#555', fontSize: '14px', lineHeight: 1.7 }}
                                                            >
                                                                — {b}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Divider />
                            </>
                        )}

                        {/* EDUCATION */}
                        {education.length > 0 && (
                            <>
                                <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                                    <SectionLabel>Education</SectionLabel>
                                    <div>
                                        {education.map((edu, idx) => (
                                            <div key={idx}>
                                                {idx > 0 && (
                                                    <hr className="border-0 my-4" style={{ borderTop: '1px solid #eee' }} />
                                                )}
                                                <h4 className="font-sans font-bold mb-1" style={{ fontSize: '15px', color: '#111' }}>
                                                    {edu.degree}
                                                </h4>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                    <span className="font-mono" style={{ fontSize: '13px', color: '#666' }}>
                                                        {edu.institution}
                                                    </span>
                                                    {edu.period && (
                                                        <span className="font-mono" style={{ fontSize: '13px', color: '#999', flexShrink: 0, marginLeft: '16px' }}>
                                                            {edu.period}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Divider />
                            </>
                        )}

                        {/* DOWNLOAD CV */}
                        {cvUrl && (
                            <div style={{ paddingTop: '32px', paddingBottom: '40px' }}>
                                <a
                                    href={cvUrl}
                                    download
                                    className="block w-full text-center font-mono uppercase transition-all duration-300"
                                    style={{
                                        background: '#111',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '14px 0',
                                        fontSize: '13px',
                                        letterSpacing: '0.15em',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#333'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#111'; }}
                                >
                                    ↓ Download CV
                                </a>
                            </div>
                        )}
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

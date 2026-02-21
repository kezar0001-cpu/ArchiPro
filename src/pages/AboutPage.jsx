import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllSiteContent } from '../lib/queries';
import { getPublicUrl } from '../lib/supabase';

/**
 * AboutPage — Canva-style Resume Layout
 * All content is CMS-driven from site_content table.
 */

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

function parseList(raw) {
    if (!raw) return [];
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
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

    const name = sc.resume_name || 'Hadil Alduleimi';
    const title = sc.resume_title || 'Architectural Designer';
    const summary = sc.resume_summary || 'Architectural Designer with experience in residential design, concept development, interior layouts, client presentations, and drafting. Skilled in Revit, Rhino, and Adobe, with strong communication skills, site experience, and a portfolio of custom homes, duplexes, and interior concepts.';
    const interests = sc.resume_interests || 'Interior design, architectural photography, urban design, sustainable concepts';
    const phoneNum = sc.resume_phone || '+61 411 148 777';
    const address = sc.resume_address || 'UAE, Dubai';
    const contactEmail = sc.contact_email || 'hadilalduleimi2@gmail.com';

    const experience = parseExperience(sc.resume_experience);
    const education = parseEducation(sc.resume_education);
    const skillsTech = parseList(sc.resume_skills_technical);
    const skillsProf = parseList(sc.resume_skills_professional);
    const skillsDesign = parseList(sc.resume_skills_design);

    const photoUrl = sc.profile_photo_path ? getPublicUrl('profile-photo', sc.profile_photo_path) : null;
    const cvUrl = sc.resume_file_path ? getPublicUrl('resume-documents', sc.resume_file_path) : null;

    if (loading) {
        return (
            <div className="min-h-screen bg-grey-light flex items-center justify-center">
                <div className="w-16 h-16 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grey-light">
            <Nav />

            <div className="pt-28 pb-16 px-4 md:px-8">
                <div className="max-w-[900px] mx-auto">
                    {/* Resume Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white brutal-border brutal-shadow-sm"
                    >
                        {/* ═══ Header: Photo + Name + Summary ═══ */}
                        <div className="p-8 md:p-12 pb-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Profile Photo */}
                                {photoUrl && (
                                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-black shrink-0">
                                        <img
                                            src={photoUrl}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Name + Title + Summary */}
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-sans font-bold text-4xl md:text-5xl text-black tracking-[-0.02em] mb-1">
                                        {name}
                                    </h1>
                                    <p className="font-sans text-lg text-grey mb-5">
                                        {title}
                                    </p>
                                    <p className="font-sans text-sm text-grey leading-relaxed">
                                        {summary}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ═══ Interests ═══ */}
                        {interests && (
                            <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4 items-start">
                                    <h2 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                                        Interests
                                    </h2>
                                    <p className="font-sans text-sm text-grey leading-relaxed">
                                        {interests}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ═══ Contact ═══ */}
                        <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4 items-start">
                                <h2 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                                    Contact
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    <div>
                                        <span className="font-sans font-semibold text-sm text-black">Phone: </span>
                                        <span className="font-sans text-sm text-grey">{phoneNum}</span>
                                    </div>
                                    <div>
                                        <span className="font-sans font-semibold text-sm text-black">Address: </span>
                                        <span className="font-sans text-sm text-grey">{address}</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="font-sans font-semibold text-sm text-black">Email: </span>
                                        <a href={`mailto:${contactEmail}`} className="font-sans text-sm text-grey hover:text-black transition-colors">
                                            {contactEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══ Professional Experience ═══ */}
                        {experience.length > 0 && (
                            <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start">
                                    <h2 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                                        Professional Experience
                                    </h2>
                                    <div className="space-y-6">
                                        {experience.map((exp, idx) => (
                                            <div key={idx}>
                                                <h3 className="font-sans font-bold text-base text-black">
                                                    {exp.title}{exp.period ? ` | ${exp.period}` : ''}
                                                </h3>
                                                {exp.company && (
                                                    <p className="font-sans text-sm text-grey mb-2">{exp.company}</p>
                                                )}
                                                {exp.bullets.length > 0 && (
                                                    <ul className="space-y-1 ml-4">
                                                        {exp.bullets.map((bullet, bIdx) => (
                                                            <li key={bIdx} className="font-sans text-sm text-grey leading-relaxed flex gap-2">
                                                                <span className="text-black mt-1.5 shrink-0">•</span>
                                                                <span>{bullet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ Education ═══ */}
                        {education.length > 0 && (
                            <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start">
                                    <h2 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                                        Education
                                    </h2>
                                    <div className="space-y-4">
                                        {education.map((edu, idx) => (
                                            <div key={idx}>
                                                <h3 className="font-sans font-bold text-base text-black">
                                                    {edu.institution}{edu.period ? ` | ${edu.period}` : ''}
                                                </h3>
                                                <p className="font-sans text-sm text-grey">{edu.degree}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ Skills ═══ */}
                        {(skillsTech.length > 0 || skillsProf.length > 0 || skillsDesign.length > 0) && (
                            <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start">
                                    <h2 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                                        Skills
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {skillsTech.length > 0 && (
                                            <div>
                                                <h3 className="font-sans font-bold text-sm text-black mb-2">Technical Skills</h3>
                                                <ul className="space-y-1">
                                                    {skillsTech.map((s, i) => (
                                                        <li key={i} className="font-sans text-sm text-grey flex gap-2">
                                                            <span className="text-black shrink-0">•</span>{s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {skillsProf.length > 0 && (
                                            <div>
                                                <h3 className="font-sans font-bold text-sm text-black mb-2">Professional Skills</h3>
                                                <ul className="space-y-1">
                                                    {skillsProf.map((s, i) => (
                                                        <li key={i} className="font-sans text-sm text-grey flex gap-2">
                                                            <span className="text-black shrink-0">•</span>{s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {skillsDesign.length > 0 && (
                                            <div>
                                                <h3 className="font-sans font-bold text-sm text-black mb-2">Design Skills</h3>
                                                <ul className="space-y-1">
                                                    {skillsDesign.map((s, i) => (
                                                        <li key={i} className="font-sans text-sm text-grey flex gap-2">
                                                            <span className="text-black shrink-0">•</span>{s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══ Download CV Button ═══ */}
                        {cvUrl && (
                            <div className="px-8 md:px-12 py-6 border-t-[2px] border-black/10">
                                <a
                                    href={cvUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                                        font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                        brutal-shadow-sm brutal-hover"
                                >
                                    <Download size={16} strokeWidth={3} />
                                    Download CV
                                </a>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <section className="px-8 py-20 bg-black">
                <div className="max-w-[1440px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6 uppercase">
                            Let's Collaborate<span className="text-grey">.</span>
                        </h2>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">
                            {sc.contact_cta || 'Ready to bring your project to life?'}
                        </p>
                        <a
                            href={`mailto:${contactEmail}`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white brutal-shadow brutal-hover"
                        >
                            <Mail size={16} strokeWidth={3} />
                            Contact Me
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

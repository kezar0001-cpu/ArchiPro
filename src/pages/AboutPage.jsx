import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Briefcase } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

/**
 * AboutPage — Bio, Skills, CV Download
 *
 * Displays professional information:
 * - Bio section
 * - Skills & expertise
 * - Downloadable CV
 * - Contact CTA
 */
export default function AboutPage() {
    const skills = [
        'Architectural Design',
        'Urban Planning',
        'Interior Design',
        'Sustainable Architecture',
        '3D Visualization',
        'AutoCAD',
        'Revit',
        'SketchUp',
        'Rhino',
        'V-Ray',
        'Lumion',
        'Photoshop',
    ];

    const experience = [
        {
            title: 'Senior Architect',
            company: 'Design Studio',
            period: '2020 - Present',
            location: 'Melbourne, AU',
        },
        {
            title: 'Architect',
            company: 'Architecture Firm',
            period: '2017 - 2020',
            location: 'Melbourne, AU',
        },
        {
            title: 'Junior Architect',
            company: 'Urban Design Co.',
            period: '2015 - 2017',
            location: 'Melbourne, AU',
        },
    ];

    return (
        <div className="min-h-screen bg-grey-light">
            <Nav />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-8 bg-black">
                <div className="max-w-[1440px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-sans font-bold text-white uppercase text-6xl md:text-8xl tracking-[-0.02em] mb-6">
                            ABOUT<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Architect · Designer · Melbourne
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="px-8 py-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left: Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <h2 className="font-sans font-bold text-3xl text-black mb-6 uppercase">
                                Background
                            </h2>
                            <div className="space-y-4 font-sans text-lg text-grey leading-relaxed">
                                <p>
                                    I'm <strong className="text-black">Hadi Lal Duleimi</strong>, an architect and designer
                                    based in Melbourne, Australia. With over 8 years of experience in architectural design,
                                    I specialize in creating spaces that blend functionality with innovative design.
                                </p>
                                <p>
                                    My approach combines sustainable practices with modern aesthetics, always focusing on
                                    how people interact with their built environment. I believe architecture should be both
                                    beautiful and purposeful.
                                </p>
                                <p>
                                    Currently, I work on residential and commercial projects, from concept through to
                                    completion, ensuring every detail aligns with the client's vision while pushing creative
                                    boundaries.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Quick Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-1"
                        >
                            <div className="brutal-border brutal-shadow bg-white p-6 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={16} strokeWidth={3} className="text-grey" />
                                        <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                            Location
                                        </span>
                                    </div>
                                    <p className="font-sans font-semibold text-black">Melbourne, Australia</p>
                                </div>

                                <div className="brutal-divider" />

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Briefcase size={16} strokeWidth={3} className="text-grey" />
                                        <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                            Availability
                                        </span>
                                    </div>
                                    <p className="font-sans font-semibold text-black">Open to Projects</p>
                                </div>

                                <div className="brutal-divider" />

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail size={16} strokeWidth={3} className="text-grey" />
                                        <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                            Contact
                                        </span>
                                    </div>
                                    <a
                                        href="mailto:hello@hadilalduleimi.com"
                                        className="font-sans text-black hover:text-grey transition-colors duration-300 break-all"
                                    >
                                        hello@hadilalduleimi.com
                                    </a>
                                </div>

                                <div className="brutal-divider" />

                                <a
                                    href="/cv.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                                >
                                    <Download size={16} strokeWidth={3} />
                                    Download CV
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="px-8 py-20 bg-white border-y-[3px] border-black">
                <div className="max-w-[1440px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-sans font-bold text-3xl text-black mb-8 uppercase">
                            Skills & Expertise
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {skills.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="brutal-border brutal-shadow-sm bg-grey-light px-4 py-3 text-center hover:bg-black hover:text-white transition-colors duration-300 group"
                                >
                                    <span className="font-mono text-xs tracking-[0.15em] uppercase">
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="px-8 py-20">
                <div className="max-w-[1440px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-sans font-bold text-3xl text-black mb-8 uppercase">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="brutal-border brutal-shadow bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="font-sans font-bold text-xl text-black mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="font-sans text-grey">{item.company}</p>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-1">
                                            <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                                {item.period}
                                            </span>
                                            <span className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

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
                            Ready to bring your project to life?
                        </p>
                        <a
                            href="mailto:hello@hadilalduleimi.com"
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

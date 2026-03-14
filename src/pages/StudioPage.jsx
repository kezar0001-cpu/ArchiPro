import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { getAllSiteContent } from '../lib/queries';

/**
 * StudioPage — HADStudio Landing
 *
 * Presents HADStudio as Hadil's design practice.
 * Single page hero + intro + CTA.
 */
export default function StudioPage() {
    const [sc, setSc] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSiteContent()
            .then(setSc)
            .catch(() => setSc({}))
            .finally(() => setLoading(false));
    }, []);

    const contactEmail = sc.contact_email || 'hadilalduleimi2@gmail.com';

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Nav contactEmail={contactEmail} />

            {/* ── HERO SECTION ── */}
            <section className="bg-black section-px section-py-xl">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-2xl">
                            <span className="caption-xs text-grey block mb-6">
                                HADStudio
                            </span>
                            <h1 className="heading-xl text-white mb-8">
                                Architectural Design Practice
                            </h1>
                            <p className="body-base text-grey leading-relaxed mb-8 max-w-xl">
                                HADStudio is a design-focused architectural practice specializing in residential design, interior spaces, and spatial planning. We create thoughtful, innovative solutions through detailed research, collaborative design, and meticulous documentation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href={`mailto:${contactEmail}`} variant="primary" size="lg" dark icon>
                                    Start a Project
                                </Button>
                                <Button href="/work" variant="secondary" size="lg">
                                    View Projects
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DIVIDER */}
            <div className="h-px bg-black" />

            {/* ── APPROACH SECTION ── */}
            <section className="bg-white section-px section-py-xl">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {/* Process */}
                            <div>
                                <h2 className="heading-md text-black mb-6">Design Process</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="caption-md text-black mb-2">Research & Brief</h3>
                                        <p className="body-sm text-grey leading-relaxed">
                                            We begin with deep understanding of your site, context, and aspirations. Every project starts with thorough research and dialogue.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="caption-md text-black mb-2">Concept Development</h3>
                                        <p className="body-sm text-grey leading-relaxed">
                                            Design exploration through sketches, spatial studies, and mood direction. Multiple concepts to establish design vision.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="caption-md text-black mb-2">Refinement & Documentation</h3>
                                        <p className="body-sm text-grey leading-relaxed">
                                            Detailed design development, 3D visualization, and comprehensive documentation for construction and council submissions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <h2 className="heading-md text-black mb-6">Services</h2>
                                <div className="space-y-4">
                                    {[
                                        'As-Built Documentation',
                                        'Concept Design & Spatial Planning',
                                        '3D Visualization & Rendering',
                                        'Development Application Packages',
                                        'Interior Design',
                                        'Construction Documentation',
                                        'Project Coordination',
                                    ].map((service, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-grey flex-shrink-0">—</span>
                                            <span className="body-sm text-black">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DIVIDER */}
            <div className="h-px bg-black" />

            {/* ── CTA SECTION ── */}
            <section className="bg-black section-px section-py-xl">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center text-center"
                    >
                        <span className="caption-xs text-grey mb-6">Let's Work Together</span>
                        <h2 className="heading-lg text-white mb-8 max-w-2xl">
                            Ready to discuss your project?
                        </h2>
                        <p className="caption-md text-grey mb-12 max-w-xl">
                            Get in touch to explore how HADStudio can help bring your vision to life.
                        </p>
                        <Button href={`mailto:${contactEmail}`} variant="primary" size="lg" dark icon>
                            {contactEmail}
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

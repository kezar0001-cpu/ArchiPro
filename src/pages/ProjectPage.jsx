import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getProjectBySlug } from '../lib/queries';

/**
 * ProjectPage — Individual Project Case Study
 *
 * Displays full project details:
 * - Hero image
 * - Title, description, tags
 * - Gallery of images
 */
export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectBySlug(slug);
                setProject(data);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-grey-light flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-[3px] border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                        Loading Project...
                    </p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-grey-light">
                <Nav />
                <div className="max-w-[1440px] mx-auto px-8 py-32 text-center">
                    <h1 className="font-sans font-bold text-6xl text-black mb-4">404</h1>
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">
                        Project Not Found
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                    >
                        <ArrowLeft size={16} strokeWidth={3} />
                        Back to Home
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const thumbnailUrl = project.images?.[0]?.url || null;

    return (
        <div className="min-h-screen bg-grey-light">
            <Nav />

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-8 bg-black">
                <div className="max-w-[1440px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 text-white hover:text-grey transition-colors duration-300 mb-8 font-mono text-xs tracking-[0.15em] uppercase"
                        >
                            <ArrowLeft size={16} strokeWidth={3} />
                            Back to Projects
                        </Link>

                        <h1 className="font-sans font-bold text-white uppercase text-5xl md:text-7xl tracking-[-0.02em] mb-6">
                            {project.title}
                            <span className="text-grey">.</span>
                        </h1>

                        {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="font-mono text-xs text-grey tracking-[0.15em] uppercase px-3 py-1 border-[2px] border-grey"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Thumbnail */}
            {thumbnailUrl && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="px-8 py-0"
                >
                    <div className="max-w-[1440px] mx-auto">
                        <div className="brutal-border brutal-shadow overflow-hidden bg-white">
                            <img
                                src={thumbnailUrl}
                                alt={project.title}
                                className="w-full h-auto grayscale"
                            />
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Description */}
            {project.description && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="px-8 py-16"
                >
                    <div className="max-w-[1440px] mx-auto">
                        <div className="max-w-3xl">
                            <h2 className="font-sans font-bold text-2xl text-black mb-4 uppercase">
                                Overview
                            </h2>
                            <p className="font-sans text-lg text-grey leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
                <section className="px-8 py-16 bg-white border-y-[3px] border-black">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="font-sans font-bold text-2xl text-black mb-8 uppercase">
                            Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.images.map((image, idx) => (
                                <motion.div
                                    key={image.id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="brutal-border brutal-shadow overflow-hidden bg-grey-light"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt_text || `${project.title} - Image ${idx + 1}`}
                                        className="w-full h-auto grayscale"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-8 py-20 bg-grey-light">
                <div className="max-w-[1440px] mx-auto text-center">
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-black mb-6 uppercase">
                        Let's Work Together<span className="text-grey">.</span>
                    </h2>
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">
                        Have a project in mind?
                    </p>
                    <a
                        href="mailto:hello@hadilalduleimi.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow brutal-hover"
                    >
                        Get in Touch
                        <ExternalLink size={16} strokeWidth={3} />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

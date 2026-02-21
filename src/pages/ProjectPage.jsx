import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getProjectBySlug, getAllSiteContent } from '../lib/queries';

/**
 * ProjectPage — Individual Project Case Study
 *
 * Sections: Hero image → Info bar → Overview → Gallery carousel → CTA
 */
export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sc, setSc] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const [data, content] = await Promise.all([
                    getProjectBySlug(slug),
                    getAllSiteContent().catch(() => ({})),
                ]);
                setProject(data);
                setSc(content);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    const contactEmail = sc.contact_email || 'hello@hadilalduleimi.com';
    const images = project?.images || [];
    const totalSlides = images.length;

    const goNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const goPrev = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Keyboard navigation for gallery
    useEffect(() => {
        if (totalSlides <= 1) return;
        function handleKey(e) {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [totalSlides, goNext, goPrev]);

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
                <div className="max-w-[1400px] mx-auto section-px py-32 text-center">
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

    const heroImage = images[0]?.url || null;
    const category = project.tags?.[0] || null;

    // Extract metadata from tags for info bar
    const infoItems = [
        { label: 'Type', value: category || '—' },
        { label: 'Tags', value: project.tags?.slice(1).join(', ') || '—' },
        { label: 'Status', value: 'Completed' },
    ];

    return (
        <div className="min-h-screen bg-grey-light">
            <Nav />

            {/* ── SECTION 1: HERO ── */}
            <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-black">
                {heroImage ? (
                    <motion.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        src={heroImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale"
                    />
                ) : (
                    <div className="absolute inset-0 bg-black" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end section-px pb-12">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                to="/work"
                                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-6 font-mono text-xs tracking-[0.15em] uppercase"
                            >
                                <ArrowLeft size={14} strokeWidth={3} />
                                Back to Projects
                            </Link>

                            <h1 className="font-sans font-bold text-white uppercase text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-4 max-w-[900px]">
                                {project.title}
                                <span className="text-grey">.</span>
                            </h1>

                            {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="font-mono text-[10px] text-white/80 tracking-[0.15em] uppercase px-3 py-1 border border-white/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: PROJECT INFO BAR ── */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black border-y-[3px] border-white/10"
            >
                <div className="max-w-[1400px] mx-auto section-px py-5">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        {infoItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase">
                                    {item.label}
                                </span>
                                <span className="font-mono text-xs text-white tracking-[0.1em] uppercase">
                                    {item.value}
                                </span>
                                {idx < infoItems.length - 1 && (
                                    <span className="text-white/20 ml-5 hidden md:inline">·</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── SECTION 3: OVERVIEW ── */}
            {(project.description || project.details) && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="section-px py-20 bg-grey-light"
                >
                    <div className="max-w-[720px]">
                        <span className="font-mono text-[10px] text-grey tracking-[0.25em] uppercase block mb-6">
                            Overview
                        </span>
                        {project.description && (
                            <p className="font-sans text-lg text-black leading-[1.8] mb-8">
                                {project.description}
                            </p>
                        )}
                        {project.details && (
                            <div className="font-sans text-base text-grey leading-[1.8] whitespace-pre-line">
                                {project.details}
                            </div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* ── SECTION 4: GALLERY CAROUSEL ── */}
            {images.length > 0 && (
                <section className="bg-[#111] border-y-[3px] border-black">
                    {/* Section label */}
                    <div className="section-px pt-12 pb-6">
                        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                            <span className="font-mono text-[10px] text-grey tracking-[0.25em] uppercase">
                                Gallery
                            </span>
                            {totalSlides > 1 && (
                                <span className="font-mono text-xs text-grey tracking-[0.15em]">
                                    {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main carousel */}
                    <div className="relative w-full h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={images[currentSlide].url}
                                alt={images[currentSlide].alt_text || `${project.title} - ${currentSlide + 1}`}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="max-w-full max-h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Navigation arrows */}
                        {totalSlides > 1 && (
                            <>
                                <button
                                    onClick={goPrev}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10
                                        w-12 h-12 border-[3px] border-white bg-black/60
                                        flex items-center justify-center
                                        hover:bg-white hover:border-white group transition-all duration-200"
                                    aria-label="Previous image"
                                >
                                    <ArrowLeft size={20} strokeWidth={3} className="text-white group-hover:text-black transition-colors" />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10
                                        w-12 h-12 border-[3px] border-white bg-black/60
                                        flex items-center justify-center
                                        hover:bg-white hover:border-white group transition-all duration-200"
                                    aria-label="Next image"
                                >
                                    <ArrowRight size={20} strokeWidth={3} className="text-white group-hover:text-black transition-colors" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {totalSlides > 1 && (
                        <div className="section-px py-4">
                            <div className="max-w-[1400px] mx-auto overflow-x-auto">
                                <div className="flex gap-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={img.id || idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`flex-shrink-0 w-20 h-[60px] overflow-hidden border-[2px] transition-all duration-200 ${
                                                idx === currentSlide
                                                    ? 'border-white opacity-100'
                                                    : 'border-transparent opacity-50 hover:opacity-80'
                                            }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.alt_text || `Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* ── SECTION 5: CTA ── */}
            <section className="section-px py-20 bg-black">
                <div className="max-w-[1400px] mx-auto text-center">
                    <span className="font-mono text-[10px] text-grey tracking-[0.25em] uppercase block mb-4">
                        Get in Touch
                    </span>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6 uppercase tracking-[0.02em]">
                        Let's Work Together<span className="text-grey">.</span>
                    </h2>
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-10">
                        Have a project in mind?
                    </p>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black
                            font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                            brutal-shadow btn-fill btn-fill-dark"
                    >
                        {contactEmail}
                        <ExternalLink size={16} strokeWidth={3} />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

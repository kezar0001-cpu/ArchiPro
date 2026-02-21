import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">Loading Project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="bg-black">
                <Nav />
                <div className="max-w-[1400px] mx-auto section-px py-32 text-center">
                    <h1 className="font-sans font-bold text-6xl text-white mb-4">404</h1>
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">Project Not Found</p>
                    <Link to="/work" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase">
                        <ArrowLeft size={16} strokeWidth={2} /> Back to Projects
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const heroImage = images[0]?.url || null;
    const category = project.tags?.[0] || null;
    const remainingTags = project.tags?.slice(1) || [];

    const mdComponents = {
        h1: () => null,
        h2: ({ children }) => <h2 style={{ fontSize: '11px', color: '#111', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '32px', marginBottom: '12px', fontWeight: 600 }}>{children}</h2>,
        h3: ({ children }) => <h3 style={{ fontSize: '11px', color: '#111', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '32px', marginBottom: '12px', fontWeight: 600 }}>{children}</h3>,
        p: ({ children }) => <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>{children}</p>,
        strong: ({ children }) => <strong style={{ color: '#111', fontWeight: 600 }}>{children}</strong>,
        ul: ({ children }) => <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>{children}</ol>,
        li: ({ children }) => (
            <li style={{ paddingLeft: '16px', color: '#666', fontSize: '14px', lineHeight: 1.7, marginBottom: '8px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>—</span>
                <span style={{ display: 'block', paddingLeft: '8px' }}>{children}</span>
            </li>
        ),
    };

    return (
        <div className="bg-black">
            <Nav />

            {/* ── SECTION 1: HERO ── */}
            <section className="relative w-full overflow-hidden bg-black" style={{ height: '65vh', minHeight: '420px' }}>
                {heroImage ? (
                    <motion.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        src={heroImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale"
                        style={{ objectPosition: 'center' }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-black" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                {/* Back link — top left, below navbar */}
                <div className="absolute top-0 left-0 right-0 section-px" style={{ paddingTop: '80px' }}>
                    <div className="max-w-[1400px] mx-auto">
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 font-mono uppercase transition-colors duration-300"
                            style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}
                        >
                            <ArrowLeft size={14} strokeWidth={2} />
                            Back to Projects
                        </Link>
                    </div>
                </div>

                {/* Title — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 section-px" style={{ paddingBottom: '32px' }}>
                    <div className="max-w-[1400px] mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-sans font-bold text-white uppercase tracking-[-0.02em]"
                            style={{ fontSize: 'clamp(32px, 5vw, 72px)', maxWidth: '900px' }}
                        >
                            {project.title}<span style={{ color: '#888' }}>.</span>
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: METADATA STRIP ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white section-px"
                style={{ borderBottom: '1px solid #ddd', paddingTop: '16px', paddingBottom: '16px' }}
            >
                <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-y-2">
                    {category && (
                        <div className="flex items-center" style={{ paddingRight: '24px', marginRight: '24px', borderRight: '1px solid #ddd' }}>
                            <span className="font-mono uppercase" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginRight: '8px' }}>Type</span>
                            <span className="font-mono uppercase" style={{ fontSize: '11px', color: '#111', letterSpacing: '0.1em' }}>{category}</span>
                        </div>
                    )}
                    <div className="flex items-center" style={{ paddingRight: remainingTags.length > 0 ? '24px' : 0, marginRight: remainingTags.length > 0 ? '24px' : 0, borderRight: remainingTags.length > 0 ? '1px solid #ddd' : 'none' }}>
                        <span className="font-mono uppercase" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginRight: '8px' }}>Status</span>
                        <span className="font-mono uppercase" style={{ fontSize: '11px', color: '#111', letterSpacing: '0.1em' }}>Completed</span>
                    </div>
                    {remainingTags.length > 0 && (
                        <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                            <span className="font-mono uppercase" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginRight: '4px' }}>Tags</span>
                            {remainingTags.map((tag, i) => (
                                <span key={i} className="font-mono" style={{ fontSize: '11px', color: '#111', letterSpacing: '0.08em' }}>
                                    {tag}{i < remainingTags.length - 1 ? ' ·' : ''}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* ── SECTION 3: OVERVIEW ── */}
            {(project.description || project.details) && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white section-px"
                    style={{ paddingTop: '60px', paddingBottom: '60px' }}
                >
                    <div style={{ maxWidth: '760px' }}>
                        <h2
                            className="font-mono uppercase mb-8"
                            style={{ fontSize: '11px', color: '#888', letterSpacing: '0.25em', borderLeft: '2px solid #111', paddingLeft: '10px', lineHeight: 1.6 }}
                        >
                            Overview
                        </h2>
                        {project.description && (
                            <div className="font-sans">
                                <ReactMarkdown components={mdComponents}>{project.description}</ReactMarkdown>
                            </div>
                        )}
                        {project.details && (
                            <div className="font-sans" style={{ marginTop: project.description ? '24px' : 0 }}>
                                <ReactMarkdown components={mdComponents}>{project.details}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* ── SECTION 4: GALLERY CAROUSEL ── */}
            {images.length > 0 && (
                <section style={{ background: '#111' }}>
                    {/* Section label + counter */}
                    <div className="section-px" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
                        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                            <h2
                                className="font-mono uppercase"
                                style={{ fontSize: '11px', color: '#fff', letterSpacing: '0.25em', borderLeft: '2px solid #fff', paddingLeft: '10px', lineHeight: 1.6 }}
                            >
                                Gallery
                            </h2>
                            {totalSlides > 1 && (
                                <span className="font-mono" style={{ fontSize: '12px', color: '#fff', letterSpacing: '0.15em' }}>
                                    {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main carousel */}
                    <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '70vh', minHeight: '400px' }}>
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
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
                                    style={{ width: '48px', height: '48px', border: '1px solid #444', background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#444'; }}
                                    aria-label="Previous image"
                                >
                                    <ArrowLeft size={20} strokeWidth={2} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
                                    style={{ width: '48px', height: '48px', border: '1px solid #444', background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#444'; }}
                                    aria-label="Next image"
                                >
                                    <ArrowRight size={20} strokeWidth={2} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {totalSlides > 1 && (
                        <div className="section-px" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                            <div className="max-w-[1400px] mx-auto overflow-x-auto">
                                <div className="flex gap-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={img.id || idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className="flex-shrink-0 w-20 overflow-hidden transition-all duration-200"
                                            style={{
                                                height: '60px',
                                                opacity: idx === currentSlide ? 1 : 0.45,
                                                outline: idx === currentSlide ? '2px solid #fff' : 'none',
                                                outlineOffset: '2px',
                                            }}
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

            {/* section divider */}
            <div style={{ height: '1px', background: '#1a1a1a' }} />

            {/* ── SECTION 5: CTA ── */}
            <section className="bg-black section-px" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col items-center" style={{ gap: '16px' }}>
                        <span className="font-mono text-[10px] font-medium text-grey tracking-[0.25em] uppercase">
                            004 — Contact
                        </span>
                        <h2 className="font-sans font-bold text-5xl md:text-7xl text-white tracking-[0.04em] uppercase text-center">
                            LET'S WORK<br />TOGETHER<span className="text-grey">.</span>
                        </h2>
                        <p className="font-mono text-sm text-grey tracking-[0.25em] uppercase text-center max-w-lg">
                            {sc.contact_cta || 'Ready to bring your project to life?'}
                        </p>
                        <div style={{ marginTop: '16px' }}>
                            <a
                                href={`mailto:${contactEmail}`}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black
                                    font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                                    brutal-shadow btn-fill btn-fill-dark"
                            >
                                {contactEmail}
                                <ArrowRight size={18} strokeWidth={3} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

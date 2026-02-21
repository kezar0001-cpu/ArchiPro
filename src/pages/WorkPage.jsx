import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../lib/queries';

/**
 * WorkPage — All Published Projects
 *
 * Grid listing of every published project,
 * ordered by sort_order.
 */
export default function WorkPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProjects()
            .then(setProjects)
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    // Pad grid to at least 3 items with placeholder cards
    const MIN_CARDS = 3;
    const placeholderCount = !loading && projects.length > 0 && projects.length < MIN_CARDS
        ? MIN_CARDS - projects.length
        : 0;

    return (
        <div className="bg-black">
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
                            002 — Work
                        </span>
                        <h1
                            className="font-sans font-bold text-white uppercase tracking-[-0.02em] mb-6"
                            style={{ fontSize: 'clamp(40px, 12vw, 120px)' }}
                        >
                            WORK<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-3">
                            All Projects
                        </p>
                        {!loading && (
                            <p className="font-mono" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em' }}>
                                SHOWING {projects.length} OF {projects.length} PROJECT{projects.length !== 1 ? 'S' : ''}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* dark→light divider */}
            <div style={{ height: '1px', background: '#ddd' }} />

            {/* ── PROJECTS GRID ── */}
            <section className="bg-white section-px" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                <div className="max-w-[1100px] mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-12 h-12 border border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-16" style={{ border: '1px solid #ddd' }}>
                            <p className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: '#999' }}>
                                No projects yet — Check back soon
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: '#ddd' }}>
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                            {Array.from({ length: placeholderCount }).map((_, i) => (
                                <div
                                    key={`placeholder-${i}`}
                                    className="bg-white flex flex-col items-center justify-center relative overflow-hidden"
                                    style={{ border: '1px dashed #ccc', minHeight: '320px' }}
                                >
                                    <span
                                        className="absolute font-sans font-bold select-none pointer-events-none"
                                        style={{ fontSize: '140px', color: 'rgba(0,0,0,0.04)', lineHeight: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                    <span
                                        className="font-mono uppercase block mb-2 relative"
                                        style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#bbb' }}
                                    >
                                        Coming Soon
                                    </span>
                                    <p
                                        className="font-sans font-bold uppercase text-center relative"
                                        style={{ fontSize: '16px', color: '#aaa', lineHeight: 1.3 }}
                                    >
                                        New Project
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

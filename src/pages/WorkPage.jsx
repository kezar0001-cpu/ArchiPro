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

    return (
        <div className="min-h-screen bg-grey-light">
            <Nav />

            {/* Hero */}
            <section className="pt-28 pb-16 section-px bg-black">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            Portfolio
                        </span>
                        <h1 className="font-sans font-bold text-white uppercase text-6xl md:text-8xl tracking-[-0.02em] mb-6">
                            WORK<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            All Projects
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-px py-20">
                <div className="max-w-[1400px] mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-12 h-12 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-16 border-[3px] border-black brutal-shadow bg-white">
                            <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                                No projects yet — Check back soon
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

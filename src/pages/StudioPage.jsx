import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { getAllSiteContent, getFeaturedProjects } from '../lib/queries';
import { ArrowUpRight } from 'lucide-react';

/**
 * HADStudio — Premium Landing Page
 * 
 * Aesthetic: Elegant, Premium, Atmospheric, Editorial.
 * Translates the 'hadstudio_design' Instagram feel to the web.
 */
export default function StudioPage() {
    const [sc, setSc] = useState({});
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    
    // Parallax & scale effects for the editorial feel
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    useEffect(() => {
        Promise.all([
            getAllSiteContent(),
            getFeaturedProjects(),
        ])
        .then(([content, projs]) => {
            setSc(content);
            setProjects(projs.slice(0, 3)); // Only top 3 for curated feel
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, []);

    const contactEmail = sc.contact_email || 'hadilalduleimi2@gmail.com';

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-xs text-grey tracking-[0.2em] uppercase">Loading Studio</span>
            </div>
        );
    }

    return (
        <div className="bg-white selection:bg-black selection:text-white overflow-x-hidden">
            <Nav contactEmail={contactEmail} />

            {/* ── 01. HERO: ATOMSPHERIC ENTRY ── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <motion.div 
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="/assets/studio/hero.png" 
                        alt="HADStudio Atmospheric Interior" 
                        className="w-full h-full object-cover grayscale opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </motion.div>

                <div className="relative z-10 text-center section-px">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="caption-xs text-grey tracking-[0.4em] block mb-6"
                    >
                        THE PRACTICE
                    </motion.span>
                    <div className="overflow-hidden mb-8">
                        <motion.h1 
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                            className="text-[clamp(3rem,12vw,10rem)] leading-[0.9] font-bold text-white tracking-tighter"
                        >
                            HADSTUDIO<span className="text-grey">.</span>
                        </motion.h1>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase">Scroll to Discover</span>
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* ── 02. STATEMENT: EDITORIAL INTENT ── */}
            <section className="section-px py-32 md:py-64 flex justify-center bg-white border-b-[1px] border-black/5">
                <div className="max-w-[1000px] text-center">
                    <motion.p 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                        className="text-[clamp(1.5rem,4vw,3.5rem)] font-sans font-medium leading-[1.2] text-black tracking-tight"
                    >
                        "Architecture is not just the structure, but the atmosphere created within it. We focus on the <span className="text-grey">silent dialogue</span> between light, shadow, and materiality."
                    </motion.p>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="w-24 h-[2px] bg-black mx-auto mt-12 origin-center"
                    />
                </div>
            </section>

            {/* ── 03. CURATED PORTFOLIO: SELECTIVE EXCELLENCE ── */}
            <section className="bg-[#fcfcfc] section-px py-32">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                        <div>
                            <span className="caption-xs text-grey mb-4 block">001 — Selected Work</span>
                            <h2 className="heading-lg tracking-tighter text-black uppercase">Curated Portfolio</h2>
                        </div>
                        <p className="body-base text-grey max-w-sm">
                            A restricted selection of projects that define our architectural language and spatial philosophy.
                        </p>
                    </div>

                    <div className="space-y-32 md:space-y-64">
                        {projects.map((project, idx) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: 0.1 }}
                                className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}
                            >
                                <div className="w-full md:w-3/5 group overflow-hidden brutal-border brutal-shadow cursor-none">
                                    <motion.img 
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        src={project.thumbnailUrl} 
                                        alt={project.title}
                                        className="w-full aspect-[16/10] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="w-full md:w-2/5 flex flex-col gap-6">
                                    <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase">PROJECT 00{idx + 1}</span>
                                    <h3 className="text-4xl lg:text-5xl font-bold text-black uppercase tracking-tight">{project.title}</h3>
                                    <p className="body-base text-grey leading-relaxed line-clamp-3">
                                        {project.description || "A deep exploration of materiality and form, designed to enhance the human experience within the space."}
                                    </p>
                                    <a 
                                        href={`/work/${project.slug}`}
                                        className="inline-flex items-center gap-2 group text-black font-mono text-xs tracking-[0.2em] uppercase self-start"
                                    >
                                        Case Study
                                        <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 04. PHILOSOPHY: THE PROCESS ── */}
            <section className="bg-black text-white section-px py-32 md:py-48 overflow-hidden">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <span className="caption-xs text-grey mb-8 block">002 — Philosophy</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-12 title-font tracking-tighter uppercase">Visual Restraint. <br/><span className="text-grey">Material Truth.</span></h2>
                        <div className="space-y-8 max-w-lg">
                            <p className="body-base text-grey leading-relaxed">
                                Our approach is rooted in the belief that less is not just more—it is essential. By stripping away the superfluous, we reveal the inherent beauty of materials and the pure intention of space.
                            </p>
                            <p className="body-base text-grey leading-relaxed">
                                Every line drawn in our studio is a commitment to precision and a respect for the tectonic nature of architecture.
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                        className="relative"
                    >
                        <div className="aspect-square w-full bg-grey-light brutal-border brutal-shadow overflow-hidden">
                            <img 
                                src="/assets/studio/mood.png" 
                                alt="HADStudio Material Mood Board" 
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                        {/* Material Labels Overlay */}
                        <div className="absolute -bottom-8 -right-8 bg-white text-black p-6 brutal-border hidden md:block">
                            <p className="font-mono text-[10px] tracking-widest uppercase mb-2 text-grey">TACTILE STUDIES v01</p>
                            <ul className="space-y-1 font-mono text-[11px] uppercase">
                                <li>— HONED LIMESTONE</li>
                                <li>— RECLAIMED OAK</li>
                                <li>— CAST CONCRETE</li>
                                <li>— OXIDIZED STEEL</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── 05. GALLERY: MOMENTS ── */}
            <section className="bg-white py-32 section-px">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-24">
                        <span className="caption-xs text-grey mb-4 block">003 — Moments</span>
                        <h2 className="heading-lg tracking-tighter text-black uppercase">Visual Rhythm</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {/* This would ideally use more varied images, for now we re-use curated ones or placeholders with mood */}
                        <div className="col-span-2 row-span-2 overflow-hidden brutal-border">
                            <img src="/assets/studio/detail.png" className="w-full h-full object-cover grayscale hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <div className="aspect-square bg-grey-light border border-black/5 overflow-hidden">
                            <img src="/assets/studio/hero.png" className="w-full h-full object-cover grayscale opacity-80" />
                        </div>
                        <div className="aspect-square bg-black flex items-center justify-center p-8">
                            <span className="font-mono text-[10px] text-grey uppercase text-center leading-loose tracking-widest">Minimalism is the ultimate sophistication.</span>
                        </div>
                        <div className="aspect-square bg-grey-light border border-black/5 overflow-hidden">
                             <img src="/assets/studio/mood.png" className="w-full h-full object-cover grayscale opacity-80" />
                        </div>
                        <div className="aspect-square bg-white border border-black flex items-center justify-center">
                            <span className="text-6xl font-bold text-black">+</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 06. CTA: THE PARTNERSHIP ── */}
            <section className="bg-black py-48 md:py-64 section-px relative overflow-hidden">
                {/* Background Watermark */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/5 pointer-events-none select-none">
                    JOIN
                </span>

                <div className="relative z-10 max-w-[800px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="caption-xs text-grey mb-12 block tracking-[0.4em]">ENQUIRY</span>
                        <h2 className="text-5xl md:text-8xl font-bold text-white mb-12 title-font tracking-tighter uppercase leading-[0.85]">
                            Begin Your <br/><span className="text-grey">Legacy.</span>
                        </h2>
                        <div className="flex flex-col items-center gap-8">
                            <p className="body-base text-grey max-w-md">
                                We are currently accepting commissions for late 2026. For enquiries regarding new residential or commercial projects:
                            </p>
                            <Button 
                                href={`mailto:${contactEmail}`} 
                                variant="primary" 
                                size="lg" 
                                dark 
                                className="!px-16 !py-6 !text-lg !bg-white !text-black !border-white"
                            >
                                START A DIALOGUE
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

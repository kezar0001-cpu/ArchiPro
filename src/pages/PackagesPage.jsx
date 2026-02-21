import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const packages = [
    {
        num: '01',
        title: 'MEASURED PLANS',
        subtitle: 'As-built documentation',
        description:
            'Accurate floor plans, elevations, and sections of your existing space. Essential for council submissions, renovations, and real estate purposes.',
        includes: [
            'Site measure and survey',
            'Floor plan (to scale)',
            'Elevations (internal/external)',
            'PDF and DWG deliverables',
        ],
        price: 'FROM $800',
        priceSub: 'Indicative — varies by size & complexity',
        ctaLabel: 'ENQUIRE',
        ctaHref: '/contact',
        dark: false,
    },
    {
        num: '02',
        title: 'CONCEPT DESIGN',
        subtitle: 'Design direction & spatial planning',
        description:
            'Develop the design vision for your space — from initial brief through to a resolved concept with spatial layouts, mood direction, and material palette.',
        includes: [
            'Design brief consultation',
            'Space planning options (2 directions)',
            'Mood board & material palette',
            'Annotated concept floor plan',
            'Presentation package (PDF)',
        ],
        price: 'FROM $1,500',
        priceSub: 'Indicative — varies by scope & rooms',
        ctaLabel: 'ENQUIRE',
        ctaHref: '/contact',
        dark: false,
    },
    {
        num: '03',
        title: '3D VISUALISATION',
        subtitle: 'Photorealistic renders of your space',
        description:
            'See your space before it\'s built. High-quality 3D renders that communicate design intent clearly to clients, builders, and council.',
        includes: [
            '3D model of space',
            'Up to 3 photorealistic render views',
            'Interior lighting and material representation',
            '2 rounds of revisions',
            'High-res PNG deliverables',
        ],
        price: 'FROM $1,200',
        priceSub: 'Indicative — per room/area, complexity dependent',
        ctaLabel: 'ENQUIRE',
        ctaHref: '/contact',
        dark: false,
    },
    {
        num: '04',
        title: 'DA PACKAGE',
        subtitle: 'Council submission documentation',
        description:
            'Full documentation set prepared to meet council DA requirements for residential alterations, additions, or new builds.',
        includes: [
            'Site analysis and context plans',
            'Proposed floor plans and elevations',
            'Shadow diagrams',
            'Statement of environmental effects (template)',
            'Coordination with consultants',
        ],
        price: 'FROM $3,500',
        priceSub: 'Indicative — varies significantly by council and project size',
        ctaLabel: 'ENQUIRE',
        ctaHref: '/contact',
        dark: false,
    },
    {
        num: '05',
        title: 'INTERIOR DESIGN',
        subtitle: 'Full interior design service',
        description:
            'End-to-end interior design for residential or commercial spaces — from concept through to construction documentation and procurement support.',
        includes: [
            'Space planning and furniture layout',
            'Material, finish & fixture selection',
            'Lighting design direction',
            '3D renders (up to 5 views)',
            'Construction drawings for builder',
            'Procurement assistance',
        ],
        price: 'FROM $4,500',
        priceSub: 'Indicative — varies by size, rooms, and scope',
        ctaLabel: 'ENQUIRE',
        ctaHref: '/contact',
        dark: false,
    },
    {
        num: '06',
        title: 'CUSTOM PROJECT',
        subtitle: 'Tailored to your requirements',
        description:
            'Have something specific in mind? All projects are different — get in touch to discuss your needs and receive a tailored proposal.',
        includes: [
            'Initial consultation (free)',
            'Tailored scope of works',
            'Fixed fee proposal',
            'Flexible engagement model',
        ],
        price: "LET'S TALK",
        priceSub: 'Every project is unique',
        ctaLabel: 'GET IN TOUCH',
        ctaHref: '/contact',
        dark: true,
    },
];

function PackageCard({ pkg, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.33, 1, 0.68, 1] }}
            className="relative flex flex-col"
            style={{
                background: pkg.dark ? '#111' : '#f5f5f5',
                padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)',
                transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (!pkg.dark) e.currentTarget.style.background = '#efefef'; }}
            onMouseLeave={e => { if (!pkg.dark) e.currentTarget.style.background = '#f5f5f5'; }}
        >
            {/* Number watermark */}
            <span
                className="absolute top-4 right-6 font-mono select-none pointer-events-none"
                style={{ fontSize: '48px', color: pkg.dark ? 'rgba(255,255,255,0.08)' : '#ddd', lineHeight: 1 }}
                aria-hidden="true"
            >
                {pkg.num}
            </span>

            {/* Title */}
            <h3
                className="font-sans font-bold uppercase tracking-[-0.01em] mb-1"
                style={{ fontSize: '22px', color: pkg.dark ? '#fff' : '#111' }}
            >
                {pkg.title}
            </h3>

            {/* Subtitle */}
            <p
                className="font-mono uppercase mb-4"
                style={{ fontSize: '10px', color: pkg.dark ? '#888' : '#888', letterSpacing: '0.15em' }}
            >
                {pkg.subtitle}
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: pkg.dark ? 'rgba(255,255,255,0.12)' : '#ddd', marginBottom: '16px' }} />

            {/* Description */}
            <p
                className="font-sans mb-5"
                style={{ fontSize: '14px', color: pkg.dark ? '#aaa' : '#555', lineHeight: 1.75 }}
            >
                {pkg.description}
            </p>

            {/* Includes */}
            <ul className="mb-6 flex flex-col" style={{ gap: '6px' }}>
                {pkg.includes.map((item, i) => (
                    <li
                        key={i}
                        className="font-mono flex items-start gap-2"
                        style={{ fontSize: '12px', color: pkg.dark ? '#999' : '#666', letterSpacing: '0.05em' }}
                    >
                        <span style={{ color: pkg.dark ? '#555' : '#bbb', flexShrink: 0 }}>—</span>
                        {item}
                    </li>
                ))}
            </ul>

            {/* Price — pushed to bottom */}
            <div className="mt-auto">
                <div style={{ height: '1px', background: pkg.dark ? 'rgba(255,255,255,0.12)' : '#ddd', marginBottom: '16px' }} />
                <p
                    className="font-sans font-bold uppercase tracking-[-0.01em] mb-1"
                    style={{ fontSize: '20px', color: pkg.dark ? '#fff' : '#111' }}
                >
                    {pkg.price}
                </p>
                <p
                    className="font-mono mb-5"
                    style={{ fontSize: '11px', color: pkg.dark ? '#666' : '#999', letterSpacing: '0.08em' }}
                >
                    {pkg.priceSub}
                </p>

                {/* CTA Button */}
                <a
                    href={pkg.ctaHref}
                    className="inline-flex items-center gap-2 font-mono uppercase transition-all duration-200"
                    style={{
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        padding: '10px 20px',
                        border: pkg.dark ? '2px solid rgba(255,255,255,0.3)' : '2px solid #111',
                        color: pkg.dark ? '#fff' : '#111',
                        background: 'transparent',
                        minHeight: '44px',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = pkg.dark ? 'rgba(255,255,255,0.1)' : '#111';
                        e.currentTarget.style.color = pkg.dark ? '#fff' : '#fff';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = pkg.dark ? '#fff' : '#111';
                    }}
                >
                    {pkg.ctaLabel}
                    <ArrowUpRight size={13} strokeWidth={3} />
                </a>
            </div>
        </motion.div>
    );
}

export default function PackagesPage() {
    return (
        <div className="bg-white">
            <Nav />

            {/* ── HEADER ── */}
            <section className="bg-black section-px" style={{ paddingTop: '96px', paddingBottom: '60px' }}>
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            005 — Packages
                        </span>
                        <h1
                            className="font-sans font-bold text-white uppercase tracking-[-0.02em] mb-6"
                            style={{ fontSize: 'clamp(40px, 12vw, 100px)' }}
                        >
                            PACKAGES<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Design Services &amp; Pricing
                        </p>
                    </motion.div>
                </div>
            </section>

            <div style={{ height: '1px', background: '#ddd' }} />

            {/* ── INTRO ── */}
            <section className="bg-grey-light section-px" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div style={{ maxWidth: '680px' }}>
                    <p
                        className="font-sans"
                        style={{ fontSize: '15px', color: '#666', lineHeight: 1.8 }}
                    >
                        Every project is unique — the following packages provide a starting point based on
                        typical scope and scale. Final pricing depends on site size, complexity, and specific
                        requirements. Get in touch for a tailored quote.
                    </p>
                </div>
            </section>

            <div style={{ height: '1px', background: '#ddd' }} />

            {/* ── PACKAGES GRID ── */}
            <section className="bg-white">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    style={{ gap: '1px', background: '#ddd' }}
                >
                    {packages.map((pkg, i) => (
                        <PackageCard key={pkg.num} pkg={pkg} index={i} />
                    ))}
                </div>
            </section>

            {/* ── DISCLAIMER STRIP ── */}
            <div
                className="section-px text-center"
                style={{ background: '#e8e8e8', paddingTop: '24px', paddingBottom: '24px' }}
            >
                <p
                    className="font-mono"
                    style={{ fontSize: '12px', color: '#888', lineHeight: 1.7, maxWidth: '860px', margin: '0 auto' }}
                >
                    All prices are indicative and based on industry standards for Sydney-based architectural
                    and interior design services. Final fees are confirmed after an initial consultation and
                    depend on project size, site conditions, and scope. GST not included.
                </p>
            </div>

            <Footer />
        </div>
    );
}

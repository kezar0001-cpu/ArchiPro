import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Instagram } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllSiteContent } from '../lib/queries';

export default function ContactPage() {
    const [sc, setSc] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getAllSiteContent()
            .then(setSc)
            .catch(() => setSc({}))
            .finally(() => setLoading(false));
    }, []);

    const contactEmail = sc.contact_email || 'hadilalduleimi2@gmail.com';
    const phoneNum = sc.resume_phone || '+61 411 148 777';
    const address = sc.resume_address || 'Sydney, Australia';
    const linkedinUrl = sc.social_linkedin || 'https://linkedin.com/in/hadilalduleimi';
    const instagramUrl = sc.social_instagram || 'https://instagram.com/hadilalduleimi';

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(formData.subject || 'Portfolio Enquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setSubmitted(true);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-grey-light flex items-center justify-center">
                <div className="w-16 h-16 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-black">
            <Nav contactEmail={contactEmail} />

            {/* ── PAGE HEADER ── */}
            <section className="section-px bg-black" style={{ paddingTop: '160px', paddingBottom: '40px' }}>
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            004 — Contact
                        </span>
                        <h1
                            className="font-sans font-bold text-white uppercase tracking-[-0.02em] mb-6"
                            style={{ fontSize: 'clamp(40px, 12vw, 100px)' }}
                        >
                            CONTACT<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Let's discuss your next project
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* dark→light divider */}
            <div style={{ height: '1px', background: '#ddd' }} />

            {/* ── CONTACT CONTENT ── */}
            <section className="bg-white section-px" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                <div className="max-w-[1100px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr]" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>

                        {/* ── LEFT: Contact Info ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Section label */}
                            <h2
                                className="font-mono uppercase mb-6"
                                style={{
                                    fontSize: '11px',
                                    color: '#888',
                                    letterSpacing: '0.25em',
                                    borderLeft: '2px solid #111',
                                    paddingLeft: '10px',
                                    lineHeight: 1.6,
                                }}
                            >
                                Contact Information
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <span className="font-mono uppercase block" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginBottom: '4px' }}>
                                        Email
                                    </span>
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        className="font-mono text-sm transition-colors hover:text-grey"
                                        style={{ color: '#111' }}
                                    >
                                        {contactEmail}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginBottom: '4px' }}>
                                        Phone
                                    </span>
                                    <a
                                        href={`tel:${phoneNum.replace(/\s/g, '')}`}
                                        className="font-mono text-sm transition-colors hover:text-grey"
                                        style={{ color: '#111' }}
                                    >
                                        {phoneNum}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-mono uppercase block" style={{ fontSize: '10px', color: '#999', letterSpacing: '0.15em', marginBottom: '4px' }}>
                                        Location
                                    </span>
                                    <span className="font-mono text-sm" style={{ color: '#111' }}>{address}</span>
                                </div>
                            </div>

                            {/* Divider before social */}
                            <div style={{ height: '1px', background: '#ddd', margin: '32px 0' }} />

                            {/* Social Links */}
                            <h3
                                className="font-mono uppercase mb-4"
                                style={{
                                    fontSize: '11px',
                                    color: '#888',
                                    letterSpacing: '0.25em',
                                    borderLeft: '2px solid #111',
                                    paddingLeft: '10px',
                                    lineHeight: 1.6,
                                }}
                            >
                                Follow
                            </h3>
                            <div className="flex gap-2" style={{ marginTop: '8px' }}>
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="flex items-center justify-center transition-colors"
                                    style={{ width: '36px', height: '36px', border: '1px solid #ccc', color: '#555' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#555'; }}
                                >
                                    <Linkedin size={16} strokeWidth={1.5} />
                                </a>
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex items-center justify-center transition-colors"
                                    style={{ width: '36px', height: '36px', border: '1px solid #ccc', color: '#555' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#555'; }}
                                >
                                    <Instagram size={16} strokeWidth={1.5} />
                                </a>
                            </div>
                        </motion.div>

                        {/* ── RIGHT: Contact Form ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* Section label */}
                            <h2
                                className="font-mono uppercase mb-8"
                                style={{
                                    fontSize: '11px',
                                    color: '#888',
                                    letterSpacing: '0.25em',
                                    borderLeft: '2px solid #111',
                                    paddingLeft: '10px',
                                    lineHeight: 1.6,
                                }}
                            >
                                Send a Message
                            </h2>

                            {submitted ? (
                                <div className="py-12">
                                    <div className="w-12 h-12 border border-black mx-auto mb-6 flex items-center justify-center">
                                        <Send size={20} strokeWidth={2} className="text-black" />
                                    </div>
                                    <h3 className="font-sans font-bold text-lg text-black mb-2 text-center">Message Ready</h3>
                                    <p className="font-sans text-sm text-grey mb-6 text-center">
                                        Your email client should have opened. If not, email directly:
                                    </p>
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        className="font-mono text-sm text-black hover:text-grey transition-colors block text-center"
                                    >
                                        {contactEmail}
                                    </a>
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                                            className="font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                                            style={{ color: '#999' }}
                                        >
                                            Send Another
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '28px' }}>
                                        <div>
                                            <label className="font-mono uppercase block" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="font-sans w-full focus:outline-none"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    borderBottom: '1px solid #ccc',
                                                    padding: '12px 0',
                                                    fontSize: '16px',
                                                    color: '#111',
                                                }}
                                                onFocus={e => { e.target.style.borderBottomColor = '#111'; }}
                                                onBlur={e => { e.target.style.borderBottomColor = '#ccc'; }}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-mono uppercase block" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="font-sans w-full focus:outline-none"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    borderBottom: '1px solid #ccc',
                                                    padding: '12px 0',
                                                    fontSize: '16px',
                                                    color: '#111',
                                                }}
                                                onFocus={e => { e.target.style.borderBottomColor = '#111'; }}
                                                onBlur={e => { e.target.style.borderBottomColor = '#ccc'; }}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="font-mono uppercase block" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="font-sans w-full focus:outline-none"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid #ccc',
                                                padding: '12px 0',
                                                fontSize: '16px',
                                                color: '#111',
                                            }}
                                            onFocus={e => { e.target.style.borderBottomColor = '#111'; }}
                                            onBlur={e => { e.target.style.borderBottomColor = '#ccc'; }}
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="font-mono uppercase block" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="font-sans w-full focus:outline-none resize-none"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid #ccc',
                                                padding: '12px 0',
                                                fontSize: '16px',
                                                color: '#111',
                                                minHeight: '140px',
                                            }}
                                            onFocus={e => { e.target.style.borderBottomColor = '#111'; }}
                                            onBlur={e => { e.target.style.borderBottomColor = '#ccc'; }}
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full font-mono uppercase transition-all duration-300"
                                        style={{
                                            background: '#111',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '18px',
                                            fontSize: '12px',
                                            letterSpacing: '0.2em',
                                            minHeight: '56px',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#333'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#111'; }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

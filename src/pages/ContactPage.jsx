import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from 'lucide-react';
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
        <div className="min-h-screen bg-grey-light">
            <Nav contactEmail={contactEmail} />

            {/* Hero */}
            <section className="pt-36 pb-16 section-px bg-black">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-mono text-[10px] text-grey tracking-[0.2em] uppercase block mb-4">
                            Get in Touch
                        </span>
                        <h1 className="font-sans font-bold text-white uppercase text-6xl md:text-8xl tracking-[-0.02em] mb-6">
                            CONTACT<span className="text-grey">.</span>
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                            Let's discuss your next project
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-px py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <h2 className="font-sans font-bold text-2xl text-black uppercase mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 border-[3px] border-black flex items-center justify-center shrink-0 group-hover:bg-black transition-colors duration-300">
                                        <Mail size={16} strokeWidth={3} className="text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase mb-1">Email</p>
                                        <p className="font-sans text-sm text-black group-hover:text-grey transition-colors duration-300">{contactEmail}</p>
                                    </div>
                                </a>

                                <a href={`tel:${phoneNum.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 border-[3px] border-black flex items-center justify-center shrink-0 group-hover:bg-black transition-colors duration-300">
                                        <Phone size={16} strokeWidth={3} className="text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase mb-1">Phone</p>
                                        <p className="font-sans text-sm text-black group-hover:text-grey transition-colors duration-300">{phoneNum}</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border-[3px] border-black flex items-center justify-center shrink-0">
                                        <MapPin size={16} strokeWidth={3} className="text-black" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase mb-1">Location</p>
                                        <p className="font-sans text-sm text-black">{address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-8 border-t-[2px] border-black/10">
                                <p className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase mb-4">Follow</p>
                                <div className="flex gap-3">
                                    <a
                                        href={linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="w-10 h-10 border-[3px] border-black flex items-center justify-center hover:bg-black group transition-colors duration-300"
                                    >
                                        <Linkedin size={16} strokeWidth={3} className="text-black group-hover:text-white transition-colors duration-300" />
                                    </a>
                                    <a
                                        href={instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="w-10 h-10 border-[3px] border-black flex items-center justify-center hover:bg-black group transition-colors duration-300"
                                    >
                                        <Instagram size={16} strokeWidth={3} className="text-black group-hover:text-white transition-colors duration-300" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-white brutal-border brutal-shadow-sm p-8 md:p-10">
                                <h2 className="font-sans font-bold text-2xl text-black uppercase mb-8">
                                    Send a Message
                                </h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 border-[3px] border-black mx-auto mb-6 flex items-center justify-center">
                                            <Send size={24} strokeWidth={3} className="text-black" />
                                        </div>
                                        <h3 className="font-sans font-bold text-xl text-black mb-2">Message Ready</h3>
                                        <p className="font-sans text-sm text-grey mb-6">
                                            Your email client should have opened. If not, email me directly at:
                                        </p>
                                        <a
                                            href={`mailto:${contactEmail}`}
                                            className="font-mono text-sm text-black hover:text-grey transition-colors"
                                        >
                                            {contactEmail}
                                        </a>
                                        <div className="mt-8">
                                            <button
                                                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                                                className="font-mono text-xs text-grey tracking-[0.15em] uppercase hover:text-black transition-colors"
                                            >
                                                Send Another
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase block mb-2">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm text-black
                                                        focus:outline-none focus:border-grey transition-colors"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase block mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm text-black
                                                        focus:outline-none focus:border-grey transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase block mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm text-black
                                                    focus:outline-none focus:border-grey transition-colors"
                                                placeholder="What's this about?"
                                            />
                                        </div>

                                        <div>
                                            <label className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase block mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm text-black
                                                    focus:outline-none focus:border-grey transition-colors resize-none"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white
                                                font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                                brutal-shadow-sm brutal-hover"
                                        >
                                            <Send size={14} strokeWidth={3} />
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

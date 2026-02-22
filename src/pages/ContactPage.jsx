import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Instagram, Paperclip, X } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllSiteContent } from '../lib/queries';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
    const [sc, setSc] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [attachError, setAttachError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [sendError, setSendError] = useState('');
    const fileInputRef = useRef(null);

    const ALLOWED_TYPES = [
        'application/pdf',
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/zip',
    ];
    const MAX_SIZE_MB = 10;

    function handleFileChange(e) {
        const file = e.target.files[0];
        setAttachError('');
        if (!file) { setAttachment(null); return; }
        if (!ALLOWED_TYPES.includes(file.type)) {
            setAttachError('File type not supported. Please upload a PDF, image, Word, Excel, or ZIP file.');
            setAttachment(null);
            e.target.value = '';
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setAttachError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
            setAttachment(null);
            e.target.value = '';
            return;
        }
        setAttachment(file);
    }

    function clearAttachment() {
        setAttachment(null);
        setAttachError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

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

    async function handleSubmit(e) {
        e.preventDefault();
        setUploading(true);
        setSendError('');
        let attachmentUrl = null;
        let attachmentName = null;

        if (attachment) {
            const ext = attachment.name.split('.').pop();
            const path = `contact/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { error } = await supabase.storage
                .from('contact-attachments')
                .upload(path, attachment, { cacheControl: '3600', upsert: false });

            if (error) {
                setAttachError('Upload failed — please try again.');
                setUploading(false);
                return;
            }

            const { data } = supabase.storage.from('contact-attachments').getPublicUrl(path);
            attachmentUrl = data.publicUrl;
            attachmentName = attachment.name;
        }

        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
            const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseAnonKey,
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    attachmentUrl,
                    attachmentName,
                }),
            });

            const json = await res.json();
            if (!res.ok || json.error) {
                setSendError(json.error || 'Something went wrong. Please try again.');
                setUploading(false);
                return;
            }

            setSubmitted(true);
        } catch {
            setSendError('Network error — please check your connection and try again.');
        }

        setUploading(false);
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
                                    <h3 className="font-sans font-bold text-lg text-black mb-2 text-center">Message Sent</h3>
                                    <p className="font-sans text-sm text-grey mb-6 text-center">
                                        Thanks {formData.name.split(' ')[0]} — I'll be in touch soon.
                                    </p>
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => { setSubmitted(false); setSendError(''); setFormData({ name: '', email: '', subject: '', message: '' }); clearAttachment(); }}
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

                                    {/* Attachment */}
                                    <div>
                                        <label className="font-mono uppercase block" style={{ fontSize: '11px', color: '#999', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                            Attachment <span style={{ color: '#bbb' }}>(optional — max 10MB)</span>
                                        </label>
                                        {attachment ? (
                                            <div
                                                className="flex items-center gap-3"
                                                style={{ padding: '10px 12px', border: '1px solid #ccc', background: '#fafafa' }}
                                            >
                                                <Paperclip size={14} strokeWidth={2} style={{ color: '#888', flexShrink: 0 }} />
                                                <span className="font-mono flex-1 truncate" style={{ fontSize: '13px', color: '#111' }}>
                                                    {attachment.name}
                                                </span>
                                                <span className="font-mono" style={{ fontSize: '11px', color: '#999', flexShrink: 0 }}>
                                                    {(attachment.size / 1024 / 1024).toFixed(1)}MB
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={clearAttachment}
                                                    className="flex items-center justify-center transition-colors"
                                                    style={{ color: '#999', minWidth: '24px', minHeight: '24px' }}
                                                    onMouseEnter={e => { e.currentTarget.style.color = '#111'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.color = '#999'; }}
                                                    aria-label="Remove attachment"
                                                >
                                                    <X size={14} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex items-center gap-2 font-mono uppercase transition-all duration-200"
                                                style={{
                                                    fontSize: '11px',
                                                    letterSpacing: '0.15em',
                                                    padding: '10px 16px',
                                                    border: '1px dashed #ccc',
                                                    color: '#888',
                                                    background: 'transparent',
                                                    width: '100%',
                                                    minHeight: '44px',
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#888'; }}
                                            >
                                                <Paperclip size={14} strokeWidth={2} />
                                                Attach a file
                                            </button>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.xls,.xlsx,.zip"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        {attachError && (
                                            <p className="font-mono mt-2" style={{ fontSize: '11px', color: '#c00', letterSpacing: '0.05em' }}>
                                                {attachError}
                                            </p>
                                        )}
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
                                        disabled={uploading}
                                        className="w-full font-mono uppercase transition-all duration-300 flex items-center justify-center gap-3"
                                        style={{
                                            background: uploading ? '#555' : '#111',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '18px',
                                            fontSize: '12px',
                                            letterSpacing: '0.2em',
                                            minHeight: '56px',
                                            cursor: uploading ? 'not-allowed' : 'pointer',
                                        }}
                                        onMouseEnter={e => { if (!uploading) e.currentTarget.style.background = '#333'; }}
                                        onMouseLeave={e => { if (!uploading) e.currentTarget.style.background = '#111'; }}
                                    >
                                        {uploading ? (
                                            <>
                                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                {attachment ? 'Uploading...' : 'Sending...'}
                                            </>
                                        ) : 'Send Message'}
                                    </button>

                                    {sendError && (
                                        <p className="font-mono text-center" style={{ fontSize: '12px', color: '#c00', letterSpacing: '0.05em' }}>
                                            {sendError}
                                        </p>
                                    )}
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

import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CONTENT_SECTIONS = [
    {
        title: 'Hero Section',
        fields: {
            hero_headline: { label: 'Hero Headline', hint: 'Use \\n for line breaks', multiline: true },
            hero_subheadline: { label: 'Hero Subheadline', hint: 'Tagline below the headline' },
            hero_overlay_opacity: { label: 'Hero Overlay Opacity', hint: '0 to 1 (e.g. 0.55)' },
            hero_status: { label: 'Hero Status Badge', hint: 'e.g. Available for Projects, Open to Work' },
        },
    },
    {
        title: 'Homepage Sections',
        fields: {
            about_intro: { label: 'Homepage About Intro', hint: 'Short bio shown on homepage #about section', multiline: true },
            about_tagline: { label: 'About Tagline', hint: 'e.g. Architect · Designer · Melbourne' },
            contact_email: { label: 'Contact Email', hint: 'Public email address' },
            contact_cta: { label: 'Contact CTA', hint: 'Call-to-action text for contact section' },
        },
    },
    {
        title: 'Resume — Header',
        fields: {
            full_name: { label: 'Full Name', hint: 'e.g. Hadil Alduleimi' },
            job_title: { label: 'Job Title', hint: 'e.g. Architectural Designer' },
            professional_summary: { label: 'Professional Summary', hint: 'Short paragraph about your experience', multiline: true },
        },
    },
    {
        title: 'Resume — Contact & Interests',
        fields: {
            phone_number: { label: 'Phone Number', hint: 'e.g. +61 411 148 777' },
            address: { label: 'Address', hint: 'e.g. Sydney, AU' },
            interests: { label: 'Interests', hint: 'Comma-separated (e.g. Interior Design, Architectural Photography)' },
        },
    },
    {
        title: 'Resume — Experience',
        fields: {
            professional_experience: {
                label: 'Professional Experience',
                hint: 'Each entry starts on a new line beginning with a capital letter. Format: Title | Period | Company\n• Bullet point 1\n• Bullet point 2\n\nNext entry starts here automatically.',
                multiline: true,
            },
        },
    },
    {
        title: 'Resume — Education',
        fields: {
            education: {
                label: 'Education',
                hint: 'One entry per line: Degree | Institution | Period',
                multiline: true,
            },
        },
    },
    {
        title: 'Resume — Skills',
        fields: {
            technical_skills: { label: 'Technical Skills', hint: 'Comma-separated (e.g. Revit, Rhino, Adobe Photoshop)' },
            professional_skills: { label: 'Professional Skills', hint: 'Comma-separated (e.g. Client Presentations, Site Measurements)' },
            design_skills: { label: 'Design Skills', hint: 'Comma-separated (e.g. Residential Design, Interior Layouts)' },
        },
    },
    {
        title: 'Social Links',
        fields: {
            social_linkedin: { label: 'LinkedIn URL', hint: 'Full URL (e.g. https://linkedin.com/in/yourname)' },
            social_instagram: { label: 'Instagram URL', hint: 'Full URL (e.g. https://instagram.com/yourname)' },
            social_github: { label: 'GitHub URL', hint: 'Full URL (e.g. https://github.com/yourname)' },
        },
    },
];

export default function ContentPage() {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});
    const [saved, setSaved] = useState({});

    useEffect(() => {
        async function fetchContent() {
            const { data } = await supabase
                .from('site_content')
                .select('key, value');

            if (data) {
                const map = {};
                data.forEach((row) => { map[row.key] = row.value; });
                setContent(map);
            }
            setLoading(false);
        }
        fetchContent();
    }, []);

    async function handleSave(key) {
        setSaving((prev) => ({ ...prev, [key]: true }));

        const { error } = await supabase
            .from('site_content')
            .upsert({ key, value: content[key] || '' }, { onConflict: 'key' });

        setSaving((prev) => ({ ...prev, [key]: false }));

        if (!error) {
            setSaved((prev) => ({ ...prev, [key]: true }));
            setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), 2000);
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="font-sans font-bold text-3xl text-black uppercase">
                    Site Content<span className="text-grey">.</span>
                </h1>
                <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mt-2">
                    Edit text displayed on the public site
                </p>
            </div>

            <div className="space-y-10 max-w-3xl">
                {CONTENT_SECTIONS.map((section) => (
                    <div key={section.title}>
                        <h2 className="font-sans font-bold text-lg text-black uppercase mb-4 border-b-[3px] border-black pb-2">
                            {section.title}
                        </h2>
                        <div className="space-y-6">
                            {Object.entries(section.fields).map(([key, config]) => (
                                <div key={key} className="brutal-border bg-white p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="font-mono text-xs text-black tracking-[0.15em] uppercase font-bold">
                                            {config.label}
                                        </label>
                                        <button
                                            onClick={() => handleSave(key)}
                                            disabled={saving[key]}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white
                                                font-mono text-[10px] tracking-[0.1em] uppercase
                                                border-[2px] border-black
                                                hover:bg-grey hover:border-grey transition-colors duration-200
                                                disabled:opacity-50"
                                        >
                                            {saved[key] ? (
                                                <><Check size={12} strokeWidth={3} /> Saved</>
                                            ) : saving[key] ? (
                                                'Saving...'
                                            ) : (
                                                <><Save size={12} strokeWidth={3} /> Save</>
                                            )}
                                        </button>
                                    </div>

                                    {config.hint && (
                                        <p className="font-mono text-[10px] text-grey tracking-[0.1em] mb-3">
                                            {config.hint}
                                        </p>
                                    )}

                                    {config.multiline ? (
                                        <textarea
                                            value={content[key] || ''}
                                            onChange={(e) => setContent((prev) => ({ ...prev, [key]: e.target.value }))}
                                            rows={key === 'professional_experience' ? 12 : 4}
                                            className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                                focus:outline-none focus:border-grey transition-colors duration-200
                                                resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={content[key] || ''}
                                            onChange={(e) => setContent((prev) => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                                focus:outline-none focus:border-grey transition-colors duration-200"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

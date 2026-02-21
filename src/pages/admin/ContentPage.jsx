import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CONTENT_LABELS = {
    hero_headline: { label: 'Hero Headline', hint: 'Use \\n for line breaks', multiline: true },
    hero_subheadline: { label: 'Hero Subheadline', hint: 'Tagline below the headline' },
    hero_overlay_opacity: { label: 'Hero Overlay Opacity', hint: '0 to 1 (e.g. 0.55)' },
    about_intro: { label: 'About Intro', hint: 'Main bio paragraph', multiline: true },
    about_tagline: { label: 'About Tagline', hint: 'e.g. Architect · Designer · Melbourne' },
    contact_email: { label: 'Contact Email', hint: 'Public email address' },
    contact_cta: { label: 'Contact CTA', hint: 'Call-to-action text for contact section' },
};

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
            .update({ value: content[key] })
            .eq('key', key);

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

            <div className="space-y-6 max-w-3xl">
                {Object.entries(CONTENT_LABELS).map(([key, config]) => (
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
                                rows={4}
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
    );
}

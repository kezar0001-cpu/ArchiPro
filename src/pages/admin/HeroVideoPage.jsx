import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Check, Video } from 'lucide-react';
import { supabase, getPublicUrl } from '../../lib/supabase';

export default function HeroVideoPage() {
    const [videoPath, setVideoPath] = useState('');
    const [videoUrl, setVideoUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        async function fetchVideoPath() {
            const { data } = await supabase
                .from('site_content')
                .select('value')
                .eq('key', 'hero_video_path')
                .single();

            if (data?.value) {
                setVideoPath(data.value);
                setVideoUrl(getPublicUrl('hero-video', data.value));
            }
        }
        fetchVideoPath();
    }, []);

    async function handleUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const ext = file.name.split('.').pop();
        const fileName = `hero-video.${ext}`;

        // Delete old file if exists
        if (videoPath) {
            await supabase.storage.from('hero-video').remove([videoPath]);
        }

        const { error } = await supabase.storage
            .from('hero-video')
            .upload(fileName, file, { upsert: true });

        if (!error) {
            setVideoPath(fileName);
            setVideoUrl(getPublicUrl('hero-video', fileName));

            // Save path to site_content
            await supabase
                .from('site_content')
                .update({ value: fileName })
                .eq('key', 'hero_video_path');

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }

        setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
    }

    async function handleRemove() {
        if (!videoPath) return;
        if (!confirm('Remove the hero video?')) return;

        setSaving(true);
        await supabase.storage.from('hero-video').remove([videoPath]);
        await supabase
            .from('site_content')
            .update({ value: '' })
            .eq('key', 'hero_video_path');

        setVideoPath('');
        setVideoUrl(null);
        setSaving(false);
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="font-sans font-bold text-3xl text-black uppercase">
                    Hero Video<span className="text-grey">.</span>
                </h1>
                <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mt-2">
                    Upload or replace the homepage background video
                </p>
            </div>

            <div className="max-w-3xl">
                {/* Current Video Preview */}
                {videoUrl ? (
                    <div className="mb-8">
                        <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mb-3">
                            Current Video
                        </p>
                        <div className="brutal-border bg-black overflow-hidden relative">
                            <video
                                src={videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-auto max-h-[400px] object-cover grayscale"
                            />
                        </div>
                        <p className="font-mono text-[10px] text-grey mt-2">
                            {videoPath}
                        </p>
                    </div>
                ) : (
                    <div className="mb-8 brutal-border bg-white p-12 text-center">
                        <Video size={48} strokeWidth={2} className="text-grey mx-auto mb-4" />
                        <p className="font-mono text-sm text-grey tracking-[0.15em] uppercase">
                            No video uploaded yet
                        </p>
                        <p className="font-mono text-[10px] text-grey mt-1">
                            The hero section will show a solid black background
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                    <label
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                            font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                            brutal-shadow-sm brutal-hover cursor-pointer
                            ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <Upload size={14} strokeWidth={3} />
                        {uploading ? 'Uploading...' : videoUrl ? 'Replace Video' : 'Upload Video'}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="video/mp4,video/webm"
                            onChange={handleUpload}
                            className="hidden"
                        />
                    </label>

                    {videoUrl && (
                        <button
                            onClick={handleRemove}
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black
                                font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                brutal-shadow-sm brutal-hover
                                disabled:opacity-50"
                        >
                            <Trash2 size={14} strokeWidth={3} />
                            Remove
                        </button>
                    )}

                    {saved && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-black tracking-[0.1em] uppercase">
                            <Check size={14} strokeWidth={3} /> Saved
                        </span>
                    )}
                </div>

                <p className="font-mono text-[10px] text-grey mt-4">
                    Recommended: MP4 or WebM, 1920×1080, under 20MB. Video will be displayed in grayscale.
                </p>
            </div>
        </div>
    );
}
